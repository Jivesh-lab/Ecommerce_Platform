"use client"

import { useRef, useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

// Simple SVG Icons for arrows
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

type SubcategoryNavProps = {
  category: HttpTypes.StoreProductCategory
}

export default function SubcategoryNav({ category }: SubcategoryNavProps) {
  // Recursively collect all descendant categories (children, grandchildren, etc.)
  const getAllDescendants = (cat: HttpTypes.StoreProductCategory): HttpTypes.StoreProductCategory[] => {
    if (!cat.category_children || cat.category_children.length === 0) return []
    let descendants: HttpTypes.StoreProductCategory[] = []
    for (const child of cat.category_children) {
      descendants.push(child)
      descendants = descendants.concat(getAllDescendants(child))
    }
    return descendants
  }

  const allSubcategories = getAllDescendants(category)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true) // assume true initially
  
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      // Use a small threshold to avoid rounding issues
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // Check scroll status on mount and window resize
  useEffect(() => {
    checkScroll()
    // Add a small delay to ensure rendering is complete before measuring
    const timeoutId = setTimeout(checkScroll, 100)
    window.addEventListener("resize", checkScroll)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", checkScroll)
    }
  }, [category.category_children])

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative group w-full flex items-center">
      {/* Left Gradient & Arrow */}
      <div 
        className={`absolute left-0 top-0 bottom-0 flex items-center z-10 pointer-events-none transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      >
        <button 
          onClick={() => scrollBy(-300)}
          className="pointer-events-auto h-full bg-white px-2 text-neutral-900 flex items-center"
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
        <div className="w-16 h-full bg-gradient-to-r from-white to-transparent" />
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-8 whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 w-full"
      >
        <LocalizedClientLink 
          href="/store" 
          className="text-[13px] font-medium tracking-[0.05em] uppercase text-neutral-900 hover:text-neutral-500 transition-colors"
        >
          SEE ALL
        </LocalizedClientLink>
        {allSubcategories.map((child) => (
          <LocalizedClientLink 
            key={child.id}
            href={`/categories/${child.handle}`} 
            className="text-[13px] font-medium tracking-[0.05em] uppercase text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            {child.name}
          </LocalizedClientLink>
        ))}
      </div>

      {/* Right Gradient & Arrow */}
      <div 
        className={`absolute right-0 top-0 bottom-0 flex items-center justify-end z-10 pointer-events-none transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-16 h-full bg-gradient-to-l from-white to-transparent" />
        <button 
          onClick={() => scrollBy(300)}
          className="pointer-events-auto h-full bg-white px-2 text-neutral-900 flex items-center"
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
