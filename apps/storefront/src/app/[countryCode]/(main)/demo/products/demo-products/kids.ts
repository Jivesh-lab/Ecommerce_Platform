import { ProductDemo } from "./types"

export const kidsProducts: ProductDemo[] = Array.from({ length: 18 }).map((_, index) => {
  const itemNumber = index + 1
  const names = [
    "Printed cotton t-shirt",
    "Denim classic dungarees",
    "Floral print cotton dress",
    "Elastic waist jogger shorts",
    "Leather double-velcro sneakers",
    "Organic cotton knit cardigan",
    "Basic full-zip hoodie",
    "Striped linen polo shirt",
    "Ruffled denim overalls",
    "Lightweight windbreaker jacket",
    "Packable canvas backpack",
    "Ribbed cotton socks pack",
    "Sunglasses with UV protection",
    "Straw sun hat with ribbon",
    "Suede chelsea boots",
    "Embroidered cotton blouse",
  ]
  const name = names[index % names.length] + ` - Kids Edit ${Math.ceil(itemNumber / names.length)}`
  const prices = ["Rs. 1,499.00", "Rs. 2,999.00", "Rs. 2,499.00", "Rs. 1,699.00", "Rs. 3,499.00", "Rs. 2,799.00", "Rs. 1,999.00"]
  const price = prices[index % prices.length]

  // Dedicated Kids images from Unsplash downloads
  const imageSet = [
    ["/images/demo-products/kids/kids1.jpg", "/images/demo-products/kids/kids2.jpg"],
    ["/images/demo-products/kids/kids3.jpg", "/images/demo-products/kids/kids4.jpg"],
    ["/images/demo-products/kids/kids2.jpg", "/images/demo-products/kids/kids1.jpg"],
    ["/images/demo-products/kids/kids4.jpg", "/images/demo-products/kids/kids3.jpg"],
  ]
  const images = imageSet[index % imageSet.length]

  return {
    id: `kids-item-${itemNumber}`,
    name,
    price,
    images,
    colors: [
      { name: "Sky Blue", hex: "#AED8E6" },
      { name: "Yellow", hex: "#FFDE43" },
      { name: "Off-White", hex: "#F5F5F0" },
    ].slice(0, (index % 3) + 1),
    sizes: ["4 Years", "6 Years", "8 Years", "10 Years", "12 Years"],
    badge: index % 4 === 0 ? "ORGANIC COTTON" : undefined,
    description: "Premium editorial quality regular fit garment crafted with organic materials and finished with a soft feel.",
    slug: `kids-item-${itemNumber}`,
  }
})
