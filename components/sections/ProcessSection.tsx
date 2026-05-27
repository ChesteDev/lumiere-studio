'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { wordReveal, staggerSlow } from '@/lib/motion'

export default function ProcessSection() {
  const t = useTranslations('process')

  const steps = [
    { num: '01', title: t('step1_title'), desc: t('step1_desc') },
    { num: '02', title: t('step2_title'), desc: t('step2_desc') },
    { num: '03', title: t('step3_title'), desc: t('step3_desc') },
    { num: '04', title: t('step4_title'), desc: t('step4_desc') },
  ]

  const headingWords = t('heading').split(' ')

  return (
    <section className="bg-cream-100 py-section overflow-hidden">
      <div className="max-w-container mx-auto px-container-pad">

        {/* Heading — word reveal */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerSlow}
          className="font-cormorant text-display-lg text-stone-900 mb-20 max-w-md"
        >
          {headingWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span custom={i} variants={wordReveal} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">

          {/* Animated connector line (desktop) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-0 right-0 h-px bg-stone-200" style={{ zIndex: 0 }} />
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-[2.5rem] left-0 right-0 h-px bg-gold-300/60"
            style={{ zIndex: 1 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: '-40px' }}
              className="relative pl-0 lg:pr-10 pb-12 lg:pb-0 group"
            >
              {/* Big number — pops in */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring', stiffness: 100, damping: 14,
                  delay: 0.1 + i * 0.15,
                }}
                viewport={{ once: true }}
                className="relative z-10 bg-cream-100 pr-4 inline-block mb-6"
              >
                <span className="font-cormorant text-[5rem] leading-none font-light text-stone-200 select-none group-hover:text-gold-300/40 transition-colors duration-500">
                  {step.num}
                </span>
              </motion.div>

              {/* Vertical connector (mobile) */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  viewport={{ once: true }}
                  className="lg:hidden absolute left-8 top-24 bottom-0 w-px bg-gold-300/40"
                />
              )}

              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.15 }}
                viewport={{ once: true }}
                className="font-cormorant text-display-md text-stone-900 mb-3"
              >
                {step.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                viewport={{ once: true }}
                className="font-sans text-body-md text-stone-600"
              >
                {step.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
