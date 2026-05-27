import { Router, Request, Response } from 'express'
import { z } from 'zod'

export const whatsappRouter = Router()

const waSchema = z.object({
  lang: z.enum(['es', 'en']).default('es'),
  service: z.string().optional(),
})

const messages: Record<string, string> = {
  es: 'Hola, me gustaría reservar una cita en Lumière Studio. ¿Podéis indicarme disponibilidad?',
  en: "Hello, I'd like to book an appointment at Lumière Studio. Could you let me know your availability?",
}

whatsappRouter.post('/', (req: Request, res: Response) => {
  const result = waSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed' })
  }

  const { lang, service } = result.data
  const base = messages[lang] || messages.es
  const text = service ? `${base} Servicio de interés: ${service}` : base
  const number = process.env.WHATSAPP_NUMBER || '34963000000'
  const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`

  res.json({ url })
})
