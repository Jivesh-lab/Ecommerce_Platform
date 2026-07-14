import { ProductDemo } from "./types"

export const teenProducts: ProductDemo[] = Array.from({ length: 18 }).map((_, index) => {
  const itemNumber = index + 1
  const names = [
    "Oversized cotton cargo pants",
    "Cropped ribbed halter top",
    "High-top canvas lace sneakers",
    "Relaxed fit denim jacket",
    "Graphic print casual sweatshirt",
    "90s relaxed fit straight jeans",
    "Mini canvas utility backpack",
    "Ribbed scoop neck tank top",
    "Oversized flannel check shirt",
    "Platform slide sandals",
    "Beanie knit cap with logo",
    "Fleece zip utility vest",
    "Oval metal wire sunglasses",
    "Nylon belt bag fanny pack",
    "Ribbed knit crop cardigan",
    "Vintage wash print t-shirt",
  ]
  const name = names[index % names.length] + ` - Teen Edit ${Math.ceil(itemNumber / names.length)}`
  const prices = ["Rs. 2,999.00", "Rs. 1,699.00", "Rs. 4,499.00", "Rs. 3,999.00", "Rs. 2,499.00", "Rs. 3,499.00", "Rs. 1,999.00"]
  const price = prices[index % prices.length]

  // Dedicated Teen images from Unsplash downloads
  const imageSet = [
    ["/images/demo-products/teen/teen1.jpg", "/images/demo-products/teen/teen2.jpg"],
    ["/images/demo-products/teen/teen3.jpg", "/images/demo-products/teen/teen4.jpg"],
    ["/images/demo-products/teen/teen2.jpg", "/images/demo-products/teen/teen1.jpg"],
    ["/images/demo-products/teen/teen4.jpg", "/images/demo-products/teen/teen3.jpg"],
  ]
  const images = imageSet[index % imageSet.length]

  return {
    id: `teen-item-${itemNumber}`,
    name,
    price,
    images,
    colors: [
      { name: "Sage", hex: "#9CAF88" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Off-White", hex: "#F5F5F0" },
    ].slice(0, (index % 3) + 1),
    sizes: ["XXS", "XS", "S", "M", "L"],
    badge: index % 6 === 0 ? "RECYCLED POLY" : index % 3 === 0 ? "NEW NOW" : undefined,
    description: "Premium editorial quality regular fit garment crafted with organic materials and finished with a soft feel.",
    slug: `teen-item-${itemNumber}`,
  }
})
