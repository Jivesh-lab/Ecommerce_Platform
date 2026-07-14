import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface DoubleCampaignProps {
  leftTitle: string
  leftImage: string
  rightTitle: string
  rightImage: string
  ctaText?: string
  link?: string
}

const DoubleCampaign: React.FC<DoubleCampaignProps> = ({
  leftTitle,
  leftImage,
  rightTitle,
  rightImage,
  ctaText = "SEE ALL",
  link = "/store",
}) => {
  return (
    <section className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-neutral-900 overflow-hidden relative">
      {/* Left Column */}
      <div className="relative h-full w-full group overflow-hidden border-b md:border-b-0 md:border-r border-neutral-900">
        <Image
          src={leftImage}
          alt={leftTitle}
          fill
          loading="lazy"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute bottom-12 left-12 z-20 text-white select-none">
          <h2 className="text-3xl font-light uppercase tracking-[0.15em] mb-4 leading-none">
            {leftTitle}
          </h2>
          <div>
            <LocalizedClientLink
              href={link}
              className="text-white text-xs uppercase tracking-[0.25em] border-b border-white pb-1 hover:text-neutral-300 hover:border-neutral-300 transition-all duration-300"
            >
              {ctaText}
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="relative h-full w-full group overflow-hidden">
        <Image
          src={rightImage}
          alt={rightTitle}
          fill
          loading="lazy"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute bottom-12 left-12 z-20 text-white select-none">
          <h2 className="text-3xl font-light uppercase tracking-[0.15em] mb-4 leading-none">
            {rightTitle}
          </h2>
          <div>
            <LocalizedClientLink
              href={link}
              className="text-white text-xs uppercase tracking-[0.25em] border-b border-white pb-1 hover:text-neutral-300 hover:border-neutral-300 transition-all duration-300"
            >
              {ctaText}
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FullWidthCampaignProps {
  title: string
  image: string
  ctaText?: string
  link?: string
}

const FullWidthCampaign: React.FC<FullWidthCampaignProps> = ({
  title,
  image,
  ctaText = "DISCOVER MORE",
  link = "/store",
}) => {
  return (
    <section className="w-full h-screen relative bg-neutral-900 overflow-hidden flex flex-col justify-center items-center text-center text-white">
      <Image
        src={image}
        alt={title}
        fill
        loading="lazy"
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25 z-10" />
      <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center select-none">
        <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-[0.18em] mb-8 leading-none">
          {title}
        </h2>
        <div>
          <LocalizedClientLink
            href={link}
            className="text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] border-b-[1.5px] border-white pb-1.5 hover:text-neutral-300 hover:border-neutral-300 transition-colors duration-300"
          >
            {ctaText}
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

const EditorialFlow = () => {
  return (
    <div className="relative w-full flex flex-col">
      {/* Section 2: 50 | 50 Cards */}
      <DoubleCampaign
        leftTitle="Linen Sale"
        leftImage="/images/campaign-1.jpg"
        rightTitle="Trousers Sale"
        rightImage="/images/campaign-2.jpg"
      />

      {/* Section 3: 50 | 50 Cards */}
      <DoubleCampaign
        leftTitle="T-Shirts Sale"
        leftImage="/images/campaign-3.jpg"
        rightTitle="Shirts Sale"
        rightImage="/images/campaign-4.jpg"
      />

      {/* Section 4: Full Width Hero Campaign */}
      <FullWidthCampaign
        title="T-Shirt Guide"
        image="/images/campaign-5.jpg"
      />

      {/* Section 5: Full Width Hero Campaign */}
      <FullWidthCampaign
        title="The Suit Guide"
        image="/images/campaign-6.jpg"
      />

      {/* Section 6: 50 | 50 Cards */}
      <DoubleCampaign
        leftTitle="Shirts"
        leftImage="/images/campaign-7.jpg"
        rightTitle="Suits"
        rightImage="/images/campaign-8.jpg"
      />

      {/* Section 7: 50 | 50 Cards */}
      <DoubleCampaign
        leftTitle="Summer Shoes"
        leftImage="/images/lookbook-1.jpg"
        rightTitle="Accessories"
        rightImage="/images/lookbook-2.jpg"
      />

      {/* Section 8: Full Width Campaign */}
      <FullWidthCampaign
        title="The Autumn Edit"
        image="/images/hero-arrivals.jpg"
      />
    </div>
  )
}

export default EditorialFlow
