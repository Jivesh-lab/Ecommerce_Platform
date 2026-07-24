"use client"

import React, { useEffect } from "react"
import { useCartUIStore } from "@lib/store/useCartUIStore"
import Image from "next/image"
import Link from "next/link"
import { XMark } from "@medusajs/icons"

export default function AddedToBagModal() {
  const { isAddedModalOpen, lastAddedItem, closeAddedModal, optimisticItemsCount } = useCartUIStore()

  // Auto-close after 5 seconds
  useEffect(() => {
    if (isAddedModalOpen) {
      const timer = setTimeout(() => {
        closeAddedModal()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isAddedModalOpen, closeAddedModal])

  if (!isAddedModalOpen || !lastAddedItem) {
    return null
  }

  // Find thumbnail
  const thumbnail = lastAddedItem.thumbnail || lastAddedItem.variant?.product?.thumbnail || lastAddedItem.product?.thumbnail

  // Price formatting (using a basic approach since it's client side, or just relying on item total)
  // Medusa usually returns unit_price or total in the cart items. We'll use a simple fallback for display
  // assuming INR based on user screenshot. Or better, we format it based on the currency_code.
  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format((lastAddedItem.unit_price || 0) / 100)

  // Find size and color from variant options if they exist
  let size = ""
  let color = ""
  if (lastAddedItem.variant?.options) {
    const sizeOption = lastAddedItem.variant.options.find((o: any) => o.option?.title?.toLowerCase() === "size")
    const colorOption = lastAddedItem.variant.options.find((o: any) => o.option?.title?.toLowerCase() === "color")
    size = sizeOption?.value || ""
    color = colorOption?.value || ""
  }

  return (
    <div className="fixed top-[80px] right-4 md:right-8 z-[100] w-full max-w-[400px] bg-white border border-neutral-200 shadow-xl p-6 transition-all duration-300 animate-in slide-in-from-right-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-black">
          ADDED TO YOUR SHOPPING BAG
        </h3>
        <button onClick={closeAddedModal} className="text-neutral-500 hover:text-black transition-colors focus:outline-none">
          <XMark className="w-5 h-5" />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex gap-x-4 mb-8">
        <div className="w-[100px] h-[133px] relative bg-neutral-50 shrink-0">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={lastAddedItem.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-[10px] text-neutral-400">
              NO IMAGE
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 pt-6">
          <span className="text-[14px] text-neutral-900 mb-2">
            {lastAddedItem.product_title || lastAddedItem.title}
          </span>
          <span className="text-[14px] text-neutral-900 mb-4">
            {price}
          </span>
          <div className="flex items-center gap-x-3 text-[14px] text-neutral-900">
            {size && <span className="font-medium">{size}</span>}
            {color && <span>{color}</span>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-x-2">
        <Link
          href="/checkout?step=delivery"
          onClick={closeAddedModal}
          className="flex-1 py-4 border border-black bg-white text-black text-xs font-bold uppercase tracking-widest text-center hover:bg-neutral-50 transition-colors focus:outline-none"
        >
          CHECKOUT
        </Link>
        <Link
          href="/cart"
          onClick={closeAddedModal}
          className="flex-1 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest text-center hover:bg-neutral-800 transition-colors focus:outline-none border border-black"
        >
          VIEW BAG ({optimisticItemsCount || 1})
        </Link>
      </div>
    </div>
  )
}
