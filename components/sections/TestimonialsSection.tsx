'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Sofía M.',
    location: 'Valencia',
    rating: 5,
    text_es: 'Una experiencia completamente diferente a todo lo que había probado. El ambiente, el trato, los resultados… volvería cada semana si pudiera.',
    text_en: "A completely different experience from anything I'd tried before. The atmosphere, the care, the results… I'd come back every week if I could.",
    service: 'Ritual para Dos',
  },
  {
    name: 'Ana L.',
    location: 'Madrid',
    rating: 5,
    text_es: 'Cuando visito Valencia, este es mi ritual obligatorio. El facial premium dejó mi piel increíble durante semanas.',
    text_en: 'When I visit Valencia, this is my mandatory ritual. The premium facial left my skin incredible for weeks.',
    service: 'Facial Premium',
  },
  {
    name: 'Carmen R.',
    location: 'Valencia',
    rating: 5,
    text_es: 'El masaje ritual es lo más cerca que he estado del paraíso. Salí completamente renovada. El equipo tiene un don especial.',
    text_en: "The ritual massage is the closest I've been to paradise. I left completely renewed. The team has a special gift.",
    service: 'Masaje Ritual Lumière',
  },
  {
    name: 'Isabel T.',
    location: 'Alicante',
    rating: 5,
    text_es: 'Merecía mucho la pena el viaje desde Alicante. El lifting facial no invasivo superó todas mis expectativas. Resultados reales y duraderos.',
    text_en: 'The trip from Alicante was very worth it. The non-invasive facial lifting exceeded all my expectations.',
    service: 'Lifting Facial',
  },
]

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const [current, setCurrent] = useState(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    autoplayRef.current = setInterval(next, 6000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pause  = () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  const resume = () => { autoplayRef.current = setInterval(next, 6000) }

  const active = testimonials[current]
  const text = locale === 'en' ? active.text_en : active.text_es

  return (
    <section
      className="bg-cream-50 py-section overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="max-w-container mx-auto px-container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left: label + nav */}
          <div className="space-y-10">
            <div>
              <span className="section-label block mb-4">Testimonios</span>
              <h2 className="font-cormorant text-display-lg text-stone-900 leading-[1.1]">
                {t('heading')}
              </h2>
            </div>

            {/* Navigation */}
            <div className="space-y-6">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`transition-all duration-400 cursor-pointer rounded-full ${
                      i === current
                        ? 'w-8 h-[3px] bg-gold-400'
                        : 'w-[3px] h-[3px] bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="w-12 h-12 border border-stone-300 flex items-center justify-center text-stone-500 hover:border-gold-300 hover:text-gold-500 transition-colors cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="w-12 h-12 border border-stone-300 flex items-center justify-center text-stone-500 hover:border-gold-300 hover:text-gold-500 transition-colors cursor-pointer"
                >
                  →
                </button>
              </div>

              {/* Counter */}
              <p className="font-sans text-label text-stone-400">
                {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Right: testimonial card */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Giant quote mark */}
                <span className="absolute -top-8 -left-4 font-cormorant text-[9rem] leading-none text-gold-300/20 select-none pointer-events-none">
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-gold-300">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote text — large and cinematic */}
                <blockquote className="font-cormorant italic text-stone-800 leading-relaxed mb-10"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.45 }}
                >
                  &ldquo;{text}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-gold-300" />
                  <div>
                    <cite className="font-sans text-label text-stone-900 uppercase tracking-widest not-italic">
                      {active.name}
                    </cite>
                    <p className="font-sans text-xs text-stone-400 mt-0.5">{active.location}</p>
                  </div>
                  <span className="ml-auto font-sans text-xs bg-gold-300/15 text-gold-500 px-3 py-1.5 border border-gold-300/20">
                    {active.service}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
