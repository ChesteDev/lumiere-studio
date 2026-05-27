import TeamSection from '@/components/sections/TeamSection'
import PhilosophySection from '@/components/sections/PhilosophySection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function AboutPage() {
  return (
    <>
      <div className="h-20" />
      <PhilosophySection />
      <TeamSection />
      <WhatsAppButton />
    </>
  )
}
