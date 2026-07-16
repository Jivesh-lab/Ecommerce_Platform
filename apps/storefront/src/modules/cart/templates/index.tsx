import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import Divider from "@modules/common/components/divider"
import Carousel from "../components/carousel"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
  region,
  products,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  region: HttpTypes.StoreRegion | null
  products: HttpTypes.StoreProduct[]
}) => {
  const totalItems = cart?.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0

  return (
    <div className="pt-8 pb-16 bg-white min-h-screen font-sans">
      <div className="max-w-none mx-auto px-6 sm:px-8 xl:px-10" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="flex flex-col">
            {/* Header: Shopping Bag (X) */}
            <div className="mb-8 flex flex-col items-start pb-2">
              <h2 className="text-[26px] font-semibold uppercase tracking-[0.02em] text-neutral-950">
                Shopping Bag ({totalItems})
              </h2>
            </div>

            {/* Two-Column Grid */}
            <div className="grid grid-cols-1 small:grid-cols-[minmax(0,1fr)_500px] gap-x-16 gap-y-12 items-start">
              {/* Left Column: Product Cards */}
              <div className="flex flex-col gap-y-8">
                <ItemsTemplate cart={cart} />
              </div>

              {/* Right Column: Sticky Summary */}
              <div className="relative">
                <div className="sticky top-20">
                  {cart && cart.region && (
                    <Summary cart={cart} />
                  )}
                </div>
              </div>
            </div>

            {/* Recommended Products Carousel */}
            {products && products.length > 0 && region && (
              <Carousel products={products} region={region} />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <EmptyCartMessage />
            
            {/* Show recommended products even when cart is empty */}
            {products && products.length > 0 && region && (
              <div className="w-full border-t border-neutral-100 mt-16 pt-8">
                <Carousel products={products} region={region} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
