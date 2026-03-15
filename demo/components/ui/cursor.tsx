'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const ringX = useSpring(mx, { damping: 22, stiffness: 220, mass: 0.4 })
  const ringY = useSpring(my, { damping: 22, stiffness: 220, mass: 0.4 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const hoverable = el.closest('a, button, [data-hover], .glass, .btn, .pill')
      setHovering(!!hoverable)
    }

    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [visible, mx, my])

  if (typeof window === 'undefined') return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {/* Dot — exact position */}
      <motion.div
        style={{
          position: 'fixed',
          width: hovering ? 10 : 6,
          height: hovering ? 10 : 6,
          borderRadius: '50%',
          background: '#DFFF00',
          x: mx,
          y: my,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.2s ease',
        }}
      />
      {/* Ring — spring lag */}
      <motion.div
        style={{
          position: 'fixed',
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: '50%',
          border: `1px solid rgba(223,255,0,${hovering ? 0.6 : 0.35})`,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
        }}
      />
    </div>
  )
}
