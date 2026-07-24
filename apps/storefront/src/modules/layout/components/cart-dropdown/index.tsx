"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { useCartUIStore } from "@lib/store/useCartUIStore"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const { optimisticItemsCount, setOptimisticItemsCount, optimisticDeletedItemIds } = useCartUIStore()

  const visibleItems = cartState?.items?.filter(item => !optimisticDeletedItemIds.includes(item.id)) || []

  const serverTotalItems =
    visibleItems.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)

  // Sync server cart total to our optimistic store whenever the server cart changes
  useEffect(() => {
    setOptimisticItemsCount(serverTotalItems)
  }, [serverTotalItems, setOptimisticItemsCount])

  // Use optimistic count if available, otherwise fallback to server count
  const totalItems = optimisticItemsCount !== null ? optimisticItemsCount : serverTotalItems

  const subtotal = visibleItems.reduce((acc, item) => acc + (item.total || 0), 0) || (cartState?.subtotal ?? 0)
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()
  const router = useRouter()

  // Listen for cart-updated event
  useEffect(() => {
    const handleCartUpdated = () => {
      if (!pathname.includes("/cart")) {
        timedOpen()
      }
    }

    window.addEventListener("cart-updated", handleCartUpdated)
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated)
    }
  }, [pathname, router])

  // open cart dropdown when totalItems changes, and sync itemRef
  useEffect(() => {
    if (itemRef.current !== totalItems) {
      if (itemRef.current < totalItems && !pathname.includes("/cart")) {
        timedOpen()
      }
      itemRef.current = totalItems
    }
  }, [totalItems, pathname])

  return (
    <div className="h-full flex items-center z-50">
      <LocalizedClientLink
        className="text-[13px] font-bold uppercase tracking-wider text-[#111111] hover:text-[#555555] transition-colors duration-200"
        href="/cart"
        data-testid="nav-cart-link"
      >
        {`Bag (${totalItems})`}
      </LocalizedClientLink>
    </div>
  )
}

export default CartDropdown
