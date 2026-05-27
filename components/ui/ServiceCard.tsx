'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

interface Service {
  id: string
  name: { es: string; en: string }
  tagline: { es: string; en: string }
  description: { es: string; en: string }
  duration: string
  price: string
  priceEn: string
  category: string
  featured: boolean
  image: string
}

interface Props {
  service: Service
  locale: string
  featured?: boolean
  bookLabel: string
}

const categoryColors: Record<string, string> = {
  facial:      'text-gold-500 bg-gold-300/10',
  corporal:    'text-stone-600 bg-stone-200/50',
  experiencias:'text-gold-500 bg-gold-300/10',
}

export default function ServiceCard({ service, locale, featured = false, bookLabel }: Props) {
  const name = service.name[locale as 'es' | 'en'] || service.name.es
  const tagline = service.tagline[locale as 'es' | 'en'] || service.tagline.es
  const price = locale === 'en' ? service.priceEn : service.price
  const catClass = categoryColors[service.category] || categoryColors.facial

  return (
    <motion.article
      variants={fadeInUp}
      className={`group bg-cream-50 hover:bg-cream-100 transition-colors duration-300 border-b border-stone-200 cursor-pointer ${
        featured ? 'md:col-span-2 md:flex' : ''
      }`}
    >
      {/* Image */}
      <div
        className={`overflow-hidden ${featured ? 'md:w-1/2' : ''}`}
        data-cursor-label="VER"
      >
        <div className={`relative ${featured ? 'h-72 md:h-full' : 'aspect-[4/3]'} overflow-hidden`}>
          <Image
            src={service.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>
      </div>

      {/* Content */}
      <div className={`p-8 flex flex-col justify-between ${featured ? 'md:w-1/2' : ''}`}>
        <div>
          <span className={`inline-block text-label font-sans uppercase tracking-widest px-2 py-1 mb-4 ${catClass}`}>
            {service.category}
          </span>
          <h3 className="font-cormorant text-display-md text-stone-900 mb-2">{name}</h3>
          <p className="font-sans text-body-md italic text-stone-600 mb-4">{tagline}</p>
          <p className="font-sans text-sm text-stone-600 leading-relaxed line-clamp-3">
            {service.description[locale as 'es' | 'en'] || service.description.es}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-200">
          <span className="font-sans text-sm text-stone-600">
            {service.duration} · <span className="font-medium text-stone-900">{price}</span>
          </span>
          <span className="font-sans text-sm text-gold-400 group-hover:text-gold-500 transition-colors flex items-center gap-1">
            {bookLabel} <span className="text-lg leading-none">→</span>
          </span>
        </div>
      </div>
    </motion.article>
  )
}
