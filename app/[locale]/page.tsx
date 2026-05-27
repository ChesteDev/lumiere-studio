import HeroSection from '@/components/sections/HeroSection'
import PhilosophySection from '@/components/sections/PhilosophySection'
import ServicesSection from '@/components/sections/ServicesSection'
import SignatureSection from '@/components/sections/SignatureSection'
import GallerySection from '@/components/sections/GallerySection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import TeamSection from '@/components/sections/TeamSection'
import ProcessSection from '@/components/sections/ProcessSection'
import BookingSection from '@/components/sections/BookingSection'
import LocationSection from '@/components/sections/LocationSection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import CursorFollower from '@/components/ui/CursorFollower'

export default function HomePage() {
  return (
    <>
      <CursorFollower />
      <HeroSection />
      <PhilosophySection />
      <ServicesSection />
      <SignatureSection />
      <GallerySection />
      <TestimonialsSection />
      <TeamSection />
      <ProcessSection />
      <BookingSection />
      <LocationSection />
      <WhatsAppButton />
    </>
  )
}
