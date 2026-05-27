'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'

const content = {
  es: {
    lines: [
      'No vendemos tratamientos.',
      'Creamos momentos que',
      'no quieres que terminen.',
    ],
    sinceLabel: 'Desde',
    location: 'Valencia',
  },
  en: {
    lines: [
      "We don’t sell treatments.",
      'We create moments you',
      "don’t want to end.",
    ],
    sinceLabel: 'Since',
    location: 'Valencia',
  },
}

export default function ManifestoSection() {
  const locale = useLocale() as 'es' | 'en'
  const { lines, sinceLabel, location } = content[locale] || content.es

  return (
    <section className="bg-stone-900 py-section-sm relative overflow-hidden">
      {/* Subtle warm center glow */}
      <div className="absolute inset-0 bg-gradient-radial from-gold-600/6 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-container mx-auto px-container-pad">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-8">

          {/* Left: manifesto lines */}
          <div className="space-y-2">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, amount: 0.3 }}
                className={`font-cormorant leading-tight text-cream-50 ${
                  i === 2 ? 'italic text-gold-300' : ''
                }`}
                style={{ fontSize: 'clamp(1.7rem, 3.8vw, 3rem)' }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Right: year ornament */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center gap-5 flex-shrink-0"
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-px h-10 bg-gold-300/35" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-300/50" />
              <div className="w-px h-10 bg-gold-300/35" />
            </div>
            <div>
              <p className="font-sans text-label text-stone-500 uppercase tracking-[0.2em]">{sinceLabel}</p>
              <p className="font-cormorant text-display-md text-cream-50 leading-none mt-1">2024</p>
              <p className="font-sans text-label text-gold-400 uppercase tracking-widest mt-1.5">{location}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
