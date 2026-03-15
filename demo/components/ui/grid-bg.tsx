'use client'

import { useEffect, useRef } from 'react'

/**
 * Realistic F1 straight — scroll-driven perspective track with:
 *
 * TRACK SURFACES:
 *   - Tarmac fill polygon (dark asphalt gradient)
 *   - Racing line (subtle lighter rubber-buildup strip in center)
 *   - Red/white alternating kerb panels outside track limits (perspective-correct)
 *   - White track-limit boundary lines at track edges
 *   - Center DRS-zone dashes
 *
 * INTENSITY SYSTEM (scroll-based):
 *   At hero (scroll ≈ 0)       → intensity = 1  →  DRAMATIC:  wide FOV, fast, bright
 *   Past hero (scroll > 2×vh)  → intensity = 0  →  AMBIENT:   narrow FOV, slow, dim
 *
 * COLOR DEPTH:
 *   Near lines (relY = 1)  →  Lime   #DFFF00  (warm, energetic)
 *   Far  lines (relY = 0)  →  Cyan   #00E5FF  (cool, distant)
 */
export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const curScroll = useRef(0)
  const tgtScroll = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onScroll = () => { tgtScroll.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    /** Depth color: near=warm lime, far=cool cyan.  relY: 0=horizon, 1=bottom */
    const depthColor = (relY: number, alpha: number): string => {
      const r = Math.round(223 * relY)
      const g = Math.round(255 * relY + 229 * (1 - relY))
      const b = Math.round(0   * relY + 255 * (1 - relY))
      return `rgba(${r},${g},${b},${alpha})`
    }

    const draw = () => {
      curScroll.current += (tgtScroll.current - curScroll.current) * 0.07
      const scroll = curScroll.current

      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // ── INTENSITY ──
      const heroZone  = H * 2
      const rawProg   = Math.min(1, scroll / heroZone)
      const intensity = Math.pow(1 - rawProg, 0.75)

      // ── ADAPTIVE PARAMETERS ──
      const vy     = H * (0.48 - intensity * 0.07)
      const flH    = H - vy
      const HW     = 8  + intensity * 6
      const fl_x   = W  / (2 * HW)
      const speed  = 0.005 + intensity * 0.023
      const aScale = 0.28  + intensity * 0.48
      const HW_i   = Math.round(HW)

      const camZ     = scroll * speed
      const cellFrac = camZ % 1
      const cx       = W / 2

      // Perspective projection helpers (valid for this frame's parameters)
      const projX = (xi: number, wz: number) => cx + xi * fl_x / wz
      const projY = (wz: number) => vy + flH / wz

      const zFar  = 22
      const zNear = 0.12
      const KERB_W = 0.9   // kerb width in world units beyond track limit

      // ── TARMAC FILL ──
      const syFar   = projY(zFar)
      const syNear  = Math.min(H + 80, projY(zNear))
      const sxFarL  = projX(-HW_i, zFar)
      const sxFarR  = projX( HW_i, zFar)
      const sxNearL = Math.max(-W,  projX(-HW_i, zNear))
      const sxNearR = Math.min(2*W, projX( HW_i, zNear))

      const tarmacGrad = ctx.createLinearGradient(cx, syFar, cx, syNear)
      tarmacGrad.addColorStop(0,   `rgba(16,20,16,${0.05 + intensity * 0.1})`)
      tarmacGrad.addColorStop(0.3, `rgba(19,23,19,${0.45 + intensity * 0.25})`)
      tarmacGrad.addColorStop(1,   `rgba(22,27,22,${0.80 + intensity * 0.1})`)
      ctx.fillStyle = tarmacGrad
      ctx.beginPath()
      ctx.moveTo(sxFarL, syFar)
      ctx.lineTo(sxFarR, syFar)
      ctx.lineTo(sxNearR, syNear)
      ctx.lineTo(sxNearL, syNear)
      ctx.closePath()
      ctx.fill()

      // ── RACING LINE (rubber buildup — lighter central strip) ──
      const rlHW_far  = HW_i * 0.18
      const rlHW_near = HW_i * 0.45
      const rlGrad = ctx.createLinearGradient(cx, syFar, cx, syNear)
      rlGrad.addColorStop(0,   `rgba(32,38,28,${0.0})`)
      rlGrad.addColorStop(0.35,`rgba(36,43,30,${0.18 + intensity * 0.12})`)
      rlGrad.addColorStop(1,   `rgba(40,48,33,${0.38 + intensity * 0.12})`)
      ctx.fillStyle = rlGrad
      ctx.beginPath()
      ctx.moveTo(projX(-rlHW_far, zFar), syFar)
      ctx.lineTo(projX( rlHW_far, zFar), syFar)
      ctx.lineTo(Math.min(2*W, projX( rlHW_near, zNear)), syNear)
      ctx.lineTo(Math.max(-W,  projX(-rlHW_near, zNear)), syNear)
      ctx.closePath()
      ctx.fill()

      // ── KERB PANELS (alternating red / white outside track limits) ──
      for (let i = 0; i < 34; i++) {
        const wz_near = i + 1 - cellFrac
        const wz_far  = i + 2 - cellFrac

        if (wz_near <= 0.1) continue

        const sy_near = projY(wz_near)
        const sy_far  = projY(Math.max(0.08, wz_far))

        if (sy_near > H + 40 || sy_far < vy - 2) continue

        const relY  = Math.min(1, (sy_near - vy) / flH)
        const alpha = relY * (0.52 + intensity * 0.3)
        if (alpha < 0.03) continue

        const isRed = (Math.floor(camZ) + i) % 2 === 0

        const wz_f = Math.max(0.08, wz_far)

        // Project the four corners of each kerb panel
        const innerL_n = projX(-HW_i, wz_near)
        const outerL_n = projX(-(HW_i + KERB_W), wz_near)
        const innerR_n = projX( HW_i, wz_near)
        const outerR_n = projX( HW_i + KERB_W, wz_near)

        const innerL_f = projX(-HW_i, wz_f)
        const outerL_f = projX(-(HW_i + KERB_W), wz_f)
        const innerR_f = projX( HW_i, wz_f)
        const outerR_f = projX( HW_i + KERB_W, wz_f)

        const red   = `rgba(215,42,28,${alpha})`
        const white = `rgba(242,242,228,${alpha})`

        // Left kerb
        ctx.fillStyle = isRed ? red : white
        ctx.beginPath()
        ctx.moveTo(outerL_f, sy_far)
        ctx.lineTo(innerL_f, sy_far)
        ctx.lineTo(innerL_n, sy_near)
        ctx.lineTo(outerL_n, sy_near)
        ctx.closePath()
        ctx.fill()

        // Right kerb (opposite color for realism)
        ctx.fillStyle = isRed ? white : red
        ctx.beginPath()
        ctx.moveTo(innerR_f, sy_far)
        ctx.lineTo(outerR_f, sy_far)
        ctx.lineTo(outerR_n, sy_near)
        ctx.lineTo(innerR_n, sy_near)
        ctx.closePath()
        ctx.fill()
      }

      // ── HORIZONTAL GRID LINES ──
      for (let i = 0; i < 34; i++) {
        const wz = i + 1 - cellFrac
        if (wz <= 0.05) continue

        const sy = projY(wz)
        if (sy > H + 60 || sy < vy) continue

        const relY    = Math.min(1, (sy - vy) / flH)
        const hW      = HW * fl_x / wz
        const isMajor = i % 4 === 0

        const baseAlpha = relY * aScale
        const alpha     = isMajor ? Math.min(0.92, baseAlpha * 2.1) : baseAlpha

        if (intensity > 0.25 && relY > 0.72) {
          ctx.shadowBlur  = relY * intensity * 14
          ctx.shadowColor = `rgba(223,255,0,0.35)`
        } else {
          ctx.shadowBlur = 0
        }

        ctx.strokeStyle = depthColor(relY, alpha)
        ctx.lineWidth   = isMajor
          ? relY * (1.8 + intensity * 1.8) + 0.4
          : relY * (1.2 + intensity * 0.9) + 0.2

        ctx.beginPath()
        ctx.moveTo(cx - hW, sy)
        ctx.lineTo(cx + hW, sy)
        ctx.stroke()
      }

      ctx.shadowBlur = 0

      // ── CENTER TRACK MARKINGS (F1 DRS-zone dashes) ──
      if (intensity > 0.05) {
        const dashHW_world = 0.55
        for (let i = 0; i < 34; i += 2) {
          const wz = i + 1 - cellFrac
          if (wz <= 0.1) continue

          const sy = projY(wz)
          if (sy > H + 30 || sy < vy + 4) continue

          const relY  = Math.min(1, (sy - vy) / flH)
          const dashW = dashHW_world * fl_x / wz
          const alpha = relY * intensity * 0.62
          if (alpha < 0.03) continue

          ctx.strokeStyle = `rgba(255,255,220,${alpha})`
          ctx.lineWidth   = relY * intensity * 2.2 + 0.4
          ctx.shadowBlur  = relY * intensity * 18
          ctx.shadowColor = 'rgba(223,255,0,0.7)'

          ctx.beginPath()
          ctx.moveTo(cx - dashW, sy)
          ctx.lineTo(cx + dashW, sy)
          ctx.stroke()
        }
        ctx.shadowBlur = 0
      }

      // ── VERTICAL LINES (converge to vanishing point) ──
      for (let xi = -HW_i; xi <= HW_i; xi++) {
        const isEdge   = Math.abs(xi) === HW_i
        const syFarV   = projY(zFar)
        const syNearV  = projY(zNear)
        const sxFarV   = projX(xi, zFar)
        const sxNearV  = projX(xi, zNear)

        const edgeFade = Math.max(0, 1 - (Math.abs(xi) / HW_i) * 0.82)

        let alpha: number
        if (isEdge) {
          // White track-limit boundary line
          alpha = 0.35 + intensity * 0.35
        } else {
          const base = edgeFade * (xi === 0 ? 0.20 : 0.12)
          alpha = base * (0.35 + intensity * 0.65)
        }
        if (alpha < 0.01) continue

        const yTop = Math.max(vy - 1, syFarV)
        const yBot = Math.min(H, syNearV)
        if (yBot <= yTop) continue

        if (isEdge) {
          // Bright white with subtle glow
          const grad = ctx.createLinearGradient(0, yTop, 0, yBot)
          grad.addColorStop(0,   `rgba(255,255,255,${alpha * 0.25})`)
          grad.addColorStop(0.4, `rgba(255,255,255,${alpha})`)
          grad.addColorStop(1,   `rgba(255,255,255,${alpha * 0.55})`)
          ctx.strokeStyle = grad
          ctx.lineWidth   = 1.4 + intensity * 1.8
          ctx.shadowBlur  = intensity * 10
          ctx.shadowColor = 'rgba(240,255,240,0.55)'
        } else {
          // Cyan→lime depth gradient
          const grad = ctx.createLinearGradient(0, yTop, 0, yBot)
          grad.addColorStop(0,   `rgba(0,229,255,${alpha})`)
          grad.addColorStop(0.5, `rgba(112,242,128,${alpha * 0.8})`)
          grad.addColorStop(1,   `rgba(223,255,0,${alpha * 0.55})`)
          ctx.strokeStyle = grad
          ctx.lineWidth   = xi === 0 ? 1.0 + intensity * 0.8 : 0.6 + intensity * 0.3
          ctx.shadowBlur  = xi === 0 ? intensity * 10 : 0
          ctx.shadowColor = 'rgba(223,255,0,0.45)'
        }

        ctx.beginPath()
        ctx.moveTo(sxFarV, yTop)
        ctx.lineTo(Math.max(-W, Math.min(2 * W, sxNearV)), Math.min(H * 1.5, yBot))
        ctx.stroke()
      }

      ctx.shadowBlur = 0

      // ── HORIZON BLOOM (multi-color, scales with intensity) ──
      const coreR  = W * (0.14 + intensity * 0.22)
      const hCore  = ctx.createRadialGradient(cx, vy, 0, cx, vy, coreR)
      hCore.addColorStop(0, `rgba(223,255,0,${0.055 + intensity * 0.12})`)
      hCore.addColorStop(1,  'rgba(223,255,0,0)')
      ctx.fillStyle = hCore
      ctx.fillRect(cx - coreR, vy - coreR * 0.35, coreR * 2, coreR * 0.7)

      const wingsR = W * (0.55 + intensity * 0.25)
      const hWings = ctx.createRadialGradient(cx, vy, coreR * 0.4, cx, vy, wingsR)
      hWings.addColorStop(0, `rgba(0,229,255,${0.04 + intensity * 0.055})`)
      hWings.addColorStop(1,  'rgba(0,229,255,0)')
      ctx.fillStyle = hWings
      ctx.fillRect(0, vy - 65, W, 130)

      const deepG = ctx.createRadialGradient(cx, vy + flH * 0.55, 0, cx, vy + flH * 0.55, W * 0.4)
      deepG.addColorStop(0, `rgba(0,55,75,${0.18 + intensity * 0.18})`)
      deepG.addColorStop(1,  'rgba(0,55,75,0)')
      ctx.fillStyle = deepG
      ctx.fillRect(0, vy, W, flH)

      // ── VIGNETTE OVERLAYS ──
      const bg = 'rgba(9,12,9,'

      const skyG = ctx.createLinearGradient(0, 0, 0, vy + 45)
      skyG.addColorStop(0,    `${bg}1)`)
      skyG.addColorStop(0.65, `${bg}0.88)`)
      skyG.addColorStop(1,    `${bg}0)`)
      ctx.fillStyle = skyG
      ctx.fillRect(0, 0, W, vy + 45)

      const botG = ctx.createLinearGradient(0, H * 0.62, 0, H)
      botG.addColorStop(0, `${bg}0)`)
      botG.addColorStop(1, `${bg}0.95)`)
      ctx.fillStyle = botG
      ctx.fillRect(0, H * 0.62, W, H)

      const lG = ctx.createLinearGradient(0, 0, W * 0.17, 0)
      lG.addColorStop(0, `${bg}0.82)`)
      lG.addColorStop(1, `${bg}0)`)
      ctx.fillStyle = lG
      ctx.fillRect(0, 0, W * 0.17, H)

      const rG = ctx.createLinearGradient(W * 0.83, 0, W, 0)
      rG.addColorStop(0, `${bg}0)`)
      rG.addColorStop(1, `${bg}0.82)`)
      ctx.fillStyle = rG
      ctx.fillRect(W * 0.83, 0, W * 0.17, H)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
