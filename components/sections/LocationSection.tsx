'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function LocationSection() {
  const t = useTranslations('location')

  const access = [
    {
      icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-gold-400 stroke-2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
      text: t('metro'),
    },
    {
      icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-gold-400 stroke-2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
      text: t('bus'),
    },
    {
      icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-gold-400 stroke-2"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="16" r="1"/></svg>,
      text: t('parking'),
    },
  ]

  return (
    <section className="py-section bg-cream-50">
      <div className="max-w-container mx-auto px-container-pad">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.h2 variants={fadeInUp} className="font-cormorant text-display-lg text-stone-900 mb-4">
            {t('heading')}
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <p className="font-cormorant text-display-md text-stone-800 mb-1">{t('address')}</p>
            <p className="font-sans text-body-md text-stone-600">{t('neighborhood')}</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative w-full h-[260px] sm:h-[400px] bg-stone-200 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.2!2d-0.3763!3d39.4699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDI4JzExLjYiTiAwwrAyMic1NC43Ilc!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) sepia(20%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lumière Studio location"
              />
            </div>
          </div>

          {/* Access info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-cormorant text-display-md text-stone-900">Cómo llegar</h3>
            {access.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1">{item.icon}</div>
                <p className="font-sans text-sm text-stone-600">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
