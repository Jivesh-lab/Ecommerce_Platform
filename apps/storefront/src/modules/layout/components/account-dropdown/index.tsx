"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useParams } from "next/navigation"
import { Fragment, useState } from "react"
import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"

const AccountDropdown = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { countryCode } = useParams() as { countryCode: string }

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div
      className="h-full z-50 flex items-center"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Popover className="relative h-full flex items-center">
        <PopoverButton className="h-full focus:outline-none flex items-center cursor-pointer">
          <LocalizedClientLink
            href="/account"
            className="text-[14px] font-semibold uppercase tracking-wider text-[#111111] hover:text-[#555555] transition-colors duration-200"
            data-testid="nav-account-link"
          >
            My Account
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="absolute top-full right-1/2 translate-x-[45%] pt-[15px] w-[350px]"
          >
            <div className="relative bg-white border border-[#111111]/20 shadow-sm py-10 px-8 flex flex-col gap-y-10 text-[12px] font-bold text-[#111111]">
              <div className="absolute -top-[7px] right-[45%] translate-x-1/2 w-[14px] h-[14px] bg-white border-t border-l border-[#111111]/20 rotate-45"></div>
              
              {customer ? (
                <>
                  <LocalizedClientLink href="/account" onClick={close} className="flex items-center justify-between hover:text-[#555555] uppercase tracking-wide">
                    <span>MY ACCOUNT</span>
                    <span className="font-normal text-[18px] leading-none mb-1">→</span>
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/account/orders" onClick={close} className="flex items-center justify-between hover:text-[#555555] uppercase tracking-wide">
                    <span>MY PURCHASES</span>
                    <span className="font-normal text-[18px] leading-none mb-1">→</span>
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/help" onClick={close} className="flex items-center justify-between hover:text-[#555555] uppercase tracking-wide">
                    <span>HELP</span>
                    <span className="font-normal text-[18px] leading-none mb-1">→</span>
                  </LocalizedClientLink>
                  <button onClick={() => { close(); handleLogout(); }} className="text-left uppercase hover:text-[#555555] tracking-wide w-full">
                    SIGN OUT
                  </button>
                </>
              ) : (
                <>
                  <LocalizedClientLink href="/account" onClick={close} className="flex items-center justify-between hover:text-[#555555] uppercase tracking-wide">
                    <span>SIGN IN</span>
                    <span className="font-normal text-[18px] leading-none mb-1">→</span>
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/account" onClick={close} className="flex items-center justify-between hover:text-[#555555] uppercase tracking-wide">
                    <span>REGISTER</span>
                    <span className="font-normal text-[18px] leading-none mb-1">→</span>
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/help" onClick={close} className="flex items-center justify-between hover:text-[#555555] uppercase tracking-wide">
                    <span>HELP</span>
                    <span className="font-normal text-[18px] leading-none mb-1">→</span>
                  </LocalizedClientLink>
                </>
              )}
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default AccountDropdown
