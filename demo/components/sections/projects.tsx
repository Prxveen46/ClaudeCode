'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const projects = [
  {
    num: '01', ai: false,
    sector: 'ANALYTICS · MICROSOFT',
    title: 'Trending Travel Dashboard',
    desc: 'Weekly-refresh Power BI platform tracking destination trends, keyword performance (YoY/WoW), search volume & click index with sensitivity-compliant data masking. Used by Microsoft advertising strategists.',
    tags: ['Power BI', 'DAX', 'Azure Cosmos DB', 'Scope Language'],
    kpis: [{ val: '+18%', label: 'YoY Growth' }, { val: '2.4M', label: 'Searches' }, { val: '+7%', label: 'WoW' }],
    bar: 85,
  },
  {
    num: '02', ai: false,
    sector: 'FUNNEL OPT · ROAS',
    title: 'Consumer Decision Journey',
    desc: 'Mapped user intent + purchase factors across the full funnel. Refined ad strategies and optimized ROAS for Amazon, Nike & Audi on Microsoft\'s advertising platform.',
    tags: ['Power BI', 'SQL', 'Python', 'Marketing Analytics'],
    kpis: [{ val: '3.2x', label: 'Funnel Eff.' }, { val: '+10%', label: 'ROI Lift' }, { val: '15+', label: 'Dashboards' }],
    bar: 72,
  },
  {
    num: '03', ai: false,
    sector: 'GEO INTEL · SEARCH',
    title: 'Query Pathing Tool',
    desc: 'Search behavior tracker with location mapping, POI categorization and destination classification — granular targeting insights improved campaign ROI by 10%.',
    tags: ['SQL', 'Azure', 'Data Modeling', 'Geo Analytics'],
    kpis: [{ val: '+30%', label: 'DB Perf.' }, { val: '99%+', label: 'SLA Rate' }, { val: '+10%', label: 'ROI' }],
    bar: 68,
  },
  {
    num: '04', ai: true,
    sector: 'AI · OPENAI',
    title: 'OpenAI API Projects',
    desc: 'Personal projects with GPT-4o, Assistants API, and Embeddings — semantic document search, automated Q&A over datasets, AI-generated data narrative reports in Python.',
    tags: ['OpenAI API', 'GPT-4o', 'Embeddings', 'Python'],
    kpis: [{ val: 'GPT-4o', label: 'Model' }, { val: '3', label: 'Tools' }, { val: '~70%', label: 'Time Saved' }],
    bar: 90,
  },
  {
    num: '05', ai: true,
    sector: 'AI · CLAUDE CODE',
    title: 'AI-Assisted Analytics Pipeline',
    desc: 'Claude Code + ChatGPT integrated into daily analytics workflow. Automated EDA, plain-English SQL generation, LLM sentiment analysis across thousands of customer feedback entries.',
    tags: ['Claude Code', 'ChatGPT', 'Python', 'Snowflake'],
    kpis: [{ val: '~70%', label: 'EDA Speedup' }, { val: '1000s', label: 'Entries' }, { val: 'Daily', label: 'Usage' }],
    bar: 95,
  },
  {
    num: '06', ai: true,
    sector: 'AI · RESEARCH',
    title: 'Daily AI Research Practice',
    desc: 'Continuous learning covering model releases (Claude, GPT, Gemini, OSS LLMs), applied ML papers, and new tooling (LangChain, Ollama, fine-tuning) — directly informs production decisions.',
    tags: ['Claude', 'Gemini', 'LangChain', 'Ollama'],
    kpis: [{ val: 'Daily', label: 'Cadence' }, { val: '4+', label: 'Models' }, { val: 'Prod', label: 'Impact' }],
    bar: 100,
  },
]

const CARD_W = 390
const CARD_GAP = 16
const TOTAL_W = projects.length * CARD_W + (projects.length - 1) * CARD_GAP

