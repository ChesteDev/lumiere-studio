import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { contactRouter } from './routes/contact'
import { servicesRouter } from './routes/services'
import { whatsappRouter } from './routes/whatsapp'

const app = express()

app.use(helmet())
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
}))
app.use(express.json({ limit: '10kb' }))

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests, please try again later.' },
})

app.use('/api/', globalLimiter)
app.use('/api/contact', contactLimiter)

app.use('/api/contact', contactRouter)
app.use('/api/services', servicesRouter)
app.use('/api/whatsapp', whatsappRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Lumière Studio API running on port ${PORT}`)
})

export default app
