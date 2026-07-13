import { randomUUID } from "crypto"
import path from "path"
import { v2 as cloudinary } from "cloudinary"
import {
  AbstractFileProviderService,
  MedusaError,
} from "@medusajs/framework/utils"
import type { Logger } from "@medusajs/framework/types"
import type {
  ProviderDeleteFileDTO,
  ProviderFileResultDTO,
  ProviderGetFileDTO,
  ProviderUploadFileDTO,
} from "@medusajs/framework/types"

type InjectedDependencies = {
  logger: Logger
}

export type CloudinaryOptions = {
  cloud_name?: string
  api_key?: string
  api_secret?: string
  /** Whether to deliver assets over HTTPS. Defaults to true. */
  secure?: boolean
  /** Cloudinary folder to upload assets into. Brand-specific; set via env. */
  folder?: string
}

/**
 * Cloudinary provider for Medusa's File Module.
 *
 * Kept intentionally small and dependency-light (only the official `cloudinary`
 * SDK) so it stays maintainable across Medusa versions. All credentials come
 * from `medusa-config.ts` options, which read from environment variables — no
 * keys are hardcoded. Missing credentials do NOT prevent the server from
 * booting; uploads simply fail until they are provided.
 */
export class CloudinaryFileProviderService extends AbstractFileProviderService {
  static identifier = "cloudinary"

  protected readonly logger_: Logger
  protected readonly options_: CloudinaryOptions

  constructor({ logger }: InjectedDependencies, options: CloudinaryOptions) {
    super()
    this.logger_ = logger
    this.options_ = options

    cloudinary.config({
      cloud_name: options.cloud_name,
      api_key: options.api_key,
      api_secret: options.api_secret,
      secure: options.secure ?? true,
    })
  }

  async upload(
    file: ProviderUploadFileDTO
  ): Promise<ProviderFileResultDTO> {
    if (!file?.filename) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No filename provided"
      )
    }

    // Cloudinary public IDs don't include the extension; keep the original
    // name for readability and append a random suffix to avoid collisions.
    const parsed = path.parse(file.filename)
    const publicId = `${parsed.name}-${randomUUID()}`
    const dataUri = `data:${file.mimeType};base64,${file.content}`

    try {
      const res = await cloudinary.uploader.upload(dataUri, {
        folder: this.options_.folder ?? "bacoola",
        public_id: publicId,
        // "auto" handles images, videos, and raw files (e.g. CSV imports).
        resource_type: "auto",
        overwrite: false,
        unique_filename: false,
        use_filename: false,
      })

      return { url: res.secure_url, key: res.public_id }
    } catch (e) {
      this.logger_.error(
        `Cloudinary upload failed for "${file.filename}": ${(e as Error).message}`
      )
      throw e
    }
  }

  async delete(
    files: ProviderDeleteFileDTO | ProviderDeleteFileDTO[]
  ): Promise<void> {
    const fileArray = Array.isArray(files) ? files : [files]

    await Promise.all(
      fileArray.map(async ({ fileKey }) => {
        try {
          // Product images are stored as "image"; fall back to "raw" for
          // other asset types (e.g. imported CSVs) when the image call misses.
          const res = await cloudinary.uploader.destroy(fileKey, {
            resource_type: "image",
            invalidate: true,
          })
          if (res.result !== "ok" && res.result !== "not found") {
            await cloudinary.uploader.destroy(fileKey, {
              resource_type: "raw",
              invalidate: true,
            })
          }
        } catch (e) {
          // Match the built-in providers: log, don't throw, so a failed
          // deletion doesn't block the surrounding workflow.
          this.logger_.error(
            `Cloudinary delete failed for "${fileKey}": ${(e as Error).message}`
          )
        }
      })
    )
  }

  async getPresignedDownloadUrl(
    fileData: ProviderGetFileDTO
  ): Promise<string> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No fileKey provided"
      )
    }

    // Cloudinary delivery URLs are stable and public, so we return the
    // canonical secure URL for the asset rather than a time-limited one.
    return cloudinary.url(fileData.fileKey, {
      secure: this.options_.secure ?? true,
      resource_type: "image",
    })
  }
}
