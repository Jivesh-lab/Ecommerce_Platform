"use client"

import React from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"

const NAV_LINKS = [
  { label: "Women", href: "/categories/women" },
  { label: "Men", href: "/categories/men" },
  { label: "Teen", href: "/categories/teen" },
  { label: "Kids", href: "/categories/kids" },
  { label: "Home", href: "/" },
]

export const HeaderLinks: React.FC = () => {
  const pathname = usePathname()

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

  return (
    <div className="flex items-center gap-x-[32px] h-full">
      {NAV_LINKS.map(({ label, href }) => {
        const active = isActive(href)
        return (
          <LocalizedClientLink
            key={label}
            href={href}
            className={clx(
              "relative py-[26px] text-[14px] font-semibold uppercase tracking-wider transition-colors duration-200 focus:outline-none",
              active ? "text-[#111111]" : "text-[#111111] hover:text-[#555555]"
            )}
          >
            {label}
            {active && (
              <span className="absolute bottom-[18px] left-0 right-0 h-[1.5px] bg-[#111111]" />
            )}
          </LocalizedClientLink>
        )
      })}
    </div>
  )
}

export default HeaderLinks
