import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

// Import unified architecture components
import LandingRenderer from "@modules/home/components/landing-renderer"
import CategoryProductListing from "./CategoryProductListing"
import SubcategorySlider from "../components/subcategory-slider"

import { getLandingSections } from "@lib/data/landing-pages"
import { listCategories } from "@lib/data/categories"

const EDITORIAL_CATEGORIES = ["women", "men", "kids", "teen", "home"]

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  // Collect parents
  const parents = [] as HttpTypes.StoreProductCategory[]
  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }
  getParents(category)

  // Collect category IDs from this category and its descendants
  const allCategoryIds: string[] = []

  const collectIds = (cat: HttpTypes.StoreProductCategory) => {
    if (cat?.id && !allCategoryIds.includes(cat.id)) {
      allCategoryIds.push(cat.id)
    }
    if (cat?.category_children) {
      cat.category_children.forEach(collectIds)
    }
  }
  collectIds(category)

  const productGrid = (
    <Suspense fallback={<SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />}>
      <PaginatedProducts
        sortBy={sort}
        page={pageNumber}
        categoryId={allCategoryIds}
        countryCode={countryCode}
        optionValueIds={optionValueIds}
      />
    </Suspense>
  )

  // Render unified Product Listing Page (Page 2 Layout) for all category pages
  return (
    <CategoryProductListing category={category} parents={parents} allCategories={[]}>
      {productGrid}
    </CategoryProductListing>
  )
}
