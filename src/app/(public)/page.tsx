import HeroSection from "@/src/app/(public)/home/components/HeroSection";
import ServicesSection from "@/src/app/(public)/home/components/ServicesSection";
import CategoriesSection from "@/src/app/(public)/home/components/CategoriesSection"; // ✅ new
import ProductsSection from "@/src/app/(public)/home/components/ProductsSection"; // Trending
import NewArrivalsSection from "@/src/app/(public)/home/components/NewArrivalsSection"; // Latest
import WhyChooseUsSection from "@/src/app/(public)/home/components/WhyChooseUsSection";
import TestimonialsSection from "@/src/app/(public)/home/components/TestimonialsSection";
import CTASection from "@/src/app/(public)/home/components/CTASection";

export default function HomePage() {
  return (
    <main className="bg-[#F7F7F4] min-h-screen">
      <HeroSection/>
      <ServicesSection />
      <CategoriesSection />

      {/* Dynamic Product Data Segments */}
      <ProductsSection />
      <NewArrivalsSection />

      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}