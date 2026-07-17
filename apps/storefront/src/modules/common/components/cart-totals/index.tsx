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
    <div className="flex w-full flex-col font-sans">
      <dl className="flex flex-col gap-y-3 m-0 p-0 text-[#111111] text-[13px]">
        <div className="flex items-center justify-between">
          <dt className="font-normal m-0">Subtotal</dt>
          <dd
            data-testid="cart-subtotal"
            data-value={item_subtotal || 0}
            className="font-normal m-0"
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="font-normal m-0">Delivery</dt>
          <dd
            data-testid="cart-shipping"
            data-value={shipping_subtotal || 0}
            className="font-normal m-0"
          >
            {shipping_subtotal === 0
              ? "Free"
              : convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })
            }
          </dd>
        </div>

        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <dt className="font-normal m-0">Discount</dt>
            <dd
              className="font-normal m-0"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 pb-1">
          <dt className="text-[14px] font-bold uppercase m-0">TOTAL</dt>
          <dd
            data-testid="cart-total"
            data-value={total || 0}
            className="text-[14px] font-bold uppercase m-0"
          >
            {convertToLocale({ amount: total ?? 0, currency_code })}
          </dd>
        </div>
      </dl>
      <p className="text-[12px] text-[#555555] font-light mt-1">Taxes included</p>
    </div>
  )
}

export default CartTotals
