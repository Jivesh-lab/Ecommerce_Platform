import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Refunds",
  description: "Manage your refunds and bank details.",
}

export default function RefundsPage() {
  return (
    <div className="w-full flex flex-col items-center pt-[100px] font-sans text-[#111111] text-center px-4">
      <div className="w-full max-w-[600px] mx-auto flex flex-col items-center">
        
        <h1 className="text-[15px] font-bold uppercase tracking-wider mb-6">
          REFUNDS
        </h1>
        
        <p className="text-[13px] font-normal tracking-wide mb-14">
          Choose how you would like to be refunded for your orders paid on delivery.
        </p>
        
        <div className="flex flex-col items-center gap-y-5 max-w-[400px]">
          <p className="text-[13px] font-normal tracking-wide leading-relaxed">
            To be able to add your bank details, you first need to have made a purchase.
          </p>
          <p className="text-[13px] font-normal tracking-wide leading-relaxed">
            You can find more information about refunds on our <LocalizedClientLink href="/help" className="font-bold underline underline-offset-[3px] decoration-1 hover:text-[#555555] transition-colors">Help</LocalizedClientLink> page.
          </p>
        </div>
        
      </div>
    </div>
  )
}
