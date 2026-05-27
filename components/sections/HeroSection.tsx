'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const lineVariant = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: (i: number) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.1, delay: 0.3 + i * 0.18, ease: [0.76, 0, 0.24, 1] },
  }),
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: 0.9 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function HeroSection() {
  const t  = useTranslations('hero')
  const locale = useLocale()

  const headlines = [t('headline_1'), t('headline_2'), t('headline_3')]

  return (
    <section className="relative h-dvh min-h-[640px] flex items-end overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Lumière Studio interior"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Layered overlays for depth */}
        {/* Bottom vignette — text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
        {/* Left edge fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/40 via-transparent to-transparent" />
        {/* Subtle warm tone */}
        <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
      </div>

      {/* ── Grain texture overlay ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-container mx-auto px-container-pad pb-20 lg:pb-28">
        <div className="max-w-4xl">

          {/* Headline — reveal per line */}
          <div className="overflow-hidden mb-8 space-y-1">
            {headlines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                  className={`font-cormorant leading-none tracking-tight text-white ${
                    i === 2
                      ? 'text-display-xl italic text-cream-200'
                      : 'text-display-xl'
                  }`}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.77, 0, 0.175, 1] }}
            style={{ originX: 0 }}
            className="h-px w-20 bg-gold-300 mb-8"
          />

          {/* Subtitle */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-sans text-body-lg text-white/75 mb-12 max-w-lg leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href={`/${locale}/contacto`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold-300 text-stone-900 font-sans font-medium text-sm tracking-wide hover:bg-gold-400 transition-colors duration-300 cursor-pointer w-full sm:w-auto"
            >
              {t('cta_primary')}
              <span className="group-hover:translate-x-1 transition-transform duration-300 text-base leading-none">→</span>
            </Link>
            <Link
              href={`/${locale}/#servicios`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/40 text-white font-sans font-medium text-sm tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-sm w-full sm:w-auto"
            >
              {t('cta_secondary')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-2 rotate-90"
      >
        <span className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em]">scroll</span>
        <div className="w-12 h-px bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-gold-300"
            animate={{ x: ['0%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>


    </section>
  )
}
