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
      <Table.Row
        className="w-full border-b border-neutral-200 hover:bg-transparent"
        data-testid="product-row"
      >
        <Table.Cell className="w-24 !pl-0 px-0 py-6 align-top">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="relative flex w-20 overflow-hidden bg-neutral-50"
            style={{ aspectRatio: "3 / 4" }}
          >
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.product_title || "Product image"}
                fill
                className="object-cover object-center"
                draggable={false}
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                <span className="text-[9px] text-neutral-400">No Image</span>
              </div>
            )}
          </LocalizedClientLink>
        </Table.Cell>

        <Table.Cell className="py-6 pl-0 pr-4 text-left align-top">
          <Text
            className="mb-1 line-clamp-1 text-sm font-normal tracking-[0.02em] text-neutral-900"
            data-testid="product-title"
          >
            {item.product_title}
          </Text>
          <div className="flex flex-col gap-y-1 text-[12px] font-light text-neutral-600">
            <span>Quantity: {item.quantity}</span>
            <span>Size: {sizeOption}</span>
            <span>{colorOption}</span>
          </div>
        </Table.Cell>

        <Table.Cell className="!pr-0 py-6 align-top">
          <span className="flex flex-col items-end text-sm font-semibold text-neutral-900">
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
      className="group relative flex w-full flex-col bg-white" 
      data-testid="product-row"
    >
      {(updating || isDeleting) && (
        <div className="absolute inset-0 bg-white/70 z-20 flex items-center justify-center backdrop-blur-[1px]">
          <Spinner className="animate-spin text-black" size={24} />
        </div>
      )}

      <button
        onClick={handleDelete}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center bg-white/90 text-neutral-800 transition-colors duration-200 hover:bg-white focus:outline-none"
        aria-label="Remove item"
        data-testid="product-delete-button"
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="relative block w-full overflow-hidden bg-neutral-50"
        style={{ aspectRatio: "35 / 49" }}
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

      <div className="flex flex-1 flex-col justify-between border-t border-neutral-200 px-4 pb-4 pt-3 small:px-5">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-start justify-between gap-x-2">
            <h3
              className="line-clamp-1 text-[17px] font-normal leading-[1.2] text-neutral-950"
              data-testid="product-title"
            >
              {item.product_title}
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsWishlist(!isWishlist)
              }}
              className="mt-0.5 shrink-0 text-neutral-700 transition-colors hover:text-black focus:outline-none"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className={isWishlist ? "fill-red-600 text-red-600 scale-105 transition-transform" : ""}
                strokeWidth={isWishlist ? 0 : 2}
              />
            </button>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            {categoryName}
          </span>

          <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-light text-neutral-500">
            <span>
              Size: <strong className="font-normal text-neutral-950">{sizeOption}</strong>
            </span>
            <span className="text-neutral-300">|</span>
            <span>
              Color: <strong className="font-normal text-neutral-950">{colorOption}</strong>
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-x-4 border-t border-neutral-200 pt-4">
          <select
            value={item.quantity}
            onChange={(e) => changeQuantity(parseInt(e.target.value))}
            className="cursor-pointer border border-neutral-300 bg-transparent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950 transition-colors hover:border-neutral-500 focus:border-black focus:outline-none"
            data-testid="product-select-button"
          >
            {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => (
              <option value={i + 1} key={i}>
                Qty {i + 1}
              </option>
            ))}
          </select>

          <div className="flex flex-col items-end">
            <span className="text-[11px] text-neutral-400">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
            <span className="mt-0.5 text-[15px] font-semibold text-neutral-950">
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
