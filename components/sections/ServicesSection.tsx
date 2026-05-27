'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import ServiceCard from '@/components/ui/ServiceCard'
import { blurFadeIn, wordReveal, staggerSlow, staggerContainer } from '@/lib/motion'
import servicesData from '@/lib/data/services.json'

export default function ServicesSection() {
  const t = useTranslations('services')
  const locale = useLocale()
  const { services } = servicesData

  const headingWords = t('heading').split(' ')

  return (
    <section id="servicios" className="bg-cream-50 py-section">
      <div className="max-w-container mx-auto px-container-pad">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            variants={blurFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="section-label block mb-4"
          >
            {t('label')}
          </motion.span>

          {/* Word-by-word heading */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerSlow}
            className="font-cormorant text-display-lg text-stone-900 mb-6"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                <motion.span custom={i} variants={wordReveal} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            viewport={{ once: true }}
            className="h-px w-12 bg-gold-300 mb-6"
          />

          <motion.p
            variants={blurFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-sans text-body-lg text-stone-600"
          >
            {t('intro')}
          </motion.p>
        </div>

        {/* Services grid — each card blurs+floats in with stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-stone-200"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              className={`border-b border-r border-stone-200 ${
                i === 0 && service.featured ? 'md:col-span-2' : ''
              }`}
            >
              <ServiceCard
                service={service}
                locale={locale}
                featured={i === 0 && service.featured}
                bookLabel={t('book')}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
