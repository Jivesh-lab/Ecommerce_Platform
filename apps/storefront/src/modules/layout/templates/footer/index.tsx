"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white w-full text-neutral-800 font-sans tracking-wide">
      {/* 1. Newsletter Subscription Section */}
      <div className="w-full bg-white flex flex-col items-center justify-center py-16 px-4 text-center border-b border-neutral-100">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-900 mb-6 max-w-[600px] leading-relaxed">
          10% off your next purchase by subscribing to the newsletter
        </h3>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row items-stretch justify-center w-full max-w-[500px] gap-2"
        >
          <input
            type="email"
            placeholder="E-mail"
            required
            className="flex-1 bg-white border border-neutral-300 px-4 py-3 text-xs focus:outline-none focus:border-black placeholder-neutral-400 font-light tracking-wider"
          />
          <button
            type="submit"
            className="border border-black bg-white hover:bg-black hover:text-white text-black text-xs font-semibold uppercase tracking-widest px-8 py-3.5 transition-all duration-300 shrink-0"
          >
            Sign up now
          </button>
        </form>

        <p className="text-[10px] text-neutral-400 mt-4 leading-relaxed font-light">
          By subscribing, you confirm that you have read the{" "}
          <LocalizedClientLink
            href="/privacy-policy"
            className="underline hover:text-black transition-colors font-medium"
          >
            Privacy Policy
          </LocalizedClientLink>
          .
        </p>
      </div>

      {/* 2. Location Indicator ("INDIA ->") */}
      <div className="w-full flex justify-center py-10">
        <button
          className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 flex items-center gap-x-3 hover:text-neutral-600 transition-colors focus:outline-none"
          aria-label="Select Country"
        >
          <span>India</span>
          <span className="text-[12px] leading-none">→</span>
        </button>
      </div>

      {/* 3. Inline Center Social Links */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pb-16 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 border-b border-neutral-100 max-w-none w-full">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          Instagram
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          Facebook
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          Youtube
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          Tiktok
        </a>
        <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          Spotify
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          Pinterest
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          X
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-neutral-500 transition-colors">
          Linkedin
        </a>
      </div>

      {/* 4. Four-Column Stacked List */}
      <div className="w-full max-w-none mx-auto px-8 sm:px-10 xl:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 justify-items-start">
        <div className="flex flex-col gap-y-5 items-start">
          <LocalizedClientLink
            href="/help"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Help
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/account/orders"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            My Purchases
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/delivery-returns"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Returns
          </LocalizedClientLink>
        </div>

        <div className="flex flex-col gap-y-5 items-start">
          <LocalizedClientLink
            href="/company"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Company
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/careers"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Work for Mango
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/press"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Press
          </LocalizedClientLink>
        </div>

        <div className="flex flex-col gap-y-5 items-start">
          <LocalizedClientLink
            href="/outlet"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Mango Outlet
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/sitemap"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Site Map
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/responsibility"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Responsibility
          </LocalizedClientLink>
        </div>

        <div className="flex flex-col gap-y-5 items-start">
          <LocalizedClientLink
            href="/gift-voucher"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Gift Voucher
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/stores"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Stores
          </LocalizedClientLink>
        </div>
      </div>

      {/* 5. Bottom Copyright / Ethics policy bar */}
      <div className="w-full border-t border-neutral-100 py-10 bg-white">
        <div className="w-full max-w-none mx-auto px-8 sm:px-10 xl:px-12 flex flex-col md:flex-row justify-between items-center gap-y-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-950">
            <LocalizedClientLink href="/privacy-policy" className="hover:text-neutral-500 transition-colors">
              Privacy Policy and Cookies
            </LocalizedClientLink>
            <LocalizedClientLink href="/terms-conditions" className="hover:text-neutral-500 transition-colors">
              Terms and Conditions
            </LocalizedClientLink>
            <LocalizedClientLink href="/ethics" className="hover:text-neutral-500 transition-colors">
              Ethics Channel
            </LocalizedClientLink>
          </div>

          <div className="text-[13px] font-normal tracking-[0.01em] text-neutral-950 select-none text-center md:text-right md:ml-auto">
            © {new Date().getFullYear()} MANGO All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
