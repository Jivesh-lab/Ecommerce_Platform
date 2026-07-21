import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { LANDING_PAGE_MODULE } from "../../../../modules/landing-pages"
import type { LandingPageService } from "../../../../modules/landing-pages/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const landingPageService: LandingPageService = req.scope.resolve(LANDING_PAGE_MODULE)

  const filters: Record<string, unknown> = {}
  const pageFilter = req.query.page as string | undefined
  if (pageFilter) {
    filters.page = pageFilter
  }

  const sections = await landingPageService.listLandingSections(filters, {
    relations: ["items"],
    order: { display_order: "ASC" },
  })

  // Sort items within each section by display_order
  sections.forEach((s: any) => {
    if (s.items) {
      s.items.sort((a: any, b: any) => a.display_order - b.display_order)
    }
  })

  res.json({ sections })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const landingPageService: LandingPageService = req.scope.resolve(LANDING_PAGE_MODULE)

  const payload = req.body as Record<string, unknown>

  // Auto-assign display order
  const existingSections = await landingPageService.listLandingSections({ page: payload.page as string })
  const nextOrder = existingSections.length > 0 
    ? Math.max(...existingSections.map((s: any) => s.display_order)) + 1 
    : 1
    
  payload.display_order = nextOrder

  const section = await landingPageService.createLandingSections(payload)

  res.status(201).json({ section })
}
