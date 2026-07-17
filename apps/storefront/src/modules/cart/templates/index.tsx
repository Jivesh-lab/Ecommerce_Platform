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
    <div className="min-h-screen bg-white pb-16 pt-6 font-sans">
      <div className="mx-auto max-w-[1920px] px-2 sm:px-2 xl:px-2" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="flex flex-col">
            <div className="mb-8 px-5 pt-4 small:px-10">
              <h2 className="text-[17px] font-semibold uppercase tracking-[-0.02em] text-neutral-950 small:text-[18px]">
                Shopping Bag ({totalItems})
              </h2>
            </div>

            <div className="grid grid-cols-1 items-start gap-y-12 px-2 small:grid-cols-[minmax(0,1fr)_470px] small:gap-x-20 small:px-0">
              <div className="flex flex-col gap-y-8">
                <ItemsTemplate cart={cart} />
              </div>

              <div className="relative px-5 small:px-0">
                <div className="sticky top-20">
                  {cart && cart.region && <Summary cart={cart} />}
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
