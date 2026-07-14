import React from "react"
import { CategoryKey } from "./menu-data"

interface CategoryTabsProps {
  activeTab: CategoryKey
  onTabChange: (tab: CategoryKey) => void
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: CategoryKey; label: string }[] = [
    { key: "women", label: "WOMEN" },
    { key: "men", label: "MEN" },
    { key: "teen", label: "TEEN" },
    { key: "kids", label: "KIDS" },
  ]

  return (
    <div className="flex border-b border-neutral-100 px-8 py-4 relative select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 text-center py-2 text-xs font-semibold tracking-[0.2em] transition-all duration-300 relative focus:outline-none ${
              isActive ? "text-black font-bold" : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black animate-in fade-in duration-300" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
