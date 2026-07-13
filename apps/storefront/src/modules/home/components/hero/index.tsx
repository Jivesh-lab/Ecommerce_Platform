import { HeroSlider } from "./slider"
import { HeroSlide } from "./types"

const slides: HeroSlide[] = [
  {
    id: "new-now",
    title: "New Now",
    ctaText: "Discover More",
    link: "/store",
    imageSrc: "/images/hero-newnow.jpg",
    imageAlt: "Minimal campaign model showcasing new arrivals in neutral tones",
  },
  {
    id: "vacation-collection",
    title: "Vacation Collection",
    ctaText: "Shop Now",
    link: "/store",
    imageSrc: "/images/hero-vacation.jpg",
    imageAlt: "Summer holiday model posing in minimalist vacation clothing",
  },
  {
    id: "linen-essentials",
    title: "Linen Essentials",
    ctaText: "Explore Collection",
    link: "/store",
    imageSrc: "/images/hero-linen.jpg",
    imageAlt: "Luxury organic linen shirt editorial layout",
  },
  {
    id: "summer-edit",
    title: "Summer Edit",
    ctaText: "View Collection",
    link: "/store",
    imageSrc: "/images/hero-summeredit.jpg",
    imageAlt: "Chic editorial model posing in beige summer blazer",
  },
]

const Hero = () => {
  return <HeroSlider slides={slides} />
}

export default Hero
