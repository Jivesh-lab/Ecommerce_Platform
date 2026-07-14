"use client"

import React from "react"
import DemoProductDetails from "./DemoProductDetails"
import { menProducts } from "../products/demo-products/men"

export default function ProductDetailsDemo() {
  // Use the first men's product as the default fallback product
  const defaultProduct = menProducts[0]

  return <DemoProductDetails product={defaultProduct} />
}
