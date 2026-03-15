'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const edu = [
  { degree: 'MBA', full: 'Master of Business Administration', school: 'Madras University, Chennai', year: '2020' },
  { degree: 'B.E.', full: 'Bachelor of Engineering', school: 'Sathyabama University, Chennai', year: '2016' },
]

const certs = [
  { num: '01', name: 'Advanced Data Science Certification', issuer: 'upGrad', year: '2024' },
  { num: '02', name: 'Data Science Programming Bootcamp', issuer: 'upGrad', year: '2023' },
  { num: '03', name: 'Power BI for Data Analytics', issuer: 'Pluralsight', year: '2019' },
  { num: '04', name: 'SQL for Data Science', issuer: 'Coursera', year: '2019' },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education">
      <div className="container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">
            <span className="eyebrow">Education & Certifications</span>
          </div>
          <h2>Academic Grid</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>

          {/* Degrees */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {edu.map((e, i) => (
              <motion.div
                key={e.degree}
                className="glass"
                style={{ padding: '2rem' }}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ borderColor: 'rgba(223,255,0,0.22)', transition: { duration: 0.2 } }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.2rem 0.65rem', borderRadius: 3,
                  background: 'var(--accent-dim)', border: '1px solid rgba(223,255,0,0.2)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  letterSpacing: '0.1em', color: 'var(--accent)',
                  marginBottom: '1rem', textTransform: 'uppercase',
                }}>{e.degree}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>{e.full}</h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginBottom: '0.2rem' }}>{e.school}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-3)' }}>{e.year}</div>
              </motion.div>
            ))}
          </div>

          {/* Certs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {certs.map((c, i) => (
              <motion.div
                key={c.num}
                className="glass"
                style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem' }}
                initial={{ opacity: 0, x: 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
                whileHover={{ borderColor: 'rgba(223,255,0,0.18)', transition: { duration: 0.2 } }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 6, flexShrink: 0,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-3)',
                }}>{c.num}</div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem', color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{c.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-3)', letterSpacing: '0.04em' }}>{c.issuer} · {c.year}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
