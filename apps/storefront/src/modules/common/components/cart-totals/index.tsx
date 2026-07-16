"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="w-full flex flex-col font-sans">
      <div className="flex flex-col gap-y-4 text-[15px] text-neutral-700">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-[0.01em]">Subtotal</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0} className="text-neutral-900 font-medium">
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Delivery / Shipping */}
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-[0.01em]">Delivery</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0} className="text-neutral-900 font-medium">
            {shipping_subtotal === 0 
              ? "Free" 
              : convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })
            }
          </span>
        </div>

        {/* Discounts */}
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span className="uppercase tracking-wider text-rose-600">Discount</span>
            <span
              className="text-rose-600 font-medium"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}

        {/* Taxes details line */}
        {!!tax_total && (
          <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
            <span className="uppercase tracking-[0.01em] text-neutral-400">Taxes</span>
            <span data-testid="cart-taxes" data-value={tax_total || 0} className="text-neutral-500">
              {convertToLocale({ amount: tax_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>

      {/* Thin Divider */}
      <div className="w-full border-b border-neutral-200 my-5" />

      {/* Total Section */}
      <div className="flex flex-col gap-y-1">
        <div className="flex items-baseline justify-between text-neutral-950">
          <span className="text-[17px] font-semibold uppercase tracking-[0.02em]">TOTAL</span>
          <span
            className="text-[17px] font-semibold tracking-[0.01em]"
            data-testid="cart-total"
            data-value={total || 0}
          >
            {convertToLocale({ amount: total ?? 0, currency_code })}
          </span>
        </div>
        <span className="text-[15px] text-neutral-500 font-light tracking-[0.01em] self-start">
          Taxes included
        </span>
      </div>
    </div>
  )
}

export default CartTotals
