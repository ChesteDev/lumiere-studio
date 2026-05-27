'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const otherLocale = locale === 'es' ? 'en' : 'es'
  const switchLocale = () => {
    const segments = pathname.split('/')
    segments[1] = otherLocale
    router.push(segments.join('/') || `/${otherLocale}`)
  }

  const navLinks = [
    { href: `/${locale}/#servicios`, label: t('services') },
    { href: `/${locale}/nosotras`, label: t('about') },
    { href: `/${locale}/#ritual`, label: t('ritual') },
    { href: `/${locale}/contacto`, label: t('contact') },
  ]

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-container-pad flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-baseline gap-1.5 outline-none focus:outline-none">
            <span className={`font-cormorant text-2xl font-medium tracking-wide transition-colors duration-500 ${scrolled ? 'text-stone-900' : 'text-white'}`}>
              Lumière
            </span>
            <span className={`font-sans text-sm font-light tracking-widest uppercase transition-colors duration-500 ${scrolled ? 'text-stone-600' : 'text-white/70'}`}>
              Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-light tracking-wide transition-colors duration-300 hover:text-gold-300 ${
                  scrolled ? 'text-stone-800' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={switchLocale}
              className={`font-sans text-sm font-light tracking-widest transition-colors duration-300 hover:text-gold-300 ${
                scrolled ? 'text-stone-600' : 'text-white/60'
              }`}
            >
              {locale.toUpperCase()} | {otherLocale.toUpperCase()}
            </button>

            {/* CTA */}
            <Link
              href={`/${locale}/contacto`}
              className={`font-sans text-sm font-medium px-6 py-2.5 border transition-all duration-300 cursor-pointer ${
                scrolled
                  ? 'border-gold-300 text-gold-500 hover:bg-gold-300 hover:text-stone-900'
                  : 'border-white/50 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-px w-6 transition-colors duration-500 ${scrolled ? 'bg-stone-900' : 'bg-white'}`}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone-900/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-cream-50 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-cormorant text-xl text-stone-900">Lumière Studio</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-stone-600 hover:text-stone-900 cursor-pointer text-2xl leading-none"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>

              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-cormorant text-display-md text-stone-900 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/34963000000`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-sans text-stone-700"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <button
                  onClick={() => { switchLocale(); setMobileOpen(false) }}
                  className="font-sans text-sm text-stone-600 cursor-pointer"
                >
                  {locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
