"use client"

import React, { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import MegaMenu from "../navigation/MegaMenu"

const NAV_LINKS = [
  { label: "Home", href: "/", key: "home" },
  { label: "Women", href: "/landingpage/women", key: "women" },
  { label: "Men", href: "/landingpage/men", key: "men" },
  { label: "Teen", href: "/landingpage/teen", key: "teen" },
  { label: "Kids", href: "/landingpage/kids", key: "kids" },
]

import { HttpTypes } from "@medusajs/types"
export const HeaderLinks: React.FC<{ categories?: HttpTypes.StoreProductCategory[] }> = ({ categories = [] }) => {
  const pathname = usePathname()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const navRefs = useRef<Record<string, HTMLSpanElement | null>>({})
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, top: 0, opacity: 0 })

  const isActive = (href: string) => {
    if (!pathname) return false

    // Normalize path by stripping the locale code (e.g. "/us/categories/men" -> "/categories/men")
    const segments = pathname.split("/").filter(Boolean)
    const cleanSegments =
      segments.length > 0 && segments[0].length === 2 ? segments.slice(1) : segments
    const cleanPath = "/" + cleanSegments.join("/")

    if (href === "/") {
      return cleanPath === "/"
    }
    return cleanPath.startsWith(href)
  }

  // Update underline position
  useEffect(() => {
    const updateUnderline = () => {
      const currentActiveKey = NAV_LINKS.find(link => isActive(link.href))?.key || null
      const targetKey = activeCategory || currentActiveKey

      if (targetKey && navRefs.current[targetKey] && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const elRect = navRefs.current[targetKey]!.getBoundingClientRect()
        
        setUnderlineStyle({
          left: elRect.left - containerRect.left,
          width: elRect.width,
          top: elRect.bottom - containerRect.top + 2,
          opacity: 1
        })
      } else {
        setUnderlineStyle(prev => ({ ...prev, opacity: 0 }))
      }
    }

    // Small delay ensures layout is complete before measuring
    const timeout = setTimeout(updateUnderline, 50)
    window.addEventListener("resize", updateUnderline)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("resize", updateUnderline)
    }
  }, [activeCategory, pathname])

  // Handle cursor entering a link trigger
  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (key === "home") {
      setActiveCategory(null)
    } else {
      setActiveCategory(key)
    }
  }

  // Handle cursor leaving a link trigger
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 150) // small delay to allow cursor to reach the menu dropdown
  }

  // Handle cursor entering the mega menu dropdown directly
  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  // Handle cursor leaving the mega menu dropdown
  const handleMenuMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 150)
  }

  return (
    <div className="flex items-center gap-x-[28px] h-full relative" ref={containerRef}>
      {NAV_LINKS.map(({ label, href, key }) => {
        const active = isActive(href)
        return (
          <div
            key={label}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            className="h-full flex items-center"
          >
            <LocalizedClientLink
              href={href}
              className={clx(
                "relative flex items-center text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 focus:outline-none",
                active ? "text-[#111111]" : "text-[#111111] hover:text-[#555555]"
              )}
            >
              <span ref={(el) => { navRefs.current[key] = el }}>
                {label}
              </span>
            </LocalizedClientLink>
          </div>
        )
      })}

      {/* Sliding Underline */}
      <span
        className="absolute h-[1.5px] bg-[#111111] transition-all duration-300 ease-out z-10 pointer-events-none"
        style={{
          left: `${underlineStyle.left}px`,
          top: `${underlineStyle.top}px`,
          width: `${underlineStyle.width}px`,
          opacity: underlineStyle.opacity,
        }}
      />

      {/* Render the Dropdown Panel below Navbar */}
      <MegaMenu
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
        categories={categories}
      />
    </div>
  )
}

export default HeaderLinks
