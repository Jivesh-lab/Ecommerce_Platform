import { notFound } from "next/navigation"
import DemoProductDetails from "../DemoProductDetails"

// Import category mock datasets
import { menProducts } from "../../products/demo-products/men"
import { womenProducts } from "../../products/demo-products/women"
import { kidsProducts } from "../../products/demo-products/kids"
import { teenProducts } from "../../products/demo-products/teen"

type Props = {
  params: Promise<{
    slug: string
    countryCode: string
  }>
}

export async function generateStaticParams() {
  const allProducts = [
    ...menProducts,
    ...womenProducts,
    ...kidsProducts,
    ...teenProducts,
  ]
  return allProducts.map((p) => ({
    slug: p.slug,
  }))
}

export default async function DemoProductDetailsPage(props: Props) {
  const params = await props.params
  const { slug } = params

  const allProducts = [
    ...menProducts,
    ...womenProducts,
    ...kidsProducts,
    ...teenProducts,
  ]

  const product = allProducts.find((p) => p.id === slug || p.slug === slug)

  if (!product) {
    notFound()
  }

  return <DemoProductDetails product={product} />
}
