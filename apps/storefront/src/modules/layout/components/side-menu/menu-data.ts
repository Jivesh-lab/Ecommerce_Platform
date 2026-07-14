export interface MenuItem {
  name: string
  link?: string
  isHighlight?: boolean
}

export type CategoryKey = "women" | "men" | "teen" | "kids"

export interface TeenData {
  subcategories: ("Teen Girl" | "Teen Boy")[]
  heightRange: string
  menus: Record<"Teen Girl" | "Teen Boy", MenuItem[]>
}

export interface KidsData {
  subcategories: ("Girls" | "Boys" | "Baby Girls" | "Baby Boys" | "Newborn")[]
  heightRange: string
  menus: Record<"Girls" | "Boys" | "Baby Girls" | "Baby Boys" | "Newborn", MenuItem[]>
}

export const womenMenu: MenuItem[] = [
  { name: "SALE 40% OFF", isHighlight: true },
  { name: "NEW NOW" },
  { name: "PARTY AND EVENTS" },
  { name: "FOR YOU" },
  { name: "CLOTHING" },
  { name: "SHOES AND ACCESSORIES" },
  { name: "PLUS SIZES" },
  { name: "COLLECTIONS" },
  { name: "FEATURED" },
]

export const menMenu: MenuItem[] = [
  { name: "SALE 40% OFF", isHighlight: true },
  { name: "NEW NOW" },
  { name: "VACATIONS" },
  { name: "CLOTHING" },
  { name: "SUITS" },
  { name: "SHOES AND ACCESSORIES" },
  { name: "COLLECTIONS" },
  { name: "OCCASIONS" },
]

export const teenData: TeenData = {
  subcategories: ["Teen Girl", "Teen Boy"],
  heightRange: "From 152 cm to 172 cm",
  menus: {
    "Teen Girl": [
      { name: "SALE 40% OFF", isHighlight: true },
      { name: "NEW NOW" },
      { name: "UPCOMING EVENTS" },
      { name: "CLOTHING" },
      { name: "SHOES AND ACCESSORIES" },
      { name: "FEATURED" },
    ],
    "Teen Boy": [
      { name: "SALE 40% OFF", isHighlight: true },
      { name: "NEW NOW" },
      { name: "UPCOMING EVENTS" },
      { name: "CLOTHING" },
      { name: "SHOES AND ACCESSORIES" },
      { name: "FEATURED" },
    ],
  },
}

export const kidsData: KidsData = {
  subcategories: ["Girls", "Boys", "Baby Girls", "Baby Boys", "Newborn"],
  heightRange: "From 4 to 14 years",
  menus: {
    Girls: [
      { name: "SALE 40% OFF", isHighlight: true },
      { name: "NEW NOW" },
      { name: "SUMMER CLUB" },
      { name: "CLOTHING" },
      { name: "SHOES AND ACCESSORIES" },
      { name: "COLLECTIONS" },
      { name: "FEATURED" },
    ],
    Boys: [
      { name: "SALE 40% OFF", isHighlight: true },
      { name: "NEW NOW" },
      { name: "SUMMER CLUB" },
      { name: "CLOTHING" },
      { name: "SHOES AND ACCESSORIES" },
      { name: "COLLECTIONS" },
      { name: "FEATURED" },
    ],
    "Baby Girls": [
      { name: "SALE 40% OFF", isHighlight: true },
      { name: "NEW NOW" },
      { name: "SUMMER CLUB" },
      { name: "CLOTHING" },
      { name: "SHOES AND ACCESSORIES" },
      { name: "COLLECTIONS" },
      { name: "FEATURED" },
    ],
    "Baby Boys": [
      { name: "SALE 40% OFF", isHighlight: true },
      { name: "NEW NOW" },
      { name: "SUMMER CLUB" },
      { name: "CLOTHING" },
      { name: "SHOES AND ACCESSORIES" },
      { name: "COLLECTIONS" },
      { name: "FEATURED" },
    ],
    Newborn: [
      { name: "SALE 40% OFF", isHighlight: true },
      { name: "NEW NOW" },
      { name: "SUMMER CLUB" },
      { name: "CLOTHING" },
      { name: "SHOES AND ACCESSORIES" },
      { name: "COLLECTIONS" },
      { name: "FEATURED" },
    ],
  },
}
