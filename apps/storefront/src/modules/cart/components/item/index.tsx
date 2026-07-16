"use client"

import { Table, Text, clx } from "@modules/common/components/ui"
import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Image from "next/image"
import { useState } from "react"
import { Heart, X } from "lucide-react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isWishlist, setIsWishlist] = useState(false)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const handleDelete = async () => {
    setError(null)
    setIsDeleting(true)
    await deleteLineItem(item.id).catch((err) => {
      setError(err.message)
      setIsDeleting(false)
    })
  }

  // Determine max quantity
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  // Dynamic values
  const categoryName = item.variant?.product?.categories?.[0]?.name || item.variant?.product?.collection?.title || "Selection"
  
  // Extract options (Color, Size)
  const titleParts = (item.variant?.title || "").split("/")
  const sizeOption = titleParts[0]?.trim() || item.variant?.sku || "One Size"
  const colorOption = titleParts[1]?.trim() || "Neutral"

  // -------------------------------------------------------------
  // PREVIEW LAYOUT (Used in Cart Dropdown & Checkout Sidebar)
  // -------------------------------------------------------------
  if (type === "preview") {
    return (
      <Table.Row className="w-full border-b border-neutral-100" data-testid="product-row">
        <Table.Cell className="!pl-0 p-4 w-16">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="flex w-12 relative overflow-hidden bg-neutral-50"
            style={{ aspectRatio: "1 / 1" }}
          >
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.product_title || "Product image"}
                fill
                className="object-cover object-center"
                draggable={false}
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                <span className="text-[9px] text-neutral-400">No Image</span>
              </div>
            )}
          </LocalizedClientLink>
        </Table.Cell>

        <Table.Cell className="text-left">
          <Text className="text-xs font-semibold text-neutral-900 line-clamp-1" data-testid="product-title">
            {item.product_title}
          </Text>
          <Text className="text-[10px] text-neutral-400">
            Size: {sizeOption} | Color: {colorOption}
          </Text>
        </Table.Cell>

        <Table.Cell className="!pr-0">
          <span className="flex flex-col items-end h-full justify-center text-xs">
            <span className="flex gap-x-1">
              <Text className="text-neutral-500">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>
        </Table.Cell>
      </Table.Row>
    )
  }

  // -------------------------------------------------------------
  // FULL CART PAGE LAYOUT (Premium Mango Product Card)
  // -------------------------------------------------------------
  return (
    <div 
      className="group flex flex-col relative w-full bg-white" 
      data-testid="product-row"
    >
      {/* Absolute Loading Spinner overlay */}
      {(updating || isDeleting) && (
        <div className="absolute inset-0 bg-white/70 z-20 flex items-center justify-center backdrop-blur-[1px]">
          <Spinner className="animate-spin text-black" size={24} />
        </div>
      )}

      {/* Delete / Remove "X" in top-right overlaying the image */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 z-10 bg-white hover:bg-neutral-50 text-neutral-800 p-2.5 transition-colors duration-200 focus:outline-none border border-neutral-100"
        aria-label="Remove item"
        data-testid="product-delete-button"
      >
        <X size={14} />
      </button>

      {/* Product Image Link with strict aspect ratio */}
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="relative w-full overflow-hidden bg-neutral-50 border border-neutral-100 block"
        style={{ aspectRatio: "3 / 4" }}
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.product_title || "Product image"}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            draggable={false}
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <span className="text-xs text-neutral-400">No Image</span>
          </div>
        )}
      </LocalizedClientLink>

      {/* Details Box */}
      <div className="mt-3 flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-y-1">
          {/* Category */}
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">
            {categoryName}
          </span>

          <div className="flex justify-between items-start gap-x-2">
            {/* Title */}
            <h3 className="text-sm font-normal text-neutral-900 tracking-wide line-clamp-1" data-testid="product-title">
              {item.product_title}
            </h3>

            {/* Wishlist toggle */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsWishlist(!isWishlist)
              }}
              className="text-neutral-400 hover:text-black transition-colors focus:outline-none shrink-0 mt-0.5"
              aria-label="Wishlist"
            >
              <Heart
                size={16}
                className={isWishlist ? "fill-red-600 text-red-600 scale-105 transition-transform" : ""}
                strokeWidth={isWishlist ? 0 : 2}
              />
            </button>
          </div>

          {/* Color & Size */}
          <div className="text-[11px] text-neutral-500 font-light flex items-center gap-x-2 mt-0.5">
            <span>Color: <strong className="font-normal text-neutral-950">{colorOption}</strong></span>
            <span className="text-neutral-300">|</span>
            <span>Size: <strong className="font-normal text-neutral-950">{sizeOption}</strong></span>
          </div>
        </div>

        {/* Quantity Select and Prices */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-x-4">
          <select
            value={item.quantity}
            onChange={(e) => changeQuantity(parseInt(e.target.value))}
            className="bg-transparent border border-neutral-200 hover:border-neutral-400 px-2.5 py-1.5 text-xs font-normal focus:outline-none focus:border-black tracking-wide cursor-pointer transition-colors"
            data-testid="product-select-button"
          >
            {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => (
              <option value={i + 1} key={i}>
                Qty: {i + 1}
              </option>
            ))}
          </select>

          <div className="flex flex-col items-end">
            <span className="text-xs text-neutral-400">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
            <span className="text-sm font-semibold text-neutral-950 mt-0.5">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Error message */}
      <ErrorMessage error={error} data-testid="product-error-message" />
    </div>
  )
}

export default Item
