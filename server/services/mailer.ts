import nodemailer from 'nodemailer'
import type { ContactInput } from '../schemas/contact.schema'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const serviceLabels: Record<string, { es: string; en: string }> = {
  'facial-premium':       { es: 'Facial Premium', en: 'Premium Facial' },
  'masaje-ritual':        { es: 'Masaje Ritual Lumière', en: 'Lumière Ritual Massage' },
  'hidratacion-corporal': { es: 'Hidratación Corporal Intensiva', en: 'Intensive Body Hydration' },
  'lifting-facial':       { es: 'Lifting Facial No Invasivo', en: 'Non-Invasive Facial Lifting' },
  'drenaje-linfatico':    { es: 'Drenaje Linfático Manual', en: 'Manual Lymphatic Drainage' },
  'ritual-pareja':        { es: 'Ritual para Dos', en: 'Ritual for Two' },
  'otro':                 { es: 'Otro', en: 'Other' },
}

function getServiceLabel(id: string, lang: string): string {
  return serviceLabels[id]?.[lang as 'es' | 'en'] || id
}

function salonEmailHtml(data: ContactInput): string {
  const service = getServiceLabel(data.service, data.lang)
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FDFAF5; padding: 40px;">
      <h1 style="font-size: 28px; color: #1C1810; margin-bottom: 8px;">Lumière Studio</h1>
      <p style="color: #A87A3E; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px;">Nueva solicitud de cita</p>
      <hr style="border: none; border-top: 1px solid #EDE0CC; margin-bottom: 32px;" />
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #7A7065; font-size: 13px;">Nombre</td><td style="padding: 8px 0; color: #1C1810;">${data.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A7065; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #1C1810;">${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding: 8px 0; color: #7A7065; font-size: 13px;">Teléfono</td><td style="padding: 8px 0; color: #1C1810;">${data.phone}</td></tr>` : ''}
        <tr><td style="padding: 8px 0; color: #7A7065; font-size: 13px;">Servicio</td><td style="padding: 8px 0; color: #1C1810;">${service}</td></tr>
        <tr><td style="padding: 8px 0; color: #7A7065; font-size: 13px;">Idioma</td><td style="padding: 8px 0; color: #1C1810;">${data.lang.toUpperCase()}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #EDE0CC; margin: 24px 0;" />
      <p style="color: #7A7065; font-size: 13px; margin-bottom: 8px;">Mensaje</p>
      <p style="color: #1C1810; line-height: 1.7;">${data.message.replace(/\n/g, '<br>')}</p>
      <hr style="border: none; border-top: 1px solid #EDE0CC; margin-top: 32px;" />
      <p style="color: #B8AFA0; font-size: 11px; margin-top: 16px; text-align: center;">Lumière Studio · Calle Colón 48, Valencia · hola@lumierestudio.es</p>
    </div>
  `
}

function clientEmailHtml(data: ContactInput): string {
  const isEs = data.lang === 'es'
  const service = getServiceLabel(data.service, data.lang)
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FDFAF5; padding: 40px;">
      <h1 style="font-size: 28px; color: #1C1810; margin-bottom: 4px;">Lumière Studio</h1>
      <p style="color: #A87A3E; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px;">
        ${isEs ? 'Confirmación de solicitud' : 'Request confirmation'}
      </p>
      <hr style="border: none; border-top: 1px solid #EDE0CC; margin-bottom: 32px;" />
      <p style="color: #1C1810; font-size: 18px; margin-bottom: 16px;">
        ${isEs ? `Hola, ${data.name.split(' ')[0]}` : `Hello, ${data.name.split(' ')[0]}`}
      </p>
      <p style="color: #3D3730; line-height: 1.75; margin-bottom: 16px;">
        ${isEs
          ? 'Hemos recibido tu solicitud para <strong>' + service + '</strong>. Nos pondremos en contacto contigo en menos de 2 horas para confirmar tu cita.'
          : 'We have received your request for <strong>' + service + '</strong>. We will get back to you within 2 hours to confirm your appointment.'
        }
      </p>
      <div style="background: #F7F0E4; border-left: 3px solid #D4A96A; padding: 16px 20px; margin: 24px 0;">
        <p style="color: #1C1810; margin: 0; font-size: 14px;">
          ${isEs
            ? '📍 Calle Colón 48, Valencia · ☎ +34 963 000 000 · ⏰ Lun–Vie 9:00–20:00 · Sáb 9:00–18:00'
            : '📍 Calle Colón 48, Valencia · ☎ +34 963 000 000 · ⏰ Mon–Fri 9:00–20:00 · Sat 9:00–18:00'
          }
        </p>
      </div>
      <p style="color: #7A7065; font-size: 14px; margin-top: 24px;">
        ${isEs ? 'Con cariño,' : 'Warmly,'}
      </p>
      <p style="color: #1C1810; font-size: 16px;">El equipo de Lumière Studio</p>
      <hr style="border: none; border-top: 1px solid #EDE0CC; margin-top: 32px;" />
      <p style="color: #B8AFA0; font-size: 11px; text-align: center; margin-top: 16px;">
        © 2024 Lumière Studio · ${isEs ? 'Valencia, España' : 'Valencia, Spain'}
      </p>
    </div>
  `
}

export async function sendContactEmails(data: ContactInput) {
  const emailTo = process.env.EMAIL_TO || 'hola@lumierestudio.es'
  const emailFrom = process.env.EMAIL_FROM || '"Lumière Studio" <hola@lumierestudio.es>'

  await Promise.all([
    transporter.sendMail({
      from:    emailFrom,
      to:      emailTo,
      subject: `Nueva solicitud de cita — ${data.name}`,
      html:    salonEmailHtml(data),
    }),
    transporter.sendMail({
      from:    emailFrom,
      to:      data.email,
      subject: data.lang === 'es'
        ? 'Hemos recibido tu solicitud — Lumière Studio'
        : 'We received your request — Lumière Studio',
      html: clientEmailHtml(data),
    }),
  ])
}
