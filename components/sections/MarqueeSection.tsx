'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'

const itemsEs = [
  'Facial Premium', 'Masaje Ritual', 'Lifting No Invasivo',
  'Drenaje Linfático', 'Ritual para Dos', 'Hidratación Corporal',
]
const itemsEn = [
  'Premium Facial', 'Ritual Massage', 'Non-Invasive Lifting',
  'Lymphatic Drainage', 'Ritual for Two', 'Body Hydration',
]

const Dot = () => (
  <span className="inline-block w-1 h-1 rounded-full bg-gold-300 mx-4 flex-shrink-0 translate-y-[-1px]" />
)

export default function MarqueeSection() {
  const locale = useLocale()
  const items = locale === 'en' ? itemsEn : itemsEs
  // Triple the items to ensure seamless loop
  const repeated = [...items, ...items, ...items]

  return (
    <div className="bg-cream-200 border-y border-stone-200 py-4 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex items-center whitespace-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-cormorant italic text-stone-600 text-lg tracking-wide px-1">
              {item}
            </span>
            <Dot />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
