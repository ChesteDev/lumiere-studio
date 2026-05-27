'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  src: string
  alt: string
  intensity?: number
  className?: string
  containerClassName?: string
  priority?: boolean
}

export default function ParallaxImage({
  src, alt, intensity = 0.2, className = '', containerClassName = '', priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', `${intensity * 100}%`])

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover ${className}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  )
}
