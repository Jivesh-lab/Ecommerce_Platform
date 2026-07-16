import { Metadata } from "next"
import HelpPageClient from "./HelpPageClient"

export const metadata: Metadata = {
  title: "Help",
  description: "Find answers to the most common questions about orders, returns, payments, sizes, and stores.",
}

export default function HelpPage() {
  return <HelpPageClient />
}
// Force hot-reload rebuild
