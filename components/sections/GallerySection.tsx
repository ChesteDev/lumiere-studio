'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { blurFadeIn, wordReveal, staggerSlow, revealLine } from '@/lib/motion'

type GalleryAltKey = 'alt1' | 'alt2' | 'alt3' | 'alt4' | 'alt5' | 'alt6'

const galleryItems: { src: string; alt_key: GalleryAltKey; class: string }[] = [
  { src: '/images/gallery/gal-01.png', alt_key: 'alt1', class: 'md:row-span-2' },
  { src: '/images/gallery/gal-02.png', alt_key: 'alt2', class: '' },
  { src: '/images/gallery/gal-03.png', alt_key: 'alt3', class: 'md:row-span-2' },
  { src: '/images/gallery/gal-04.png', alt_key: 'alt4', class: 'md:col-span-2' },
  { src: '/images/gallery/gal-05.png', alt_key: 'alt5', class: '' },
  { src: '/images/gallery/gal-06.png', alt_key: 'alt6', class: '' },
]

/* Entry direction offsets for variety — avoids clip-path IO interference */
const entryOffsets = [
  { y: 40, x: 0 },
  { y: 0,  x: 40 },
  { y: 40, x: 0 },
  { y: 0,  x: -40 },
  { y: 40, x: 0 },
  { y: 0,  x: 40 },
]

export default function GallerySection() {
  const t = useTranslations('gallery')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const headingWords = t('heading').split(' ')

  return (
    <section className="bg-cream-100 py-section">
      <div className="max-w-container mx-auto px-container-pad">

        {/* Header */}
        <div className="mb-12">
          <motion.span
            variants={blurFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-label block mb-4"
          >
            {t('label')}
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerSlow}
            className="font-cormorant text-display-lg text-stone-900"
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
            transition={{ duration: 0.8, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
            viewport={{ once: true }}
            className="h-px w-12 bg-gold-300 mt-6"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {galleryItems.map((item, i) => {
            const src = item.src
            const alt = t(item.alt_key)
            return (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: entryOffsets[i].y, x: entryOffsets[i].x }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                onClick={() => setLightbox(src)}
                data-cursor-label="VER"
                className={`group relative overflow-hidden cursor-pointer ${item.class}`}
              >
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 bg-stone-900/45 flex items-end p-4 pointer-events-none"
                >
                  <motion.span
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="font-cormorant italic text-cream-50 text-body-lg"
                  >
                    {alt}
                  </motion.span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-stone-900/92 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3]">
                <Image src={lightbox} alt="Gallery" fill className="object-contain" sizes="100vw" />
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-cream-50 hover:text-gold-300 cursor-pointer font-cormorant text-2xl transition-colors"
                aria-label="Close"
              >
                × Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
