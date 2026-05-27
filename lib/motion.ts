import { Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   EASINGS
───────────────────────────────────────────── */
export const ease = {
  smooth:  [0.25, 0.46, 0.45, 0.94] as const,
  snappy:  [0.76, 0,    0.24, 1]    as const,
  spring:  { type: 'spring', stiffness: 80, damping: 18 } as const,
  springFast: { type: 'spring', stiffness: 120, damping: 20 } as const,
  expo:    [0.16, 1, 0.3, 1]        as const,
}

/* ─────────────────────────────────────────────
   FADE VARIANTS
───────────────────────────────────────────── */
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.smooth } },
}

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.smooth } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: ease.smooth } },
}

/* Blur + fade — great for images & big headings */
export const blurFadeIn: Variants = {
  hidden:  { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: { opacity: 1, filter: 'blur(0px)',  y: 0,
    transition: { duration: 0.9, ease: ease.expo } },
}

/* Float up with a subtle spring bounce */
export const floatUp: Variants = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0,
    transition: { ...ease.spring, duration: 0.9 } },
}

/* ─────────────────────────────────────────────
   CLIP-PATH REVEALS
───────────────────────────────────────────── */
/* Image wipe — bottom to top */
export const imageReveal: Variants = {
  hidden:  { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1.1, ease: ease.snappy } },
}

/* Curtain reveal — right to left */
export const curtainReveal: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.0, ease: ease.snappy } },
}

/* Scale pop — cards, numbers */
export const popIn: Variants = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1,
    transition: { ...ease.springFast } },
}

/* Skew slide — editorial feel */
export const skewIn: Variants = {
  hidden:  { opacity: 0, y: 50, skewY: 3 },
  visible: { opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.85, ease: ease.expo } },
}

/* ─────────────────────────────────────────────
   LINE ANIMATIONS
───────────────────────────────────────────── */
export const revealLine: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: ease.snappy } },
}

export const revealLineY: Variants = {
  hidden:  { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.8, ease: ease.snappy } },
}

/* ─────────────────────────────────────────────
   SLIDE VARIANTS
───────────────────────────────────────────── */
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.expo } },
}

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.expo } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: ease.smooth } },
}

/* ─────────────────────────────────────────────
   CONTAINERS / STAGGER
───────────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

/* ─────────────────────────────────────────────
   WORD / CHAR SPLIT HELPER
   Usage: words.map((w, i) => <motion.span custom={i} variants={wordReveal}>)
───────────────────────────────────────────── */
export const wordReveal: Variants = {
  hidden:  { opacity: 0, y: '105%', rotate: 2 },
  visible: (i: number) => ({
    opacity: 1, y: '0%', rotate: 0,
    transition: { duration: 0.75, delay: i * 0.06, ease: ease.expo },
  }),
}

export const charReveal: Variants = {
  hidden:  { opacity: 0, y: '120%' },
  visible: (i: number) => ({
    opacity: 1, y: '0%',
    transition: { duration: 0.5, delay: i * 0.03, ease: ease.snappy },
  }),
}
