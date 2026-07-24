import CloudinaryImage from "@modules/common/components/cloudinary-image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface HeroProps {
  items?: any[]
  pageName?: string
}

const fallbackCampaigns: Record<string, any[]> = {
  home: [
    {
      id: "new-now",
      title: "New Now",
      button_text: "Discover More",
      button_link: "/store",
      desktop_image: "/images/hero-newnow.jpg",
    },
    {
      id: "vacation-collection",
      title: "Vacation",
      button_text: "Discover More",
      button_link: "/store",
      desktop_image: "/images/hero-vacation.jpg",
    },
  ],
  women: [
    {
      id: "women-spring",
      title: "Spring Collection",
      button_text: "Shop Women",
      button_link: "/categories/women",
      desktop_image: "/images/campaign-1.jpg",
    },
    {
      id: "women-dresses",
      title: "Elegant Dresses",
      button_text: "Discover More",
      button_link: "/categories/women",
      desktop_image: "/images/campaign-2.jpg",
    },
  ],
  men: [
    {
      id: "men-essentials",
      title: "Modern Essentials",
      button_text: "Shop Men",
      button_link: "/categories/men",
      desktop_image: "/videos/men-hero.mp4",
    },
  ],
  kids: [
    {
      id: "kids-play",
      title: "New Now",
      sub_buttons: [
        { text: "Girls", link: "/categories/kids/girls" },
        { text: "Boys", link: "/categories/kids/boys" },
        { text: "Baby Girls", link: "/categories/kids/baby-girls" },
        { text: "Baby Boys", link: "/categories/kids/baby-boys" },
        { text: "Newborn", link: "/categories/kids/newborn" },
      ],
      desktop_image: "/images/campaign-4.jpg",
    },
  ],
  teen: [
    {
      id: "teen-style",
      title: "New Now",
      sub_buttons: [
        { text: "Teen Girl", link: "/categories/teen/teen-girl" },
        { text: "Teen Boy", link: "/categories/teen/teen-boy" },
      ],
      desktop_image: "/images/campaign-5.jpg",
    },
  ]
}

const Hero: React.FC<HeroProps> = ({ items, pageName = "home" }) => {
  const fallback = fallbackCampaigns[pageName] || fallbackCampaigns["home"]

  // Merge CMS items with fallback items to guarantee no broken fields
  const activeItems = (items && items.length > 0 ? items : fallback).map((cmsItem, index) => {
    const fallbackItem = fallback[index] || fallback[0]
    return {
      id: cmsItem.id || fallbackItem.id,
      title: cmsItem.title || fallbackItem.title,
      button_text: cmsItem.button_text || fallbackItem.button_text,
      button_link: cmsItem.button_link || fallbackItem.button_link,
      sub_buttons: cmsItem.metadata?.sub_buttons || cmsItem.sub_buttons || fallbackItem.sub_buttons,
      desktop_image: cmsItem.desktop_image || cmsItem.mobile_image || fallbackItem.desktop_image,
    }
  })

  return (
    <div className="relative w-full flex flex-col bg-neutral-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-hero-bg {
          opacity: 0;
          animation: fadeInScale 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-hero-item {
          opacity: 0;
          animation: fadeSlideUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .delay-1 { animation-delay: 400ms; }
        .delay-2 { animation-delay: 800ms; }
        .delay-3 { animation-delay: 1200ms; }
      `}} />
      {activeItems.map((campaign, index) => (
        <section
          key={campaign.id}
          className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center text-white"
          role="region"
          aria-label={`Editorial Campaign: ${campaign.title}`}
        >
          {/* Full Screen Background Image */}
          <div className="absolute inset-0 w-full h-full z-0 flex [&>picture]:w-full [&>picture]:h-full animate-hero-bg">
            <CloudinaryImage
              src={campaign.desktop_image}
              alt={campaign.title || "Hero Campaign"}
              priority={index === 0}
              className="object-cover object-center w-full h-full"
            />
            {/* Subtle overlay for typography readability */}
            <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
          </div>

          {/* Centered Typography & Minimalist CTA */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center select-none">
            <h1 className="text-5xl md:text-[80px] font-bold tracking-tight uppercase mb-6 leading-none text-white animate-hero-item delay-1" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
              {campaign.title}
            </h1>
            
            {campaign.sub_buttons && campaign.sub_buttons.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 animate-hero-item delay-2">
                {campaign.sub_buttons.map((btn: any, i: number) => (
                  <LocalizedClientLink
                    key={i}
                    href={btn.link}
                    className="text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] hover:text-neutral-300 transition-colors duration-300"
                    style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
                  >
                    {btn.text}
                  </LocalizedClientLink>
                ))}
              </div>
            ) : (
              <div className="animate-hero-item delay-2">
                <LocalizedClientLink
                  href={campaign.button_link || "/store"}
                  className="text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] hover:text-neutral-300 transition-colors duration-300"
                  style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
                >
                  {campaign.button_text || "Discover More"}
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Hero
