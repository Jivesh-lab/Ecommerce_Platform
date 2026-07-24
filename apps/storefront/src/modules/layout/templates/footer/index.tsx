"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  const footerLinkClass =
    "text-[13px] font-bold uppercase tracking-[0.08em] text-neutral-950 underline underline-offset-[3px] decoration-[1px] transition-colors hover:text-neutral-500"

  return (
    <footer className="w-full border-t border-neutral-100 bg-white font-sans tracking-wide text-neutral-800">
      <div className="flex w-full flex-col items-center justify-center bg-white px-4 pb-16 pt-24 text-center">
        <h2 className="text-[16px] md:text-[18px] font-bold tracking-wide text-[#111111] mb-2">
          10% off your next purchase by subscribing to the newsletter
        </h2>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-full max-w-[600px] flex-row items-stretch gap-x-2 mt-4"
        >
          <div className="flex flex-1 relative">
            <label htmlFor="newsletter-form-email-input" className="sr-only">
              E-mail
            </label>
            <input
              id="newsletter-form-email-input"
              name="email"
              type="email"
              autoComplete="email"
              aria-required="true"
              placeholder="E-mail"
              required
              className="h-[48px] w-full border border-gray-400 bg-white px-4 text-[14px] font-normal text-[#111111] placeholder:text-black focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>

          <button
            id="newsletter-form-submit-button"
            type="submit"
            className="h-[48px] min-w-[150px] border border-[#111111] bg-[#111111] px-6 text-[13px] font-bold tracking-wide text-white transition-colors hover:bg-neutral-800 flex items-center justify-center"
          >
            SIGN UP NOW
          </button>
        </form>

        <p className="mt-6 text-[13px] md:text-[14px] font-normal text-[#111111]">
          By subscribing, you confirm that you have read the{" "}
          <LocalizedClientLink
            href="/privacy-policy"
            className="font-bold hover:text-gray-600 transition-colors"
          >
            Privacy Policy
          </LocalizedClientLink>
          .
        </p>
      </div>

      <div className="flex w-full justify-center py-10">
        <button
          className="flex items-center gap-x-3 text-[13px] font-bold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:text-neutral-600 focus:outline-none"
          aria-label="Select Country"
        >
          <span>India</span>
          <span className="text-[12px] leading-none">→</span>
        </button>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-x-8 gap-y-3 border-b border-neutral-100 px-6 pb-16">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          Instagram
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          Facebook
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          Youtube
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          Tiktok
        </a>
        <a href="https://spotify.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          Spotify
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          Pinterest
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          X
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={footerLinkClass}>
          Linkedin
        </a>
      </div>

      <div className="mx-auto grid w-full max-w-none grid-cols-2 justify-items-start gap-x-8 gap-y-12 px-8 py-16 sm:px-10 md:grid-cols-4 xl:px-12">
        <div className="flex flex-col items-start gap-y-5">
          <LocalizedClientLink href="/help" className={footerLinkClass}>
            Help
          </LocalizedClientLink>
          <LocalizedClientLink href="/account/orders" className={footerLinkClass}>
            My Purchases
          </LocalizedClientLink>
          <LocalizedClientLink href="/help" className={footerLinkClass}>
            Returns
          </LocalizedClientLink>
        </div>

        <div className="flex flex-col items-start gap-y-5">
          <LocalizedClientLink href="/company" className={footerLinkClass}>
            Company
          </LocalizedClientLink>
          <LocalizedClientLink href="/careers" className={footerLinkClass}>
            Work for Mango
          </LocalizedClientLink>
          <LocalizedClientLink href="/press" className={footerLinkClass}>
            Press
          </LocalizedClientLink>
        </div>

        <div className="flex flex-col items-start gap-y-5">
          <LocalizedClientLink href="/outlet" className={footerLinkClass}>
            Mango Outlet
          </LocalizedClientLink>
          <LocalizedClientLink href="/sitemap" className={footerLinkClass}>
            Site Map
          </LocalizedClientLink>
          <LocalizedClientLink href="/responsibility" className={footerLinkClass}>
            Responsibility
          </LocalizedClientLink>
        </div>

        <div className="flex flex-col items-start gap-y-5">
          <LocalizedClientLink href="/stores" className={footerLinkClass}>
            Stores
          </LocalizedClientLink>
        </div>
      </div>

      <div className="w-full border-t border-neutral-100 bg-white py-10">
        <div className="mx-auto flex w-full max-w-none flex-col items-center justify-between gap-y-6 px-8 sm:px-10 md:flex-row xl:px-12">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            <LocalizedClientLink href="/privacy-policy" className={footerLinkClass}>
              Privacy Policy and Cookies
            </LocalizedClientLink>
            <LocalizedClientLink href="/terms-conditions" className={footerLinkClass}>
              Terms and Conditions
            </LocalizedClientLink>
            <LocalizedClientLink href="/ethics" className={footerLinkClass}>
              Ethics Channel
            </LocalizedClientLink>
          </div>

          <div className="select-none text-center text-[13px] font-bold tracking-[0.01em] text-neutral-950 md:ml-auto md:text-right">
            © {new Date().getFullYear()} MANGO All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
