import { z } from 'zod'

export const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().optional(),
  service: z.enum([
    'facial-premium',
    'masaje-ritual',
    'hidratacion-corporal',
    'lifting-facial',
    'drenaje-linfatico',
    'ritual-pareja',
    'otro',
  ]),
  message: z.string().min(10).max(1000),
  lang:    z.enum(['es', 'en']).default('es'),
})

export type ContactInput = z.infer<typeof contactSchema>
