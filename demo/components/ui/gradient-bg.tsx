'use client'

import { useEffect, useRef } from 'react'

interface Orb {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  r: number
  g: number
  b: number
  phase: number
  phaseSpeed: number
}

const PALETTE = [
  { r: 139, g: 92,  b: 246 }, // violet
  { r: 99,  g: 102, b: 241 }, // indigo
  { r: 168, g: 85,  b: 247 }, // purple
  { r: 59,  g: 130, b: 246 }, // blue
  { r: 236, g: 72,  b: 153 }, // pink
  { r: 245, g: 158, b: 11  }, // amber (subtle)
]

export default function GradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create orbs
    const orbs: Orb[] = Array.from({ length: 8 }, (_, i) => {
      const color = PALETTE[i % PALETTE.length]
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 350 + 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        ...color,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.0003 + Math.random() * 0.0004,
      }
    })

    const draw = () => {
      animId = requestAnimationFrame(draw)
      time++

      // Deep bg fill
      ctx.fillStyle = '#07050f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = 'screen'

      orbs.forEach((orb) => {
        // Drift
        orb.phase += orb.phaseSpeed
        orb.x += orb.vx + Math.sin(orb.phase) * 0.6
        orb.y += orb.vy + Math.cos(orb.phase * 0.7) * 0.5

        // Wrap at edges
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width  + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        const alpha = 0.12 + 0.04 * Math.sin(time * 0.008 + orb.phase)

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        grad.addColorStop(0, `rgba(${orb.r},${orb.g},${orb.b},${alpha})`)
        grad.addColorStop(0.5, `rgba(${orb.r},${orb.g},${orb.b},${alpha * 0.4})`)
        grad.addColorStop(1, `rgba(${orb.r},${orb.g},${orb.b},0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'source-over'

      // Vignette overlay
      const vig = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.9,
      )
      vig.addColorStop(0, 'rgba(7,5,15,0)')
      vig.addColorStop(1, 'rgba(7,5,15,0.55)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
