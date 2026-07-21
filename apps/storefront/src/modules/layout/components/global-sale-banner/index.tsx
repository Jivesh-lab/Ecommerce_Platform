import React from "react"
import { listProducts } from "@lib/data/products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { InformationCircleSolid } from "@medusajs/icons"

export default async function GlobalSaleBanner({ countryCode }: { countryCode: string }) {
  // Fetch up to 100 products to determine the highest active discount
  const { response: { products } } = await listProducts({
    countryCode,
    queryParams: { limit: 100 },
  }).catch(() => ({ response: { products: [] } }))

  let maxDiscount = 0

  for (const product of products) {
    if (product.variants) {
      for (const variant of product.variants) {
        // @ts-ignore
        const calcPrice = variant.calculated_price
        if (
          calcPrice && 
          calcPrice.original_amount !== null && 
          calcPrice.calculated_amount !== null && 
          calcPrice.original_amount > calcPrice.calculated_amount
        ) {
          const original = calcPrice.original_amount
          const calculated = calcPrice.calculated_amount
          
          const diffPercentage = Math.round(((original - calculated) / original) * 100)
          
          if (diffPercentage > maxDiscount) {
            maxDiscount = diffPercentage
          }
        }
      }
    }
  }

  // If no products are actively on sale, don't render the banner
  if (maxDiscount === 0) {
    return null
  }

  return (
    <div className="w-full bg-[#cc0000] text-white flex items-center justify-center relative py-2.5 px-4 z-40">
      <div className="flex items-center gap-x-4 text-[12px] sm:text-[13px] font-bold tracking-wider">
        <span className="uppercase">Sale Up To {maxDiscount}% Off</span>
        <LocalizedClientLink 
          href="/store" 
          className="underline hover:text-gray-200 transition-colors uppercase font-bold"
        >
          Shop Now
        </LocalizedClientLink>
      </div>
      
      <div className="absolute right-4 hidden sm:block cursor-help hover:text-gray-200 transition-colors" title="Valid until indicated date or while stocks last.">
        <InformationCircleSolid className="w-5 h-5" />
      </div>
    </div>
  )
}
