'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import ParallaxImage from '@/components/ui/ParallaxImage'
import { fadeInUp, revealLine, slideInLeft, imageReveal, wordReveal, staggerSlow, blurFadeIn } from '@/lib/motion'

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

function AnimatedStat({
  rawValue, label, index,
}: { rawValue: string; label: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeric = parseInt(rawValue.replace(/\D/g, ''), 10) || 0
  const suffix  = rawValue.replace(/[\d]/g, '')
  const count   = useCounter(numeric, 1.4 + index * 0.2, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`pr-2 sm:pr-6 ${index > 0 ? 'pl-2 sm:pl-6 border-l border-stone-200' : ''}`}
    >
      <div className="font-cormorant text-3xl sm:text-display-md text-gold-500 font-medium leading-none mb-1 sm:mb-2">
        {inView ? `${count}${suffix}` : '0'}
      </div>
      <div className="font-sans text-[9px] sm:text-label text-stone-500 uppercase tracking-wider sm:tracking-widest leading-tight">
        {label}
      </div>
    </motion.div>
  )
}

export default function PhilosophySection() {
  const t = useTranslations('philosophy')

  const stats = [
    { value: t('stat1_value'), label: t('stat1_label') },
    { value: t('stat2_value'), label: t('stat2_label') },
    { value: t('stat3_value'), label: t('stat3_label') },
  ]

  const headingWords = t('heading').split(' ')

  return (
    <section className="bg-cream-100 py-section overflow-hidden">
      <div className="max-w-container mx-auto px-container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* ── Left: Image ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              {/* Offset border — animates in with delay */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className="absolute -bottom-5 -right-5 w-full h-full border border-gold-300/50 z-0 hidden sm:block"
              />
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-gold-300/30 z-20" />

              {/* Clip-path wipe reveal on the image wrapper */}
              <motion.div
                variants={imageReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="relative w-full h-full z-10 overflow-hidden"
              >
                <ParallaxImage
                  src="/images/philosophy/filosofia.png"
                  alt="Lumière Studio philosophy"
                  containerClassName="relative w-full h-full"
                  intensity={0.12}
                />
              </motion.div>

              {/* Floating quote tag */}
              <motion.div
                initial={{ opacity: 0, x: 24, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className="absolute -right-6 bottom-12 bg-cream-50 border border-stone-200 px-5 py-4 shadow-sm z-20 hidden lg:block"
              >
                <p className="font-cormorant italic text-stone-600 text-sm leading-snug max-w-[120px]">
                  &ldquo;La belleza<br/>es un estado<br/>del alma.&rdquo;
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <div className="space-y-10 order-1 lg:order-2">

            {/* Label */}
            <motion.span
              variants={blurFadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="section-label block"
            >
              {t('label')}
            </motion.span>

            {/* Heading — word by word */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerSlow}
              className="font-cormorant text-display-lg text-stone-900 leading-[1.1] overflow-hidden"
            >
              {headingWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                  <motion.span
                    custom={i}
                    variants={wordReveal}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* Gold rule */}
            <motion.div
              variants={revealLine}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-px w-16 bg-gold-300"
            />

            {/* Body text */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-sans text-body-lg text-stone-600 leading-relaxed"
            >
              {t('body')}
            </motion.p>

            {/* Animated stats */}
            <div className="grid grid-cols-3 gap-0 border-t border-stone-200 pt-10">
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
      </div>
    </section>
  )
}
