"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Heart } from "@medusajs/icons"
import { ProductDemo } from "../products/demo-products/types"

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className="w-4 h-4 text-neutral-500 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
    />
  </svg>
)

interface DemoProductDetailsProps {
  product: ProductDemo
}

export default function DemoProductDetails({ product }: DemoProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    composition: false,
    shipping: false,
  })

  // Synchronize state when product changes
  useEffect(() => {
    setSelectedColor(product.colors[0])
    setSelectedSize(null)
  }, [product])

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="relative w-full min-h-screen bg-white text-black font-sans pb-24">
      <div className="max-w-[1550px] mx-auto px-8 sm:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Section: Vertically Stacked Angle Images */}
        <div className="lg:col-span-7 flex flex-col gap-y-6">
          {product.images.map((imgSrc, index) => (
            <div key={index} className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50">
              <Image
                src={imgSrc}
                alt={`${product.name} angle ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Right Section: Sticky Info and Purchase Actions */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[110px] flex flex-col items-start select-none">
            
            {/* Badge */}
            <span className="text-[10px] uppercase tracking-widest text-[#D01313] font-semibold mb-2">
              {product.badge || "NEW NOW"}
            </span>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-[#111111] mb-2 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <span className="text-lg sm:text-xl font-semibold tracking-wider text-[#111111] mb-6">
              {product.price}
            </span>

            {/* Color Swatches */}
            <div className="flex flex-col mb-6 w-full">
              <span className="text-[11px] font-semibold tracking-wider text-neutral-400 mb-3 uppercase">
                COLOR: {selectedColor?.name || "Standard"}
              </span>
              <div className="flex gap-x-3">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-5 h-5 rounded-full border focus:outline-none transition-all duration-200 ${
                      selectedColor?.name === col.name ? "border-black scale-110" : "border-neutral-200"
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes Selection */}
            <div className="flex flex-col mb-8 w-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                  SELECT SIZE
                </span>
                <button className="text-[10px] font-semibold tracking-wider uppercase border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                  SIZE GUIDE
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 border text-center text-xs tracking-wider font-semibold rounded-sm transition-all focus:outline-none ${
                      selectedSize === sz
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 hover:border-neutral-400 text-neutral-800"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag and Add to Wishlist Actions */}
            <div className="flex gap-x-4 w-full mb-8">
              <button
                className="flex-1 py-4 bg-black text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-neutral-800 transition-colors focus:outline-none"
              >
                ADD TO BAG
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-4 border border-neutral-200 hover:border-neutral-400 transition-colors focus:outline-none rounded-sm"
                aria-label="Add to favorites"
              >
                <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "text-red-500 fill-red-500" : "text-neutral-800"}`} />
              </button>
            </div>

            {/* Accordions Info Section */}
            <div className="w-full border-t border-neutral-100 flex flex-col">
              
              {/* Accordion Item 1: Description */}
              <div className="border-b border-neutral-100 py-4 flex flex-col">
                <button
                  onClick={() => toggleAccordion("description")}
                  className="flex justify-between items-center text-left focus:outline-none w-full"
                >
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-800">
                    DESCRIPTION
                  </span>
                  <ChevronIcon isOpen={openAccordions.description} />
                </button>
                {openAccordions.description && (
                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed tracking-wide font-normal animate-in fade-in duration-300">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Accordion Item 2: Composition */}
              <div className="border-b border-neutral-100 py-4 flex flex-col">
                <button
                  onClick={() => toggleAccordion("composition")}
                  className="flex justify-between items-center text-left focus:outline-none w-full"
                >
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-800">
                    COMPOSITION AND CARE
                  </span>
                  <ChevronIcon isOpen={openAccordions.composition} />
                </button>
                {openAccordions.composition && (
                  <div className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed tracking-wide font-normal flex flex-col gap-y-2 animate-in fade-in duration-300">
                    <p><strong>Outer Shell:</strong> 52% Cotton, 45% Lyocell, 3% Elastane</p>
                    <p><strong>Lining:</strong> 100% Polyester</p>
                    <p>Do not wash. Do not bleach. Iron at a maximum of 110°C. Professional dry clean with PC121. Do not tumble dry.</p>
                  </div>
                )}
              </div>

              {/* Accordion Item 3: Shipping */}
              <div className="border-b border-neutral-100 py-4 flex flex-col">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="flex justify-between items-center text-left focus:outline-none w-full"
                >
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-800">
                    FREE SHIPPING AND RETURNS
                  </span>
                  <ChevronIcon isOpen={openAccordions.shipping} />
                </button>
                {openAccordions.shipping && (
                  <div className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed tracking-wide font-normal flex flex-col gap-y-1 animate-in fade-in duration-300">
                    <p>• Standard delivery: Free over Rs. 5,000 (3-5 business days)</p>
                    <p>• Express delivery: Rs. 500 (1-2 business days)</p>
                    <p>• Free returns within 30 days of shipment receipt.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
