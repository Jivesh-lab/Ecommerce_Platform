"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const EditorialBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-neutral-900 text-white flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/campaign-5.jpg"
          alt="Autumn Collection Campaign"
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        {/* Editorial vignette filter overlay */}
        <div className="absolute inset-0 bg-black/35 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-2xl px-4 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.85, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.4em] uppercase text-white/90 mb-3"
        >
          Seasonal campaign
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extralight tracking-[0.18em] uppercase text-white mb-4 leading-none"
        >
          Autumn Collection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base font-light tracking-wide text-neutral-200 mb-8"
        >
          Crafted for Everyday Luxury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <LocalizedClientLink
            href="/store"
            className="px-8 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-transparent hover:text-white border border-white transition-all duration-300 shadow-md"
          >
            Shop Collection
          </LocalizedClientLink>
        </motion.div>
      </div>
    </section>
  )
}

export default EditorialBanner
