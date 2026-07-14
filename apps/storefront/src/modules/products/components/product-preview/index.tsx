import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <div data-testid="product-wrapper" className="flex flex-col">
        {/* Image Container with hover overlay */}
        <div className="relative overflow-hidden group/image w-full">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          {/* Sizes Slide Up Bar */}
          <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm translate-y-full opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300 py-3 flex justify-center items-center gap-4 text-xs font-bold text-gray-800">
            {product.options?.find((o: any) => o.title?.toLowerCase() === 'size' || o.title?.toLowerCase() === 'sizes')?.values?.map((v: any) => (
              <span key={v.value} className="hover:underline cursor-pointer">{v.value}</span>
            )) || (
               <span className="hover:underline cursor-pointer tracking-wider uppercase text-[11px] text-gray-500">View Details</span>
            )}
          </div>
        </div>

        {/* Product Details (Below Image) */}
        <div className="mt-3 flex flex-col px-2">
          <div className="flex justify-between items-start gap-2">
             <div className="flex flex-col">
                <Text className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Selection</Text>
                <Text className="text-xs font-semibold text-gray-900 line-clamp-1" data-testid="product-title">
                  {product.title}
                </Text>
             </div>
             <button className="text-gray-400 hover:text-black transition-colors shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
               </svg>
             </button>
          </div>
          
          <div className="mt-1 flex items-center gap-x-2 text-[13px]">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          
          {/* Color Swatches Mock */}
          <div className="flex gap-2 mt-2.5">
             <div className="w-3 h-3 bg-[#4B4B4B] border border-gray-300"></div>
             <div className="w-3 h-3 bg-[#e5e0d8] border border-gray-300"></div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
