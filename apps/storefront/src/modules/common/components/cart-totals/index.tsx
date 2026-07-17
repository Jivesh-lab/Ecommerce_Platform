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
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-y-3 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Subtotal
          </span>
          <span
            data-testid="cart-subtotal"
            data-value={item_subtotal || 0}
            className="text-base font-normal text-neutral-950"
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Delivery
          </span>
          <span
            data-testid="cart-shipping"
            data-value={shipping_subtotal || 0}
            className="text-base font-normal text-neutral-950"
          >
            {shipping_subtotal === 0
              ? "Free"
              : convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })
            }
          </span>
        </div>

        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
              Discount
            </span>
            <span
              className="text-sm font-semibold text-rose-600"
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

        {!!tax_total && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
              Taxes
            </span>
            <span
              data-testid="cart-taxes"
              data-value={tax_total || 0}
              className="text-sm text-neutral-500"
            >
              {convertToLocale({ amount: tax_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>

      <div className="my-6 w-full border-b border-neutral-200" />

      <div className="flex flex-col gap-y-1">
        <div className="flex items-baseline justify-between text-neutral-950">
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">
            Total
          </span>
          <span
            className="text-[2rem] font-semibold leading-none tracking-[-0.02em]"
            data-testid="cart-total"
            data-value={total || 0}
          >
            {convertToLocale({ amount: total ?? 0, currency_code })}
          </span>
        </div>
        <span className="self-start text-sm font-light tracking-[0.01em] text-neutral-500">
          Taxes included
        </span>
      </div>
    </div>
  )
}

export default CartTotals
