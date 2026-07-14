export interface ProductDemo {
  id: string
  name: string
  price: string
  images: string[]
  colors: { name: string; hex: string }[]
  sizes: string[]
  badge?: string
  description: string
  slug: string
}
