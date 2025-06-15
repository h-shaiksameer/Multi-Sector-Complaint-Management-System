import Hero from "@/components/landing/hero"
import StatsSection from "@/components/landing/stats-section"
import SectorHighlights from "@/components/landing/sector-highlights"
import TestimonialsCarousel from "@/components/landing/testimonials-carousel"
import Footer from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Hero />
      <StatsSection />
      <SectorHighlights />
      <TestimonialsCarousel />
      <Footer />
    </div>
  )
}
