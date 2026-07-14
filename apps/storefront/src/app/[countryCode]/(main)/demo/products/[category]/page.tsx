import { notFound } from "next/navigation"
import DemoProductListing from "../DemoProductListing"

// Import category datasets
import { menProducts } from "../demo-products/men"
import { womenProducts } from "../demo-products/women"
import { kidsProducts } from "../demo-products/kids"
import { teenProducts } from "../demo-products/teen"

type Props = {
  params: Promise<{
    category: string
    countryCode: string
  }>
}

export async function generateStaticParams() {
  const categories = ["men", "women", "kids", "teen"]
  return categories.map((cat) => ({
    category: cat,
  }))
}

export default async function DemoCategoryProductListing(props: Props) {
  const params = await props.params
  const { category } = params

  let products = null
  if (category === "men") {
    products = menProducts
  } else if (category === "women") {
    products = womenProducts
  } else if (category === "kids") {
    products = kidsProducts
  } else if (category === "teen") {
    products = teenProducts
  }

  if (!products) {
    notFound()
  }

  return (
    <DemoProductListing
      category={category as "men" | "women" | "kids" | "teen"}
      products={products}
    />
  )
}
