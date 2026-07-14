import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import GridToggle from "@modules/store/components/grid-toggle"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
  grid,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  grid?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const currentGrid = grid || "4"

  return (
    <div className="w-full" data-testid="category-container">
      {/* Red Banner */}
      <div className="w-full bg-[#B32D20] text-white text-center py-2 text-xs md:text-sm font-semibold tracking-wider uppercase">
        Sale up to 40% off
      </div>

      <div className="px-4 md:px-8 py-6">
        <h1 className="text-xl md:text-2xl font-bold mb-6 tracking-wide uppercase" data-testid="store-page-title">
          MEN&apos;S SALE
        </h1>

        {/* Categories Menu */}
        <div className="flex overflow-x-auto gap-6 text-xs md:text-sm font-semibold tracking-wider text-gray-500 mb-8 uppercase whitespace-nowrap pb-2 scrollbar-hide">
          <span className="text-black border-b-2 border-black pb-1 cursor-pointer">All</span>
          <span className="hover:text-black transition-colors cursor-pointer">Shirts</span>
          <span className="hover:text-black transition-colors cursor-pointer">Trousers</span>
          <span className="hover:text-black transition-colors cursor-pointer">Polos</span>
          <span className="hover:text-black transition-colors cursor-pointer">T-Shirts</span>
          <span className="hover:text-black transition-colors cursor-pointer">Suits</span>
          <span className="hover:text-black transition-colors cursor-pointer">Accessories</span>
          <span className="hover:text-black transition-colors cursor-pointer">Linen</span>
          <span className="hover:text-black transition-colors cursor-pointer">Jeans</span>
          <span className="hover:text-black transition-colors cursor-pointer">Shorts</span>
          <span className="hover:text-black transition-colors cursor-pointer">Swimwear</span>
        </div>

        {/* Filter & Order Header */}
        <div className="flex justify-between items-center mb-2 text-sm font-medium tracking-wide">
           <div className="flex gap-4 items-center relative z-20 group">
              <span className="cursor-pointer hover:underline uppercase text-xs md:text-sm font-bold tracking-wider">Filter and order</span>
              {/* Dropdown for functional existing RefinementList */}
              <div className="absolute top-full left-0 bg-white shadow-elevation-card-rest rounded-lg p-2 hidden group-hover:block w-[300px] border border-gray-100 transition-opacity">
                <RefinementList sortBy={sort} />
              </div>
           </div>
           
           {/* Interactive Layout Toggle Icons */}
           <GridToggle currentGrid={currentGrid} />
        </div>
      </div>

      <div className="w-full">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
            grid={currentGrid}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
