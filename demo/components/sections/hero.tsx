'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { val: '9+',  unit: 'YRS', label: 'EXPERIENCE', href: '#experience' },
  { val: '25+', unit: 'DSH', label: 'DASHBOARDS',  href: '#projects'   },
  { val: '90%', unit: 'ETL', label: 'SPEEDUP',     href: '#skills'     },
  { val: '80%', unit: 'CST', label: 'CSAT LIFT',   href: '#about'      },
]

export default function Hero() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Lime glow top-right — primary heat source */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(223,255,0,0.06) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* DRS cyan glow bottom-left — depth / distance counterpoint */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Dark vignette bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to top, var(--bg), transparent)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '9rem', paddingBottom: '5rem' }}>

        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '0.75rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
            color: 'var(--text-3)', letterSpacing: '0.2em',
          }}>
            SECTOR_01 // BENGALURU, INDIA
          </span>
          <span className="sector-badge">
            <span className="pulse" style={{ width: 5, height: 5 }} />
            OPEN TO RACE
          </span>
        </motion.div>

        {/* ── NAME BLOCK ── */}
        <div style={{ marginBottom: '2rem' }}>
          {/* PRAVEEN — slides up from bottom */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.85, delay: 0.3, ease }}
            >
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5.5rem, 14vw, 11.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 0.88,
                color: 'var(--text-1)',
              }}>
                PRAVEEN
              </span>
            </motion.div>
          </div>

          {/* KUMAR — accent color, slight delay */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.85, delay: 0.42, ease }}
            >
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5.5rem, 14vw, 11.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 0.88,
                color: 'var(--accent)',
              }}>
                KUMAR
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── ROLE LINE ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3rem' }}
        >
          <div style={{ width: 36, height: 2, background: 'var(--accent)', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.58rem, 1.2vw, 0.78rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-2)',
            fontWeight: 400,
          }}>
            SENIOR DATA ANALYST · AI-AUGMENTED · DATA STRATEGY & ANALYTICS ENGINEERING
          </span>
        </motion.div>

        {/* ── LAP TIME STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78, ease }}
          style={{
            display: 'flex', gap: '0', marginBottom: '3.5rem',
            border: '1px solid var(--border)', borderRadius: 6,
            overflow: 'hidden', width: 'fit-content',
          }}
        >
          {stats.map((s, i) => (
            <a
              key={s.unit}
              href={s.href}
              onMouseEnter={() => setHoveredStat(s.unit)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                transition: 'background 0.2s ease',
                background: hoveredStat === s.unit
                  ? 'rgba(223,255,0,0.08)'
                  : i === 0 ? 'rgba(223,255,0,0.05)' : 'transparent',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div
                style={{
                  padding: '1rem 1.5rem',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.45rem',
                  color: 'var(--text-3)', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginBottom: '0.25rem',
                }}>{s.unit}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 800, color: i === 0 ? 'var(--accent)' : 'var(--text-1)',
                  letterSpacing: '-0.04em', lineHeight: 1,
                }}>{s.val}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                  color: 'var(--text-3)', letterSpacing: '0.12em',
                  marginTop: '0.2rem',
                }}>{s.label}</div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.92, ease }}
          style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          <a href="#contact" className="btn btn-primary">GET IN TOUCH →</a>
          <a href="#experience" className="btn btn-ghost">VIEW RACE RECORD</a>
        </motion.div>

        {/* ── WORKED WITH ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            color: 'var(--text-3)', letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>RACED WITH</span>
          {['MICROSOFT', 'AMAZON', 'NIKE', 'AUDI'].map((c) => (
            <a
              key={c}
              href="#experience"
              onMouseEnter={() => setHoveredBadge(c)}
              onMouseLeave={() => setHoveredBadge(null)}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                fontWeight: 700, letterSpacing: '0.12em',
                color: hoveredBadge === c ? 'var(--accent)' : 'var(--text-3)',
                padding: '0.2rem 0.65rem',
                border: `1px solid ${hoveredBadge === c ? 'rgba(223,255,0,0.5)' : 'var(--border)'}`,
                borderRadius: 3,
                transition: 'border-color 0.2s ease, color 0.2s ease',
                display: 'inline-block',
              }}>{c}</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
          color: 'var(--text-3)', letterSpacing: '0.2em',
        }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: 1, height: 28, background: 'linear-gradient(180deg, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
