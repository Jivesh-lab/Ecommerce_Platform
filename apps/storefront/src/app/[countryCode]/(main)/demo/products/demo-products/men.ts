import { ProductDemo } from "./types"

export const menProducts: ProductDemo[] = Array.from({ length: 24 }).map((_, index) => {
  const itemNumber = index + 1
  const names = [
    "Regular fit cotton blend textured shirt",
    "Slim fit cotton lyocell blend blazer",
    "Textured cotton blend polo",
    "Slim fit cotton lyocell suit trousers",
    "Regular-fit printed shirt",
    "100% linen regular fit shirt",
    "Casual chino trousers",
    "Structured cotton trench coat",
    "Knitted cotton polo shirt",
    "Relaxed fit denim jeans",
    "Premium suede leather sneakers",
    "Braided leather belt",
    "Metal frame polarized sunglasses",
    "Water-resistant utility jacket",
    "Fine-knit crew neck sweater",
    "Leather cardholder wallet",
  ]
  const name = names[index % names.length] + ` - Men Edit ${Math.ceil(itemNumber / names.length)}`
  const prices = ["Rs. 3,699.00", "Rs. 11,999.00", "Rs. 3,999.00", "Rs. 6,499.00", "Rs. 4,499.00", "Rs. 5,499.00", "Rs. 2,999.00"]
  const price = prices[index % prices.length]

  // Dedicated Men images from Unsplash downloads
  const imageSet = [
    ["/images/demo-products/men/men1.jpg", "/images/demo-products/men/men2.jpg"],
    ["/images/demo-products/men/men3.jpg", "/images/demo-products/men/men4.jpg"],
    ["/images/demo-products/men/men2.jpg", "/images/demo-products/men/men1.jpg"],
    ["/images/demo-products/men/men4.jpg", "/images/demo-products/men/men3.jpg"],
  ]
  const images = imageSet[index % imageSet.length]

  return {
    id: `men-item-${itemNumber}`,
    name,
    price,
    images,
    colors: [
      { name: "Khaki", hex: "#8F8165" },
      { name: "Brown", hex: "#5C4033" },
      { name: "Off-White", hex: "#F5F5F0" },
    ].slice(0, (index % 3) + 1),
    sizes: ["46", "48", "50", "52", "54", "56"],
    badge: index % 4 === 0 ? "NEW NOW" : undefined,
    description: "Premium editorial quality regular fit garment crafted with organic materials and finished with a soft feel.",
    slug: `men-item-${itemNumber}`,
  }
})
