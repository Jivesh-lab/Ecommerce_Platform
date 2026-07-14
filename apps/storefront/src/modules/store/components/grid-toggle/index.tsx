"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { clx } from "@medusajs/ui"

export default function GridToggle({ currentGrid = "4" }: { currentGrid?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setGrid = useCallback(
    (gridCols: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("grid", gridCols)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  return (
    <div className="flex gap-3 text-gray-400">
      {/* 2 columns icon (optional/mobile usually) */}
      <span 
        onClick={() => setGrid("2")}
        className={clx("w-4 h-4 border-[1.5px] border-current block cursor-pointer hover:text-black transition-colors", {
          "text-black": currentGrid === "2"
        })}
      ></span>
      
      {/* 4 columns icon (2 vertical rectangles) */}
      <span 
        onClick={() => setGrid("4")}
        className={clx("flex gap-[2px] cursor-pointer hover:text-black transition-colors", {
          "text-black": currentGrid === "4"
        })}
      >
        <span className="w-[6px] h-4 border-[1.5px] border-current block"></span>
        <span className="w-[6px] h-4 border-[1.5px] border-current block"></span>
      </span>
      
      {/* 6 columns icon (4 small squares, matching the Mango 6-col toggle) */}
      <span 
        onClick={() => setGrid("6")}
        className={clx("flex gap-[2px] flex-wrap w-[18px] cursor-pointer hover:text-black transition-colors", {
          "text-black": currentGrid === "6"
        })}
      >
        <span className="w-[7px] h-[7px] border-[1.5px] border-current block"></span>
        <span className="w-[7px] h-[7px] border-[1.5px] border-current block"></span>
        <span className="w-[7px] h-[7px] border-[1.5px] border-current block"></span>
        <span className="w-[7px] h-[7px] border-[1.5px] border-current block"></span>
      </span>
    </div>
  )
}
