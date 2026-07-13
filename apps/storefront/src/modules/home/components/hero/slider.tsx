"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HeroSlide } from "./types"

interface HeroSliderProps {
  slides: HeroSlide[]
}

const AUTOPLAY_INTERVAL = 5000 // 5 seconds

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  // Manage Autoplay timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        handleNext()
      }
    }, AUTOPLAY_INTERVAL)
  }, [isPaused, handleNext])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  // Handle Keyboard Accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      handlePrev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      handleNext()
    }
  }

  if (!slides || slides.length === 0) return null

  const currentSlide = slides[activeIndex]

  return (
    <section
      className="relative w-full h-[calc(100vh-76px)] min-h-[550px] overflow-hidden bg-neutral-950 text-white select-none group focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Cinematic Editorial Fashion Slider"
    >
      {/* Background Images Crossfade + Scale Transition */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            {/* Editorial Scale Transition (Scale 1.05 -> 1) */}
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.imageAlt}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Dark subtle overlay for contrast */}
              <div className="absolute inset-0 bg-black/30 z-10" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Text Content & CTA Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              exit: { opacity: 0, transition: { duration: 0.3 } },
            }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Centered Massive Headline (Slides up + fades) */}
            <motion.h1
              variants={{
                hidden: { y: 35, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.18em] uppercase text-white mb-8 leading-none select-none"
            >
              {currentSlide.title}
            </motion.h1>

            {/* Small CTA Link (Fades in afterwards) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <LocalizedClientLink
                href={currentSlide.link}
                className="text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] border-b-[1.5px] border-white pb-1.5 hover:text-neutral-300 hover:border-neutral-300 transition-colors duration-300"
              >
                {currentSlide.ctaText}
              </LocalizedClientLink>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Visible on Hover */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 border border-white/10 text-white rounded-full bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hover:border-white focus:opacity-100 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 border border-white/10 text-white rounded-full bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hover:border-white focus:opacity-100 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={18} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
      </button>

      {/* Pagination Dots/Dashes */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3"
        role="tablist"
        aria-label="Slideshow pagination"
      >
        {slides.map((_, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-[2px] rounded-none transition-all duration-500 ease-out focus:outline-none ${
                isActive ? "w-10 sm:w-16 bg-white" : "w-4 sm:w-6 bg-white/30 hover:bg-white/60"
              }`}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        })}
      </div>
    </section>
  )
}
