"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const EditorialGrids: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-y-24 md:gap-y-36 py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1550px] mx-auto bg-white overflow-hidden">
      
      {/* SECTION A: Two Equal Images Side by Side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] w-full overflow-hidden group cursor-pointer"
        >
          <LocalizedClientLink href="/store">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/campaign-1.jpg"
                alt="Men's fashion editorial display"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="absolute bottom-10 left-10 z-10 flex flex-col items-start text-white">
              <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-widest mb-3">
                Men's Collection
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] border-b border-white pb-1">
                Shop Collection
              </span>
            </div>
          </LocalizedClientLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative aspect-[4/5] w-full overflow-hidden group cursor-pointer"
        >
          <LocalizedClientLink href="/store">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/campaign-2.jpg"
                alt="Summer fashion editorial showcase"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="absolute bottom-10 left-10 z-10 flex flex-col items-start text-white">
              <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-widest mb-3">
                Summer Collection
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] border-b border-white pb-1">
                Shop Collection
              </span>
            </div>
          </LocalizedClientLink>
        </motion.div>
      </section>

      {/* SECTION B: One Large (65%) + Two Stacked Images */}
      <section className="grid grid-cols-1 lg:grid-cols-10 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] lg:aspect-[16/11] lg:col-span-6 w-full overflow-hidden group cursor-pointer"
        >
          <LocalizedClientLink href="/store">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/campaign-3.jpg"
                alt="Primary campaign image"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>
            <div className="absolute bottom-10 left-10 z-10 flex flex-col items-start text-white">
              <h2 className="text-2xl sm:text-4xl font-extralight uppercase tracking-[0.2em] mb-4">
                The New Tailoring
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] border-b border-white pb-1">
                Explore Edits
              </span>
            </div>
          </LocalizedClientLink>
        </motion.div>

        <div className="lg:col-span-4 flex flex-col gap-8 md:gap-12 justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-[16/10] w-full overflow-hidden group cursor-pointer"
          >
            <LocalizedClientLink href="/store">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/campaign-4.jpg"
                  alt="Stacked image 1"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>
              <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start text-white">
                <h3 className="text-xl font-light uppercase tracking-widest mb-2">
                  Linen Essentials
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-white pb-0.5">
                  Shop Now
                </span>
              </div>
            </LocalizedClientLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[16/10] w-full overflow-hidden group cursor-pointer"
          >
            <LocalizedClientLink href="/store">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/campaign-5.jpg"
                  alt="Stacked image 2"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>
              <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start text-white">
                <h3 className="text-xl font-light uppercase tracking-widest mb-2">
                  Wardrobe Staples
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-white pb-0.5">
                  Shop Now
                </span>
              </div>
            </LocalizedClientLink>
          </motion.div>
        </div>
      </section>

      {/* SECTION C: Editorial Split Layout (Magazine-Inspired Offset spacing) */}
      <section className="flex flex-col md:flex-row gap-12 items-center justify-around py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] w-full max-w-[500px] overflow-hidden group cursor-pointer"
        >
          <LocalizedClientLink href="/store">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/campaign-6.jpg"
                alt="Magazine split layout left"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start text-white">
              <h3 className="text-xl font-light uppercase tracking-widest mb-2">Modern Silhouettes</h3>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-white pb-0.5">View More</span>
            </div>
          </LocalizedClientLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[2/3] w-full max-w-[420px] overflow-hidden group cursor-pointer md:mt-24"
        >
          <LocalizedClientLink href="/store">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/campaign-7.jpg"
                alt="Magazine split layout right"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start text-white">
              <h3 className="text-xl font-light uppercase tracking-widest mb-2">Tailored Classics</h3>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-white pb-0.5">View More</span>
            </div>
          </LocalizedClientLink>
        </motion.div>
      </section>

      {/* SECTION D: Three Image Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-8">
        {[
          { title: "New Arrivals", img: "/images/campaign-7.jpg" },
          { title: "Accessories", img: "/images/campaign-8.jpg" },
          { title: "Footwear", img: "/images/campaign-6.jpg" },
        ].map(({ title, img }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="relative aspect-[3/4] w-full overflow-hidden group cursor-pointer"
          >
            <LocalizedClientLink href="/store">
              <div className="absolute inset-0 z-0">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start text-white">
                <h3 className="text-xl font-light uppercase tracking-[0.15em] mb-2">{title}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-white pb-0.5">Shop Category</span>
              </div>
            </LocalizedClientLink>
          </motion.div>
        ))}
      </section>

    </div>
  )
}

export default EditorialGrids
