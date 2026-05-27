'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 1.6, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(id) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [inView, target, duration])
  return count
}

function AnimatedStat({ rawValue, label, index }: { rawValue: string; label: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const numeric = parseInt(rawValue.replace(/\D/g, ''), 10) || 0
  const suffix  = rawValue.replace(/[\d]/g, '')
  const count   = useCounter(numeric, 1.4 + index * 0.2, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col"
    >
      <span className="font-cormorant text-4xl lg:text-5xl text-stone-900 font-light leading-none">
        {inView ? `${count}${suffix}` : '0'}
      </span>
      <span className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mt-2 leading-tight">
        {label}
      </span>
    </motion.div>
  )
}

export default function PhilosophySection() {
  const t = useTranslations('philosophy')
  const contentRef = useRef<HTMLDivElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-80px' })

  const stats = [
    { value: t('stat1_value'), label: t('stat1_label') },
    { value: t('stat2_value'), label: t('stat2_label') },
    { value: t('stat3_value'), label: t('stat3_label') },
  ]

  return (
    <section className="bg-cream-50 overflow-hidden">

      {/* ── Full-bleed two-panel layout ── */}
      <div className="flex flex-col lg:flex-row min-h-[88vh]">

        {/* Image panel wrapper — self-stretches; inner motion.div is absolute so Image fill has dimensions */}
        <div className="relative w-full lg:w-[44%] min-h-[55vw] lg:min-h-0 flex-shrink-0 order-2 lg:order-1 self-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="absolute inset-0"
          >
            <Image
              src="/images/philosophy/filosofia.png"
              alt="Lumière Studio philosophy"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            {/* Right-side fade into cream */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream-50/15" />
          </motion.div>
        </div>

        {/* Thin vertical divider — desktop only */}
        <div className="hidden lg:flex flex-col items-center justify-center w-px mx-0 relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            style={{ originY: 0 }}
            className="w-px h-full bg-stone-200 absolute inset-0"
          />
          <div className="relative z-10 bg-cream-50 py-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          </div>
        </div>

        {/* Content panel */}
        <div
          ref={contentRef}
          className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-24 order-1 lg:order-2"
        >
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-sans text-[11px] text-gold-500 uppercase tracking-[0.22em] mb-10 block"
          >
            {t('label')}
          </motion.span>

          {/* Heading — two-part typographic treatment */}
          <div className="mb-8 space-y-1">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant text-[clamp(2.4rem,4.5vw,4.2rem)] text-stone-900 leading-[1.06] font-light"
            >
              El arte de cuidar<br className="hidden sm:block" /> se aprende.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant italic text-[clamp(2.4rem,4.5vw,4.2rem)] text-gold-600/80 leading-[1.06] font-light"
            >
              La pasión por transformar,<br className="hidden sm:block" /> se lleva dentro.
            </motion.p>
          </div>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={contentInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.77, 0, 0.175, 1] }}
            style={{ originX: 0 }}
            className="h-px w-14 bg-gold-300 mb-8"
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-sans text-body-lg text-stone-500 leading-relaxed max-w-[42ch] mb-14"
          >
            {t('body')}
          </motion.p>

          {/* Stats — editorial horizontal bar */}
          <div className="flex items-start gap-10 sm:gap-14 border-t border-stone-200/80 pt-10">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                rawValue={stat.value}
                label={stat.label}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
