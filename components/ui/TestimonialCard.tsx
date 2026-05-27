interface Testimonial {
  name: string
  location: string
  rating: number
  text_es: string
  text_en: string
  service: string
}

interface Props {
  testimonial: Testimonial
  locale: string
}

export default function TestimonialCard({ testimonial, locale }: Props) {
  const text = locale === 'en' ? testimonial.text_en : testimonial.text_es

  return (
    <article className="relative bg-cream-100 border border-stone-200 p-8 md:p-10 flex-shrink-0 w-full md:w-[560px]">
      {/* Decorative quote */}
      <span className="absolute top-4 left-6 font-cormorant text-[8rem] leading-none text-stone-200 select-none pointer-events-none">
        &ldquo;
      </span>

      {/* Stars */}
      <div className="flex gap-1 mb-6 relative z-10">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-gold-300">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="font-cormorant italic text-body-lg text-stone-800 mb-6 relative z-10">
        &ldquo;{text}&rdquo;
      </blockquote>

      <footer className="flex items-center justify-between relative z-10">
        <div>
          <cite className="font-sans text-label text-stone-900 uppercase tracking-widest not-italic">
            {testimonial.name}
          </cite>
          <p className="font-sans text-xs text-stone-400 mt-0.5">{testimonial.location}</p>
        </div>
        <span className="font-sans text-xs bg-gold-300/20 text-gold-500 px-3 py-1">
          {testimonial.service}
        </span>
      </footer>
    </article>
  )
}
