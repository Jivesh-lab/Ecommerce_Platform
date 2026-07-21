import { MedusaService } from "@medusajs/framework/utils"
import { Context } from "@medusajs/framework/types"
import { LandingSection } from "./models/landing-section"
import { LandingSectionItem } from "./models/landing-section-item"

export class LandingPageService extends MedusaService({
  LandingSection,
  LandingSectionItem,
}) {
  /**
   * Custom method to manually cascade soft-deletes
   * to all child LandingSectionItems before deleting the section.
   */
  async cascadeDeleteLandingSections(
    idOrIds: string | string[],
    sharedContext?: Context
  ): Promise<void> {
    const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]
    if (!ids.length) return

    // 1. Fetch all child items belonging to these sections
    const items = await this.listLandingSectionItems(
      { landing_section: ids },
      {},
      sharedContext
    )

    // 2. Delete child items first to prevent orphans
    if (items.length > 0) {
      const itemIds = items.map((i) => i.id)
      await this.deleteLandingSectionItems(itemIds, sharedContext)
    }

    // 3. Proceed with deleting the parent sections using the built-in method
    await this.deleteLandingSections(ids, sharedContext)
  }
}
