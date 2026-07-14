import React, { useState, useEffect } from "react"
import { XMark } from "@medusajs/icons"
import { navigationData, CategoryKey } from "./navigation-data"
import MegaMenuColumn from "./MegaMenuColumn"

interface MegaMenuProps {
  activeCategory: CategoryKey | null
  setActiveCategory: (category: CategoryKey | null) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  activeCategory,
  setActiveCategory,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [lastCategory, setLastCategory] = useState<CategoryKey>("women")

  // Keep track of the last active category so content doesn't disappear during exit animation
  useEffect(() => {
    if (activeCategory) {
      setLastCategory(activeCategory)
    }
  }, [activeCategory])

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onMouseLeave()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onMouseLeave])

  const isOpen = activeCategory !== null
  const currentCategoryData = navigationData[lastCategory]
  const currentMenuItems = currentCategoryData?.menuItems || []

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "women", label: "WOMEN" },
    { key: "men", label: "MEN" },
    { key: "teen", label: "TEEN" },
    { key: "kids", label: "KIDS" },
  ]

  return (
    <>
      {/* 1. Backdrop Overlay (fades in/out) */}
      <div
        onClick={onMouseLeave}
        className={`fixed top-[76px] left-0 right-0 bottom-0 bg-black/15 z-[998] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 2. Left Sliding Panel (slides in/out from left) */}
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`fixed top-[76px] left-0 bottom-0 w-full max-w-[420px] bg-white border-r border-[#ECECEC] z-[999] transition-transform duration-300 ease-in-out select-none flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header Bar inside Panel - Close Button only */}
        <div className="flex border-b border-neutral-100 pl-8 pr-6 py-5 bg-white items-center justify-end">
          <button
            onClick={onMouseLeave}
            className="p-1 text-neutral-400 hover:text-black transition-colors duration-200 focus:outline-none"
            aria-label="Close menu"
          >
            <XMark className="w-5 h-5 stroke-[1.2px]" />
          </button>
        </div>

        {/* Scrollable Single Menu List (Hidden scrollbars) */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <MegaMenuColumn menuItems={currentMenuItems} />
        </div>
      </div>
    </>
  )
}

export default MegaMenu
