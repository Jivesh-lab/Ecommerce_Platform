import React from "react"
import { MenuItem } from "./menu-data"

interface MenuListProps {
  items: MenuItem[]
}

const MenuList: React.FC<MenuListProps> = ({ items }) => {
  return (
    <ul className="flex flex-col gap-6 py-6 select-none">
      {items.map((item, index) => {
        const isSale = item.isHighlight || item.name.includes("SALE")
        return (
          <li key={index} className="group">
            <button
              className={`w-full text-left text-sm uppercase tracking-[0.18em] transition-colors duration-200 focus:outline-none ${
                isSale
                  ? "text-red-600 font-medium hover:text-red-700"
                  : "text-neutral-800 hover:text-neutral-500"
              }`}
            >
              {item.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default MenuList
