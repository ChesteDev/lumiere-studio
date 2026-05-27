import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Lumière Studio'
  const subtitle = searchParams.get('subtitle') || 'Estética Premium en Valencia'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #1C1810 0%, #3D3730 100%)',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Gold accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#D4A96A' }} />

        {/* Brand */}
        <div style={{ color: '#D4A96A', fontSize: '16px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>
          LUMIÈRE STUDIO · VALENCIA
        </div>

        {/* Title */}
        <div style={{ color: '#FDFAF5', fontSize: '56px', fontWeight: 400, lineHeight: 1.1, marginBottom: '20px', maxWidth: '700px' }}>
          {title}
        </div>

        {/* Subtitle */}
        <div style={{ color: 'rgba(253,250,245,0.65)', fontSize: '22px', fontWeight: 300 }}>
          {subtitle}
        </div>

        {/* Bottom accent */}
        <div style={{ position: 'absolute', bottom: '60px', right: '80px', color: '#D4A96A', fontSize: '14px', letterSpacing: '0.15em' }}>
          lumierestudio.es
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
