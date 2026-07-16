"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CreditCard, RotateCcw, Shirt, Store, Truck, UserRound } from "lucide-react"


const helpCategories = [
  {
    title: "Delivery and order tracking",
    href: "#delivery",
    icon: Truck,
  },
  {
    title: "Returns, exchanges and refunds",
    href: "#returns",
    icon: RotateCcw,
  },
  {
    title: "Payments, promotions and gift cards",
    href: "#payments",
    icon: CreditCard,
  },
  {
    title: "Information on sizes and products",
    href: "#sizes",
    icon: Shirt,
  },
  {
    title: "Personal data and notifications",
    href: "#personal-data",
    icon: UserRound,
  },
  {
    title: "Stores",
    href: "#stores",
    icon: Store,
  },
]

const faqs = [
  {
    id: "delivery",
    question: "Where is my order?",
    answer:
      "Track your order from your account or from the shipping confirmation email. We update tracking details as soon as the carrier shares them.",
  },
  {
    id: "returns",
    question: "How can I exchange or return an online purchase?",
    answer:
      "Start a return from your order history. Once approved, follow the return instructions and we’ll process the exchange or refund after inspection.",
  },
  {
    id: "payments",
    question: "How and when will I receive my refund?",
    answer:
      "Refunds are issued to the original payment method after the returned items are received and verified. Timing depends on your bank or card provider.",
  },
  {
    id: "personal-data",
    question: "Why do we need your KYC to send you the order?",
    answer:
      "Some deliveries require identity verification to comply with carrier or local regulations and to make sure the package reaches the right person.",
  },
]

export default function HelpPageClient() {
  return (
    <div className="w-full bg-white text-neutral-950 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 pt-0 pb-32">
        {/* Header: Centered HELP */}
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-[24px] font-semibold uppercase text-neutral-950">
            Help
          </h1>
          <p className="mt-4 text-[18px] text-neutral-600 font-light tracking-wide">
            Hello, how can we help you?
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-24">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 mb-10">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-y-8 max-w-[800px]">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <LocalizedClientLink 
                  href={`#${faq.id}`}
                  className="text-[15px] sm:text-[16px] text-neutral-900 font-normal hover:text-neutral-500 transition-colors"
                >
                  {faq.question}
                </LocalizedClientLink>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 mb-10">
            Categories
          </h2>

          {/* Grid container with top and left outer borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full border-t border-l border-neutral-300">
            {helpCategories.map((item) => {
              const Icon = item.icon

              return (
                <LocalizedClientLink
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col items-center justify-center h-[200px] bg-white text-center hover:bg-neutral-50/50 transition-colors duration-200 border-r border-b border-neutral-300"
                >
                  <Icon className="h-7 w-7 stroke-[1.2px] text-neutral-800 group-hover:scale-105 transition-transform duration-200" />
                  <span className="max-w-[220px] text-[14px] text-neutral-800 font-normal mt-5 px-4 tracking-wide">
                    {item.title}
                  </span>
                </LocalizedClientLink>
              )
            })}
            
            {/* Empty filler cells to complete the perfect grid rectangle on desktop */}
            {Array.from({ length: (4 - (helpCategories.length % 4)) % 4 }).map((_, i) => (
              <div key={`empty-${i}`} className="hidden xl:block border-r border-b border-neutral-300 bg-white" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
