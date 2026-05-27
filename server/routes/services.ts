import { Router, Request, Response } from 'express'
import servicesData from '../data/services.json'

export const servicesRouter = Router()

servicesRouter.get('/', (_req: Request, res: Response) => {
  res.json(servicesData)
})

servicesRouter.get('/:id', (req: Request, res: Response) => {
  const service = servicesData.services.find((s) => s.id === req.params.id)
  if (!service) return res.status(404).json({ error: 'Service not found' })
  res.json(service)
})
