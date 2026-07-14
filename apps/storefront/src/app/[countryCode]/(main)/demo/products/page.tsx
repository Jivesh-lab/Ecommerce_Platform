"use client"

import React from "react"
import DemoProductListing from "./DemoProductListing"
import { menProducts } from "./demo-products/men"
import { womenProducts } from "./demo-products/women"

export default function ProductsListingDemo() {
  // Combine some men and women products to show a mixed master catalog on the root overview route
  const mixedProducts = [...menProducts.slice(0, 8), ...womenProducts.slice(0, 8)]

  return (
    <DemoProductListing
      category="men"
      products={mixedProducts}
    />
  )
}
