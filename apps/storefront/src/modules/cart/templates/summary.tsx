"use client"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import React, { useState } from "react"
import Spinner from "@modules/common/icons/spinner"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const [loading, setLoading] = useState(false)

  return (
    <div className="ml-auto flex w-full max-w-[484px] flex-col gap-y-10 font-sans pt-10 small:pt-1">
      <CartTotals totals={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="w-full block"
        onClick={() => setLoading(true)}
      >
        <button
          disabled={loading}
          className="flex w-full items-center justify-center gap-x-2 bg-[#111111] py-5 text-[15px] font-semibold uppercase tracking-[-0.01em] text-white transition-all duration-300 hover:bg-neutral-900 focus:outline-none"
        >
          {loading ? (
            <>
              <Spinner className="animate-spin text-white" size={16} />
              <span>Processing...</span>
            </>
          ) : (
            <span>Checkout</span>
          )}
        </button>
      </LocalizedClientLink>

      <div className="mt-7">
        <DiscountCode cart={cart} />
      </div>

      <div className="flex flex-col gap-y-4 pt-8">
        <div className="text-[13px] font-normal text-[#111111]">
          Free returns in 30 days
        </div>

        <LocalizedClientLink
          href="/delivery-returns"
          className="text-[12px] font-bold uppercase tracking-[0.05em] text-[#111111] transition-colors hover:text-neutral-500 border border-[#E5E5E5] hover:border-[#111111] py-4 w-full text-center flex items-center justify-center"
        >
          VIEW DELIVERY AND RETURNS
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Summary
