import ServicesSection from '@/components/sections/ServicesSection'
import SignatureSection from '@/components/sections/SignatureSection'
import ProcessSection from '@/components/sections/ProcessSection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function ServicesPage() {
  return (
    <>
      <div className="h-20" />
      <ServicesSection />
      <SignatureSection />
      <ProcessSection />
      <WhatsAppButton />
    </>
  )
}
