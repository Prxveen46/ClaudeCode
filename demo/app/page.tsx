'use client'

import { useEffect } from 'react'
import Cursor      from '@/components/ui/cursor'
import GridBackground from '@/components/ui/grid-bg'
import Nav         from '@/components/ui/nav'
import Hero      from '@/components/sections/hero'
import About     from '@/components/sections/about'
import Skills    from '@/components/sections/skills'
import Experience from '@/components/sections/experience'
import Projects  from '@/components/sections/projects'
import Education from '@/components/sections/education'
import Contact   from '@/components/sections/contact'

export default function Portfolio() {
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    if (!bar) return
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      bar.style.width = Math.min(pct, 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <GridBackground />
      <Cursor />
      <div id="progress-bar" />
      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
        background: 'rgba(10,10,10,0.96)',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-3)', letterSpacing: '0.08em' }}>
            © 2026 Praveen Kumar
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-3)', letterSpacing: '0.06em' }}>
            SENIOR DATA ANALYST · BENGALURU · AI-AUGMENTED
          </span>
        </div>
      </footer>
    </>
  )
}
// 2026-03-15
