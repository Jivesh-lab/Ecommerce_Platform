"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useParams } from "next/navigation"
import { useState, useRef } from "react"
import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"

const AccountDropdown = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { countryCode } = useParams() as { countryCode: string }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div
      className="h-full z-50 flex items-center relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LocalizedClientLink
        href="/account"
        className={`text-[13px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 border-b border-transparent py-2 ${isOpen ? 'text-[#111111] border-[#111111] pb-[1px]' : 'text-[#111111] hover:text-[#555555]'}`}
        data-testid="nav-account-link"
      >
        MY ACCOUNT
      </LocalizedClientLink>

      <div
        className={`absolute top-[100%] right-1/2 translate-x-[50%] pt-[8px] w-[320px] pointer-events-auto transition-all duration-200 ease-out origin-top ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
        }`}
      >
        <div className="relative bg-white border border-[#111111] shadow-sm py-8 px-6 flex flex-col gap-y-6 text-[12px] font-bold text-[#111111]">
          <div className="absolute -top-[6px] right-1/2 translate-x-1/2 w-[10px] h-[10px] bg-white border-t border-l border-[#111111] rotate-45"></div>
            
            <LocalizedClientLink href="/account" onClick={() => setIsOpen(false)} className="flex w-full items-center justify-between hover:text-[#555555] uppercase tracking-[0.02em]">
              <span>MY ACCOUNT</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </LocalizedClientLink>
            <LocalizedClientLink href="/account/orders" onClick={() => setIsOpen(false)} className="flex w-full items-center justify-between hover:text-[#555555] uppercase tracking-[0.02em]">
              <span>MY PURCHASES</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </LocalizedClientLink>
            <LocalizedClientLink href="/help" onClick={() => setIsOpen(false)} className="flex w-full items-center justify-between hover:text-[#555555] uppercase tracking-[0.02em]">
              <span>HELP</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </LocalizedClientLink>
            <button onClick={() => { setIsOpen(false); handleLogout(); }} className="flex w-full items-center justify-between uppercase hover:text-[#555555] tracking-[0.02em]">
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>
      </div>
  )
}

export default AccountDropdown
