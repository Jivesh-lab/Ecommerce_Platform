import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export default async function CartLayoutWrapper() {
  console.time("CartLayoutWrapper: retrieveCustomer")
  const customer = await retrieveCustomer()
  console.timeEnd("CartLayoutWrapper: retrieveCustomer")

  console.time("CartLayoutWrapper: retrieveCart")
  const cart = await retrieveCart()
  console.timeEnd("CartLayoutWrapper: retrieveCart")
  
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    console.time("CartLayoutWrapper: listCartOptions")
    const { shipping_options } = await listCartOptions()
    shippingOptions = shipping_options
    console.timeEnd("CartLayoutWrapper: listCartOptions")
  }

  return (
    <>
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}
      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
    </>
  )
}
