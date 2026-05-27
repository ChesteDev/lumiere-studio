import { Router, Request, Response } from 'express'
import { contactSchema } from '../schemas/contact.schema'
import { sendContactEmails } from '../services/mailer'

export const contactRouter = Router()

contactRouter.post('/', async (req: Request, res: Response) => {
  const result = contactSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    })
  }

  try {
    await sendContactEmails(result.data)
    return res.status(200).json({ success: true, message: 'Message sent' })
  } catch (err) {
    console.error('Email error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
})
