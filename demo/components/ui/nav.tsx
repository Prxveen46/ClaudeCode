'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#about',      label: 'About'    },
  { href: '#experience', label: 'Career'   },
  { href: '#projects',   label: 'Projects' },
  { href: '#skills',     label: 'Skills'   },
  { href: '#contact',    label: 'Contact'  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => io.observe(s!))
    return () => io.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: '1.25rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex', alignItems: 'center',
        padding: '0.35rem 0.35rem',
        background: scrolled ? 'rgba(13,13,13,0.94)' : 'rgba(18,18,18,0.75)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${scrolled ? 'rgba(223,255,0,0.15)' : 'var(--border)'}`,
        borderRadius: 6,
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {/* Brand */}
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          fontWeight: 700, letterSpacing: '0.1em',
          color: 'var(--accent)', textDecoration: 'none',
          padding: '0.45rem 1rem',
          borderRight: '1px solid var(--border)',
          marginRight: '0.25rem',
          whiteSpace: 'nowrap',
        }}
      >
        P.KUMAR
      </a>

      {/* Nav links */}
      {links.map((l) => {
        const isActive = active === l.href
        return (
          <a
            key={l.href}
            href={l.href}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.57rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0.45rem 0.85rem',
              borderRadius: 4,
              color: isActive ? 'var(--accent)' : 'var(--text-3)',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-2)' }}
            onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
          >
            {l.label}
          </a>
        )
      })}

      {/* CTA */}
      <a
        href="#contact"
        style={{
          marginLeft: '0.25rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.57rem',
          fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', textDecoration: 'none',
          padding: '0.45rem 1rem',
          background: 'var(--accent)', color: '#0D0D0D',
          borderRadius: 4,
          transition: 'background 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.background = '#EEFF44'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(223,255,0,0.4)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.background = 'var(--accent)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        RECRUIT
      </a>
    </motion.nav>
  )
}
