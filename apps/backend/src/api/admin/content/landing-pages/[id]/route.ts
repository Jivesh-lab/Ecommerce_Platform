import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { LANDING_PAGE_MODULE } from "../../../../../modules/landing-pages"
import type { LandingPageService } from "../../../../../modules/landing-pages/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const landingPageService: LandingPageService = req.scope.resolve(LANDING_PAGE_MODULE)

  const section = await landingPageService.retrieveLandingSection(req.params.id, {
    relations: ["items"]
  })

  if (section.items) {
    section.items.sort((a: any, b: any) => a.display_order - b.display_order)
  }

  res.json({ section })
}

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const landingPageService: LandingPageService = req.scope.resolve(LANDING_PAGE_MODULE)

  const body = req.body as Record<string, unknown>

  const section = await landingPageService.updateLandingSections({
    id: req.params.id,
    ...body,
  })

  res.json({ section })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const landingPageService: LandingPageService = req.scope.resolve(LANDING_PAGE_MODULE)

  // 1. Fetch the section to know which page it belongs to before deleting
  const targetSection = await landingPageService.retrieveLandingSection(req.params.id).catch(() => null)

  // 2. Cascade delete the section
  await landingPageService.cascadeDeleteLandingSections(req.params.id)

  // 3. Re-index the remaining sections for that page
  if (targetSection) {
    const remainingSections = await landingPageService.listLandingSections({ page: targetSection.page })
    
    remainingSections.sort((a: any, b: any) => a.display_order - b.display_order)
    
    for (let i = 0; i < remainingSections.length; i++) {
      const section = remainingSections[i]
      const correctOrder = i + 1
      if (section.display_order !== correctOrder) {
        await landingPageService.updateLandingSections({
          id: section.id,
          display_order: correctOrder
        })
      }
    }
  }

  res.status(200).json({ id: req.params.id, deleted: true })
}
