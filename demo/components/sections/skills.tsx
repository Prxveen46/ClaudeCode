'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillGroups = [
  {
    cat: 'AI & LLM',
    code: 'S1',
    accent: true,
    span: '1 / 4',
    pills: ['Claude Code (CLI + Web)', 'OpenAI API (GPT-4o)', 'Assistants API', 'Embeddings', 'Gemini', 'Prompt Engineering', 'LLM-Driven Pipelines', 'Automated Insight Generation'],
  },
  {
    cat: 'Data Engineering',
    code: 'S2',
    accent: false,
    span: '1 / 3',
    pills: ['SQL (Advanced)', 'Snowflake', 'Azure Cosmos DB', 'GCP', 'ETL / ELT', 'Data Modeling', 'Automated Pipelines'],
  },
  {
    cat: 'Analytics & ML',
    code: 'S3',
    accent: false,
    span: '3 / 4',
    pills: ['Predictive Modeling', 'Customer Segmentation', 'Behavioral Modeling', 'A/B Testing', 'Statistical Analysis'],
  },
  {
    cat: 'BI & Visualization',
    code: 'S4',
    accent: false,
    span: '1 / 2',
    pills: ['Tableau', 'Power BI', 'DAX', 'Real-Time KPI Dashboarding', 'Data Storytelling'],
  },
  {
    cat: 'Programming',
    code: 'S5',
    accent: false,
    span: '2 / 3',
    pills: ['Python', 'R', 'Scope Language (.NET/C#)'],
  },
  {
    cat: 'Marketing Analytics',
    code: 'S6',
    accent: false,
    span: '3 / 4',
    pills: ['Campaign Optimization', 'ROAS / ROI Analysis', 'Keyword Performance', 'YoY / WoW Trends'],
  },
  {
    cat: 'Tools & Leadership',
    code: 'S7',
    accent: false,
    span: '1 / 4',
    pills: ['Jira', 'Azure DevOps', 'GitHub', 'Agile / Scrum', 'Cross-Functional Leadership', 'Requirements Engineering'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills">
      <div className="container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">
            <span className="eyebrow">Technical Arsenal</span>
          </div>
          <h2>Telemetry Readout</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.cat}
              className={`glass${g.accent ? ' scan-line' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
              whileHover={{
                borderColor: g.accent ? 'rgba(223,255,0,0.38)' : 'rgba(223,255,0,0.18)',
                boxShadow: g.accent
                  ? '0 0 24px rgba(223,255,0,0.1)'
                  : '0 0 16px rgba(223,255,0,0.05)',
                transition: { duration: 0.2 },
              }}
              style={{
                gridColumn: g.span,
                padding: g.accent ? '2rem 2.5rem' : '1.5rem 1.75rem',
                background: g.accent ? 'rgba(223,255,0,0.04)' : 'var(--surface)',
                border: g.accent ? '1px solid rgba(223,255,0,0.18)' : '1px solid var(--border)',
              }}
            >
              {/* Sector header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                  color: 'var(--text-3)', letterSpacing: '0.2em',
                }}>{g.code}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: g.accent ? 'var(--accent)' : 'var(--text-3)',
                }}>{g.cat}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {g.pills.map((p) => (
                  <motion.span
                    key={p}
                    whileHover={{ scale: 1.04 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '0.28rem 0.75rem', borderRadius: 3,
                      fontFamily: 'var(--font-body)', fontSize: '0.76rem',
                      background: g.accent ? 'rgba(223,255,0,0.1)' : 'var(--surface-2)',
                      border: `1px solid ${g.accent ? 'rgba(223,255,0,0.2)' : 'var(--border-hi)'}`,
                      color: g.accent ? 'var(--accent)' : 'var(--text-2)',
                      cursor: 'none',
                      transition: 'background 0.2s ease',
                      fontWeight: 500,
                    }}
                  >{p}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
