'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
    }
  }, [isInView, to, count])

  return <motion.span ref={ref}>{display}</motion.span>
}

const stats = [
  { to: 9,  suffix: '+', label: 'Years on Circuit', sub: 'Across 4 teams',       href: '#experience' },
  { to: 25, suffix: '+', label: 'Dashboards Built',  sub: 'Tableau & Power BI',   href: '#projects'   },
  { to: 90, suffix: '%', label: 'Pipeline Speedup',  sub: 'Snowflake automation', href: '#skills'     },
  { to: 80, suffix: '%', label: 'CSAT Improvement',  sub: 'Customer journey',     href: '#contact'    },
]

const aiTools = ['Claude Code (CLI)', 'OpenAI GPT-4o', 'Assistants API', 'Embeddings', 'Gemini', 'Prompt Engineering']

const interests = [
  { label: 'Formula 1 · McLaren Fan · Race Strategy', accent: true },
  { label: 'Motorcycles · Track Riding · Touring',     accent: false },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about">
      <div className="container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">
            <span className="eyebrow">Driver Profile</span>
          </div>
          <h2>Turning Data<br />Into Lap Times</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>

          {/* ── BIO ── */}
          <motion.div
            className="glass"
            style={{ padding: '2.5rem' }}
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
              AI-native Senior Data Analyst based in{' '}
              <span style={{ color: 'var(--text-1)', fontWeight: 700 }}>Bengaluru</span> with 9+ years spanning
              BI, Marketing Analytics, and AI-Augmented Data Engineering.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
              I vibe code daily — translating analytical intent into working SQL pipelines and Python scripts using{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Claude Code, ChatGPT & Gemini</span>{' '}
              without traditional bottlenecks.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.9 }}>
              Currently at{' '}
              <span style={{ color: 'var(--text-1)', fontWeight: 700 }}>Vimeo</span>. Previously embedded with{' '}
              <span style={{ color: 'var(--accent)' }}>Microsoft, Amazon, Nike & Audi</span>{' '}
              — delivering pipelines and dashboards that drive measurable revenue.
            </p>

            {/* AI Stack */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.75rem', borderTop: '1px solid var(--border)' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                color: 'var(--text-3)', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: '0.85rem',
              }}>{'// DAILY_AI_STACK'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {aiTools.map((t) => <span key={t} className="pill">{t}</span>)}
              </div>
            </div>

            {/* Off-track interests */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                color: 'var(--text-3)', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: '0.85rem',
              }}>{'// OFF_TRACK'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {interests.map((item) => (
                  <span
                    key={item.label}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '0.3rem 0.85rem',
                      border: `1px solid ${item.accent ? 'rgba(223,255,0,0.25)' : 'var(--border-hi)'}`,
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                      color: item.accent ? 'var(--accent)' : 'var(--text-2)',
                      background: item.accent ? 'var(--accent-dim)' : 'transparent',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── TELEMETRY STATS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {stats.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <motion.div
                  className="glass scan-line"
                  style={{ padding: '2rem', overflow: 'hidden' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
                  whileHover={{ borderColor: 'rgba(223,255,0,0.22)', transition: { duration: 0.2 } }}
                >
                  {/* Sector number */}
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                    color: 'var(--text-3)', letterSpacing: '0.2em',
                    marginBottom: '0.75rem',
                  }}>S{i + 1}</div>

                  {/* Big number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem', fontWeight: 800, lineHeight: 1,
                    letterSpacing: '-0.05em',
                    color: i < 2 ? 'var(--accent)' : 'var(--text-1)',
                    marginBottom: '0.5rem',
                  }}>
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', fontWeight: 600, marginBottom: '0.2rem' }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-3)', letterSpacing: '0.04em' }}>
                    {s.sub}
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
