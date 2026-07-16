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
    <div className="flex flex-col gap-y-8 font-sans w-full max-w-[488px] ml-auto">
      {/* 1. Totals (Subtotal, Delivery, TOTAL) */}
      <CartTotals totals={cart} />

      {/* 2. Large black CHECKOUT button */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="w-full block"
        onClick={() => setLoading(true)}
      >
        <button
          disabled={loading}
          className="w-full bg-[#111111] hover:bg-neutral-900 text-white text-[15px] font-semibold uppercase tracking-[0.02em] py-4 transition-all duration-300 focus:outline-none flex items-center justify-center gap-x-2"
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

      {/* 3. Promo Code Accordion */}
      <div className="mt-1">
        <DiscountCode cart={cart} />
      </div>

      {/* 4. Delivery & Returns Static Info */}
      <div className="border-t border-neutral-100 pt-8 flex flex-col gap-y-3">
        <div className="flex items-center gap-x-2 text-[15px] text-neutral-700 font-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-neutral-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          <span>Free returns in 30 days</span>
        </div>

        <LocalizedClientLink
          href="/delivery-returns"
          className="text-[15px] font-semibold uppercase tracking-[0.02em] text-neutral-950 hover:text-neutral-700 transition-colors"
        >
          View Delivery and Returns
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Summary
