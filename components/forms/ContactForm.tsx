'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().optional(),
  service: z.enum(['facial-premium', 'masaje-ritual', 'hidratacion-corporal', 'lifting-facial', 'drenaje-linfatico', 'ritual-pareja', 'otro']),
  message: z.string().min(10).max(1000),
})
type FormData = z.infer<typeof schema>

const serviceKeys = [
  { value: 'facial-premium',       label_key: 'service_facial' },
  { value: 'masaje-ritual',        label_key: 'service_masaje' },
  { value: 'hidratacion-corporal', label_key: 'service_hidratacion' },
  { value: 'lifting-facial',       label_key: 'service_lifting' },
  { value: 'drenaje-linfatico',    label_key: 'service_drenaje' },
  { value: 'ritual-pareja',        label_key: 'service_pareja' },
  { value: 'otro',                 label_key: 'service_otro' },
] as const

type ServiceLabelKey = typeof serviceKeys[number]['label_key']

export default function ContactForm() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang: locale }),
      })
      if (!res.ok) throw new Error()
      toast.success(t('form_success'))
      reset()
    } catch {
      toast.error(t('form_error'))
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-transparent border-b border-stone-300 focus:border-gold-300 outline-none py-3 font-sans text-body-md text-stone-900 placeholder:text-stone-400 transition-colors duration-200'
  const errorClass = 'font-sans text-xs text-error mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <div>
        <label className="font-sans text-label text-stone-600 uppercase tracking-widest block mb-1">{t('form_name')}</label>
        <input {...register('name')} type="text" placeholder={t('form_name')} className={inputClass} aria-invalid={!!errors.name} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label className="font-sans text-label text-stone-600 uppercase tracking-widest block mb-1">{t('form_email')}</label>
        <input {...register('email')} type="email" placeholder={t('form_email')} className={inputClass} aria-invalid={!!errors.email} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className="font-sans text-label text-stone-600 uppercase tracking-widest block mb-1">{t('form_phone')}</label>
        <input {...register('phone')} type="tel" placeholder={t('form_phone')} className={inputClass} />
      </div>

      <div>
        <label className="font-sans text-label text-stone-600 uppercase tracking-widest block mb-1">{t('form_service')}</label>
        <select {...register('service')} className={`${inputClass} bg-transparent cursor-pointer`} aria-invalid={!!errors.service} defaultValue="">
          <option value="" disabled>{t('select_service')}</option>
          {serviceKeys.map((s) => (
            <option key={s.value} value={s.value}>{t(s.label_key as ServiceLabelKey)}</option>
          ))}
        </select>
        {errors.service && <p className={errorClass}>{errors.service.message}</p>}
      </div>

      <div>
        <label className="font-sans text-label text-stone-600 uppercase tracking-widest block mb-1">{t('form_message')}</label>
        <textarea {...register('message')} rows={4} placeholder={t('form_message')} className={`${inputClass} resize-none`} aria-invalid={!!errors.message} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {t('form_sending')}
          </span>
        ) : t('form_submit')}
      </button>
    </form>
  )
}
