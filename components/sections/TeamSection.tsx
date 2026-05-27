'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { wordReveal, staggerSlow, blurFadeIn } from '@/lib/motion'

const team = [
  {
    id: 'elena',
    image: '/images/team/team-01.png',
    role_es: 'Fundadora & Directora Estética',
    role_en: 'Founder & Aesthetic Director',
    name: 'Elena Vidal',
    bio_es: '15 años de experiencia. Formada en París y Londres. Especialista en tratamientos faciales de precisión.',
    bio_en: '15 years of experience. Trained in Paris and London. Specialist in precision facial treatments.',
  },
  {
    id: 'carmen',
    image: '/images/team/team-02.png',
    role_es: 'Terapeuta Corporal Senior',
    role_en: 'Senior Body Therapist',
    name: 'Carmen Torres',
    bio_es: 'Experta en drenaje linfático y masajes terapéuticos. Certificada en técnica Vodder.',
    bio_en: 'Expert in lymphatic drainage and therapeutic massage. Certified in Vodder technique.',
  },
  {
    id: 'lucia',
    image: '/images/team/team-03.png',
    role_es: 'Esteticista & Especialista Facial',
    role_en: 'Aesthetician & Facial Specialist',
    name: 'Lucía Sanz',
    bio_es: 'Especializada en radiofrecuencia y tratamientos antiaging no invasivos.',
    bio_en: 'Specialized in radiofrequency and non-invasive anti-aging treatments.',
  },
  {
    id: 'maria',
    image: '/images/team/team-04.png',
    role_es: 'Terapeuta de Bienestar',
    role_en: 'Wellness Therapist',
    name: 'María Gómez',
    bio_es: 'Formada en aromaterapia e integración de técnicas orientales y occidentales.',
    bio_en: 'Trained in aromatherapy and integration of Eastern and Western techniques.',
  },
]

export default function TeamSection() {
  const t = useTranslations('team')
  const locale = useLocale()
  const headingWords = t('heading').split(' ')

  return (
    <section className="bg-stone-900 py-section overflow-hidden">
      <div className="max-w-container mx-auto px-container-pad">

        {/* Header */}
        <div className="mb-16">
          <motion.span
            variants={blurFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-sans text-label text-gold-300 uppercase tracking-widest block mb-4"
          >
            {t('label')}
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerSlow}
            className="font-cormorant text-display-lg text-cream-50"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                <motion.span custom={i} variants={wordReveal} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              {/* Photo with clip-path reveal */}
              <div className="relative aspect-[3/4] mb-6 overflow-hidden">
                <motion.div
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                  transition={{ duration: 1.0, delay: i * 0.14, ease: [0.76, 0, 0.24, 1] }}
                  viewport={{ once: true }}
                  className="absolute inset-0"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>

                {/* Gold line on hover */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-300"
                />
              </div>

              {/* Info — staggered */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h3 className="font-cormorant text-display-md text-cream-50">{member.name}</h3>
                <p className="font-sans text-label text-gold-300 uppercase tracking-widest">
                  {locale === 'en' ? member.role_en : member.role_es}
                </p>
                <p className="font-sans text-sm text-cream-100/60 leading-relaxed">
                  {locale === 'en' ? member.bio_en : member.bio_es}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
