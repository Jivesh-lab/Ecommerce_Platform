import { ProductDemo } from "./types"

export const womenProducts: ProductDemo[] = Array.from({ length: 24 }).map((_, index) => {
  const itemNumber = index + 1
  const names = [
    "Linen blend wrap dress",
    "Ribbed knit halter top",
    "Structured satin blazer",
    "Wide-leg pleat trousers",
    "Leather strap high-heel sandals",
    "Woven leather shopper bag",
    "Gold-plated hoop earrings",
    "Floral print halter jumpsuit",
    "Pleated crepe midi skirt",
    "Oversized cotton poplin shirt",
    "Fine knit cardigan sweater",
    "Premium denim shorts",
    "Cat-eye acetate sunglasses",
    "Suede crossbody bag",
    "Cropped tweed jacket",
    "Minimalist slide sandals",
  ]
  const name = names[index % names.length] + ` - Women Edit ${Math.ceil(itemNumber / names.length)}`
  const prices = ["Rs. 4,999.00", "Rs. 2,699.00", "Rs. 9,999.00", "Rs. 5,499.00", "Rs. 6,999.00", "Rs. 8,999.00", "Rs. 1,999.00"]
  const price = prices[index % prices.length]

  // Dedicated Women images from Unsplash downloads
  const imageSet = [
    ["/images/demo-products/women/women1.jpg", "/images/demo-products/women/women2.jpg"],
    ["/images/demo-products/women/women3.jpg", "/images/demo-products/women/women4.jpg"],
    ["/images/demo-products/women/women2.jpg", "/images/demo-products/women/women1.jpg"],
    ["/images/demo-products/women/women4.jpg", "/images/demo-products/women/women3.jpg"],
  ]
  const images = imageSet[index % imageSet.length]

  return {
    id: `women-item-${itemNumber}`,
    name,
    price,
    images,
    colors: [
      { name: "Ecru", hex: "#F3EFE0" },
      { name: "Black", hex: "#111111" },
      { name: "Rust", hex: "#B85A38" },
    ].slice(0, (index % 3) + 1),
    sizes: ["36", "38", "40", "42", "44"],
    badge: index % 5 === 0 ? "LIMITED EDITION" : index % 3 === 0 ? "NEW NOW" : undefined,
    description: "Premium editorial quality regular fit garment crafted with organic materials and finished with a soft feel.",
    slug: `women-item-${itemNumber}`,
  }
})
