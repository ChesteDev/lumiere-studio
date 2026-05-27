import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { cormorant, dmSans } from '@/app/fonts'
import '@/app/globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/ui/JsonLd'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  metadataBase: new URL('https://lumierestudio.es'),
  title: {
    template: '%s | Lumière Studio Valencia',
    default: 'Lumière Studio — Estética Premium en Valencia',
  },
  description:
    'Salón de estética facial y corporal premium en Valencia. Tratamientos avanzados, rituales exclusivos y una experiencia de bienestar incomparable en el Ensanche valenciano.',
  keywords: [
    'estética Valencia',
    'salón belleza Valencia premium',
    'facial Valencia',
    'masaje Valencia',
    'bienestar Valencia',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_GB',
    siteName: 'Lumière Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as (typeof locales)[number])) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#FDFAF5',
              color: '#1C1810',
              border: '1px solid #EDE0CC',
              fontFamily: 'var(--font-dm-sans)',
            },
          }}
        />
      </body>
    </html>
  )
}