function ProjectCard({ p }: { p: typeof projects[0] }) {
  return (
    <motion.div
      style={{
        flexShrink: 0,
        width: CARD_W,
        background: p.ai ? 'rgba(18,18,18,0.95)' : 'rgba(16,16,16,0.95)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${p.ai ? 'rgba(223,255,0,0.18)' : 'var(--border)'}`,
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s ease',
      }}
      whileHover={{
        borderColor: 'rgba(223,255,0,0.5)',
        boxShadow: '0 0 36px rgba(223,255,0,0.12), inset 0 0 36px rgba(223,255,0,0.04)',
        y: -4,
        transition: { duration: 0.28 },
      }}
    >
      {/* ── TELEMETRY HEADER ── */}
      <div style={{
        padding: '0.85rem 1.4rem',
        borderBottom: `1px solid ${p.ai ? 'rgba(223,255,0,0.1)' : 'var(--border)'}`,
        background: p.ai ? 'rgba(223,255,0,0.04)' : '#0A0A0A',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
          color: 'var(--text-3)', letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>{p.sector}</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {p.ai && (
            <span style={{
              padding: '0.12rem 0.5rem', borderRadius: 3,
              background: 'var(--accent-dim)', border: '1px solid rgba(223,255,0,0.25)',
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
              color: 'var(--accent)', letterSpacing: '0.12em',
            }}>AI</span>
          )}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
            color: 'var(--text-3)', letterSpacing: '0.14em',
          }}>{p.num}</span>
        </div>
      </div>

      {/* ── KPI READOUT ── like F1 timing splits */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${p.ai ? 'rgba(223,255,0,0.08)' : 'var(--border)'}` }}>
        {p.kpis.map((k, ki) => (
          <div key={k.label} style={{
            flex: 1,
            padding: '0.85rem 0.75rem',
            textAlign: 'center',
            borderRight: ki < p.kpis.length - 1 ? '1px solid var(--border)' : 'none',
            background: ki === 0 ? 'rgba(223,255,0,0.03)' : 'transparent',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
              fontWeight: 700, color: 'var(--accent)', lineHeight: 1, marginBottom: '0.2rem',
            }}>{k.val}</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
              color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem', fontWeight: 700,
          letterSpacing: '-0.03em', lineHeight: 1.2,
          marginBottom: '0.85rem', color: 'var(--text-1)',
        }}>{p.title}</h3>

        <p style={{
          fontSize: '0.8rem', color: 'var(--text-2)',
          lineHeight: 1.75, marginBottom: '1.25rem', flex: 1,
        }}>{p.desc}</p>

        {/* Telemetry bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div className="telemetry-bar">
            <div className="telemetry-bar-fill" style={{ width: `${p.bar}%` }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {p.tags.map((t) => <span key={t} className="tech-tag">{t}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef    = useRef(null)
  const isInView     = useInView(headerRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(TOTAL_W - (typeof window !== 'undefined' ? window.innerWidth : 1200) + 80)],
  )

  const barW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} style={{ height: '450vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '2rem', flexShrink: 0 }} ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label" style={{ marginBottom: '1rem' }}>
              <span className="eyebrow">Projects & AI Tools</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h2 id="projects" style={{ paddingTop: 0 }}>Data Pit Lane</h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                color: 'var(--text-3)', letterSpacing: '0.16em',
              }}>SCROLL TO ADVANCE →</span>
            </div>
          </motion.div>

          {/* Progress bar — F1 timing bar */}
          <div style={{
            marginTop: '1rem', height: '2px',
            background: 'var(--border)', borderRadius: 999, overflow: 'hidden',
          }}>
            <motion.div style={{
              height: '100%',
              background: 'var(--accent)',
              width: barW,
              boxShadow: '0 0 12px var(--accent-glow)',
            }} />
          </div>
        </div>

        {/* Horizontal track */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: '2.5rem', overflow: 'visible' }}>
          <motion.div style={{
            display: 'flex', gap: CARD_GAP, x: translateX,
            perspective: 1200, transformStyle: 'preserve-3d',
          }}>
            {projects.map((p) => <ProjectCard key={p.num} p={p} />)}
          </motion.div>
        </div>

        {/* Counter */}
        <motion.div style={{
          paddingBottom: '2rem', paddingLeft: '2.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
          color: 'var(--text-3)', letterSpacing: '0.18em',
        }}>
          {projects.length} PROJECTS IN PIT LANE
        </motion.div>

      </div>
    </div>
  )
}
