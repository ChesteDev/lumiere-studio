export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Lumière Studio',
    description: 'Salón de estética facial y corporal premium en Valencia',
    url: 'https://lumierestudio.es',
    telephone: '+34963000000',
    email: 'hola@lumierestudio.es',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Colón 48',
      addressLocality: 'Valencia',
      postalCode: '46004',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.4699,
      longitude: -0.3763,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '€€€',
    image: 'https://lumierestudio.es/og-image.jpg',
    sameAs: ['https://instagram.com/lumierestudio.es'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
