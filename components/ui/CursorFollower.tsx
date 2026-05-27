'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 })

  const size = active ? 60 : 40

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
    }

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor]')) {
        setActive(true)
        const imgParent = target.closest('[data-cursor-label]')
        if (imgParent) setLabel(imgParent.getAttribute('data-cursor-label') || '')
        else setLabel('')
      }
    }

    const handleLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor]')) {
        setActive(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout', handleLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout', handleLeave)
    }
  }, [cursorX, cursorY, size])

  return (
    <motion.div
      className="cursor-follower fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        background: active ? 'rgba(212,169,106,0.4)' : 'rgba(212,169,106,0.25)',
        border: '1px solid rgba(212,169,106,0.6)',
        mixBlendMode: 'multiply',
      }}
      animate={{ width: size, height: size }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <span className="font-cormorant text-[10px] text-stone-900 text-center leading-tight px-1">
          {label}
        </span>
      )}
    </motion.div>
  )
}
