'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { blurFadeIn, wordReveal, staggerSlow } from '@/lib/motion'

const details: Array<{ icon: React.ReactNode; key: 'detail1' | 'detail2' | 'detail3' }> = [
  {
    key: 'detail1',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-gold-300 stroke-[1.5] flex-shrink-0">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    key: 'detail2',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-gold-300 stroke-[1.5] flex-shrink-0">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    key: 'detail3',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-gold-300 stroke-[1.5] flex-shrink-0">
        <path d="M8 2h8l1 6H7L8 2z"/><path d="M3 8h18l-2 12H5L3 8z"/>
      </svg>
    ),
  },
]

export default function SignatureSection() {
  const t = useTranslations('signature')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)

  /* Parallax: bg moves slower than scroll */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const headingWords = t('heading').split(' ')

  return (
    <section ref={sectionRef} id="ritual" className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ overflowX: 'hidden' }}>

      {/* Full bleed background with parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: bgY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src="/images/signature/signature.png"
            alt="Grand Lumière Ritual"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-stone-900/82" />
        <div className="absolute inset-0 bg-gradient-radial from-gold-600/8 via-transparent to-transparent" />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-container-pad py-section">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label with flanking lines */}
          <motion.div
            variants={blurFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-px w-8 bg-gold-300/60 origin-right"
            />
            <span className="font-sans text-label text-gold-300 uppercase tracking-[0.2em]">
              {t('label')}
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-px w-8 bg-gold-300/60 origin-left"
            />
          </motion.div>

          {/* Heading — word by word */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerSlow}
            className="font-cormorant text-display-xl text-cream-50 mb-8 leading-[1.05]"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                <motion.span custom={i} variants={wordReveal} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={blurFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-sans text-body-lg text-cream-100/65 mb-12 leading-relaxed"
          >
            {t('body')}
          </motion.p>

          {/* Details row — staggered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            {details.map((d, i) => (
              <motion.div
                key={d.key}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
                }}
                className="flex items-center gap-2.5"
              >
                {i > 0 && <span className="hidden sm:block w-px h-4 bg-gold-300/30 mx-2" />}
                {d.icon}
                <span className="font-sans text-sm text-cream-100/70">{t(d.key)}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="font-cormorant text-display-md text-gold-300 italic">{t('price')}</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${locale}/contacto`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gold-300 text-stone-900 font-sans font-medium text-sm tracking-wide hover:bg-gold-400 transition-colors duration-300 cursor-pointer"
            >
              {t('cta')}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
