import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="flex flex-col lg:flex-row w-full relative"
        data-testid="product-container"
      >
        {/* Left Side: Single Massive Image */}
        <div className="w-full lg:w-[65%] relative bg-gray-100 flex items-center justify-center overflow-hidden min-h-[60vh] lg:min-h-screen">
           {images?.length > 0 ? (
              <img 
                 src={images[0].url} 
                 alt={product.title} 
                 className="w-full h-full object-cover object-center absolute inset-0"
              />
           ) : (
              <div className="text-gray-400">No Image Available</div>
           )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-[35%] flex flex-col px-6 md:px-12 py-10 lg:py-16 lg:sticky lg:top-0 h-max max-h-screen overflow-y-auto scrollbar-hide">
          <ProductInfo product={product} />
          
          <div className="my-8">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>

          <ProductTabs product={product} />
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
