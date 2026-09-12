import { HeroSection } from "../../components/hero-section/hero-section";
import { FeaturedServices } from "../../components/featured-services/featured-services";
import { Testimonials } from "../../components/testimonials/testimonials";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <Testimonials />
    </>
  );
}
