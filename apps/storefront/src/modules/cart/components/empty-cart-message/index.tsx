import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 px-4 flex flex-col justify-center items-center text-center h-full min-h-[50vh]" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="text-[16px] md:text-[18px] font-bold uppercase tracking-wide text-[#111111]"
      >
        Your shopping bag is empty
      </Heading>
      <Text className="text-[14px] text-[#555555] mt-3 mb-8 max-w-[32rem]">
        Get Inspiration for your new wardrobe from the latest looks
      </Text>
      <LocalizedClientLink href="/store" className="inline-flex">
        <span className="bg-[#111111] text-white text-[12px] md:text-[13px] font-bold uppercase tracking-widest px-10 py-4 hover:bg-[#333333] transition-colors duration-200">
          See what&apos;s new
        </span>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
