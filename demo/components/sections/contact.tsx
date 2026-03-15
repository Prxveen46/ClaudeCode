'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const contactLinks = [
  { label: 'Email',    value: 'prxveen46@gmail.com',                       href: 'mailto:prxveen46@gmail.com',                icon: '✉', accent: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/praveenvr46',               href: 'https://www.linkedin.com/in/praveenvr46/', icon: '↗', accent: false },
  { label: 'Location', value: 'Bengaluru, Karnataka',                       href: null,                                         icon: '◎', accent: false },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact">
      <div className="container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem', textAlign: 'center' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="eyebrow">Let&apos;s Connect</span>
          </div>
          <h2>Pit Stop</h2>
          <p style={{
            fontSize: '1rem', color: 'var(--text-2)',
            maxWidth: 480, margin: '1.25rem auto 0', lineHeight: 1.8,
          }}>
            Looking for a Senior Data Analyst, need analytics consulting, or want to discuss a project — let&apos;s talk.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1rem', alignItems: 'start' }}>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {contactLinks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              >
                {l.href ? (
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener"
                    className="glass"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1.1rem 1.5rem',
                      textDecoration: 'none', color: 'var(--text-2)', fontSize: '0.88rem',
                      transition: 'all 0.2s ease',
                      border: l.accent ? '1px solid rgba(223,255,0,0.15)' : undefined,
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--text-1)'
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(223,255,0,0.28)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--text-2)'
                      ;(e.currentTarget as HTMLElement).style.borderColor = l.accent ? 'rgba(223,255,0,0.15)' : 'var(--border)'
                    }}
                  >
                    <span style={{
                      width: 34, height: 34, borderRadius: 6, flexShrink: 0,
                      background: l.accent ? 'var(--accent-dim)' : 'var(--bg)',
                      border: `1px solid ${l.accent ? 'rgba(223,255,0,0.25)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', color: 'var(--accent)',
                    }}>{l.icon}</span>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                        color: 'var(--text-3)', letterSpacing: '0.12em',
                        textTransform: 'uppercase', marginBottom: '0.2rem',
                      }}>{l.label}</div>
                      <div>{l.value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="glass" style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.1rem 1.5rem', color: 'var(--text-2)', fontSize: '0.88rem',
                  }}>
                    <span style={{
                      width: 34, height: 34, borderRadius: 6, flexShrink: 0,
                      background: 'var(--bg)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', color: 'var(--text-3)',
                    }}>{l.icon}</span>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                        color: 'var(--text-3)', letterSpacing: '0.12em',
                        textTransform: 'uppercase', marginBottom: '0.2rem',
                      }}>{l.label}</div>
                      <div>{l.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* F1 availability note */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.35 }}
              style={{
                padding: '1.25rem 1.5rem',
                border: '1px solid rgba(223,255,0,0.15)',
                borderRadius: 10, background: 'rgba(223,255,0,0.03)',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                color: 'var(--text-3)', letterSpacing: '0.18em', marginBottom: '0.5rem',
              }}>{'// AVAILABILITY'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="pulse" style={{ width: 5, height: 5 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                  Open to full-time roles
                </span>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--text-3)', marginTop: '0.35rem',
              }}>Bengaluru · Remote-friendly · Immediate</div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            className="glass"
            style={{ padding: '2.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '0.75rem',
                }}>{'// TRANSMISSION_RECEIVED'}</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.04em' }}>
                  COPY THAT
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', marginTop: '0.75rem' }}>
                  I&apos;ll be in touch soon.
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your full name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: 'var(--text-3)', display: 'block', marginBottom: '0.5rem',
                      }}>{f.label}</label>
                      <input
                        id={f.id} type={f.type} placeholder={f.placeholder} required
                        style={{
                          width: '100%', background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 6, padding: '0.75rem 1rem',
                          color: 'var(--text-1)', fontFamily: 'var(--font-body)',
                          fontSize: '0.88rem', outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(223,255,0,0.4)' }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--text-3)', display: 'block', marginBottom: '0.5rem',
                  }}>Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell me about your project or opportunity..."
                    required
                    style={{
                      width: '100%', background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 6, padding: '0.75rem 1rem',
                      color: 'var(--text-1)', fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem', outline: 'none',
                      minHeight: 120, resize: 'vertical',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(223,255,0,0.4)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
                  SEND TRANSMISSION →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
