import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import EditorialGrids from "@modules/home/components/editorial-grids"
import FeaturedCollections from "@modules/home/components/featured-collections"
import FeaturedProductsShowcase from "@modules/home/components/featured-products/showcase"
import EditorialBanner from "@modules/home/components/editorial-banner"
import BrandStory from "@modules/home/components/brand-story"
import LookbookGallery from "@modules/home/components/lookbook"
import Newsletter from "@modules/home/components/newsletter"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Bacoola Store | Modern Essentials & Luxury Couture",
  description:
    "Discover timeless fashion essentials crafted for modern living and everyday luxury. Shop our new Summer Collection.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  // Retrieve priced products from Medusa backend for featured showcase
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 8,
      fields: "*variants.calculated_price",
    },
  })

  return (
    <>
      {/* 1. Cinematic Hero Slider */}
      <Hero />

      {/* 2. Editorial Composition Layouts (Sections A, B, C, D) */}
      <EditorialGrids />

      {/* 3. Featured Categories Introduction */}
      <FeaturedCollections />

      {/* 4. Medusa Priced Products Showcase */}
      {pricedProducts && (
        <FeaturedProductsShowcase products={pricedProducts} region={region} />
      )}

      {/* 5. Seasonal Editorial Full-Width Banner */}
      <EditorialBanner />

      {/* 6. Brand Story Minimal Philosophy Banner */}
      <BrandStory />

      {/* 7. Lookbook Grid Gallery */}
      <LookbookGallery />

      {/* 8. Subscription Newsletter Form */}
      <Newsletter />
    </>
  )
}
