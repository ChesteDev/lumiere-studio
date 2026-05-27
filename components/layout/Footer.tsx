import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const tc = useTranslations('contact')
  const locale = useLocale()

  const services = [
    { label: 'Facial Premium', href: `/${locale}/#servicios` },
    { label: 'Masaje Ritual', href: `/${locale}/#servicios` },
    { label: 'Lifting Facial', href: `/${locale}/#servicios` },
    { label: 'Ritual para Dos', href: `/${locale}/#servicios` },
    { label: 'Drenaje Linfático', href: `/${locale}/#servicios` },
  ]

  return (
    <footer className="bg-stone-900 text-cream-100 pt-16 pb-8">
      <div className="max-w-container mx-auto px-container-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-stone-800">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <div>
              <div className="font-cormorant text-2xl font-medium text-cream-50">Lumière Studio</div>
              <p className="font-sans text-sm text-cream-200/60 mt-3 leading-relaxed">{t('tagline')}</p>
            </div>
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="https://instagram.com/lumierestudio.es" target="_blank" rel="noopener noreferrer" aria-label={t('social_instagram')}
                className="w-9 h-9 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-gold-300 hover:border-gold-300 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Pinterest */}
              <a href="#" aria-label={t('social_pinterest')}
                className="w-9 h-9 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-gold-300 hover:border-gold-300 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label={t('social_tiktok')}
                className="w-9 h-9 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-gold-300 hover:border-gold-300 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.28 8.28 0 004.83 1.54V7a4.85 4.85 0 01-1.06-.31z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-sans text-label text-gold-300 uppercase tracking-widest mb-6">{t('services_title')}</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="font-sans text-sm text-stone-400 hover:text-cream-100 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Info */}
          <div>
            <h3 className="font-sans text-label text-gold-300 uppercase tracking-widest mb-6">{t('info_title')}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/nosotras`} className="font-sans text-sm text-stone-400 hover:text-cream-100 transition-colors">{t('about')}</Link></li>
              <li><Link href={`/${locale}/contacto`} className="font-sans text-sm text-stone-400 hover:text-cream-100 transition-colors">Contacto</Link></li>
              <li><Link href="#" className="font-sans text-sm text-stone-400 hover:text-cream-100 transition-colors">{t('privacy')}</Link></li>
              <li><Link href="#" className="font-sans text-sm text-stone-400 hover:text-cream-100 transition-colors">{t('legal')}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-sans text-label text-gold-300 uppercase tracking-widest mb-6">{t('contact_title')}</h3>
            <ul className="space-y-3 text-sm font-sans text-stone-400">
              <li>{tc('address')}</li>
              <li>{tc('phone')}</li>
              <li>{tc('email')}</li>
              <li>{tc('hours')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500 text-xs font-sans">
          <span>{t('copyright')}</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-cream-100 transition-colors">{t('privacy')}</Link>
            <Link href="#" className="hover:text-cream-100 transition-colors">{t('legal')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
