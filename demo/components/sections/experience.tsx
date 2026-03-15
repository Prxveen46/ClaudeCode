'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const jobs = [
  {
    pos: 'P1',
    circuit: 'VIMEO.GP',
    title: 'Senior Data Analyst',
    company: 'Vimeo.com',
    location: 'Bengaluru',
    period: 'JAN 2022 – PRESENT',
    current: true,
    bullets: [
      ['Eliminated', '90%', '90% of data processing latency by re-engineering legacy ETL into fully automated Snowflake pipelines — accelerating time-to-insight from days to hours'],
      ['Deployed', '10+', '10+ real-time Tableau dashboards with feedback loops, cutting reporting cycles by 25% and eliminating manual overhead across 4 teams'],
      ['Boosted CSAT by', '80%', '80% via deep-dive SQL + Tableau customer journey analysis; identified 3 critical friction points shipped with Product'],
      ['Improved agent efficiency', '15%', '15% and cut operational costs via analytical tooling tracking interaction quality and workforce allocation'],
      ['AI-Native Workflow: Vibe codes SQL pipelines and Python scripts daily using Claude Code (CLI + web); uses ChatGPT & Gemini for automated EDA and LLM sentiment tagging'],
    ],
  },
  {
    pos: 'P2',
    circuit: 'MINDTREE CIRCUIT',
    title: 'Senior Analyst — Digital Marketing Analytics',
    company: 'Mindtree Limited',
    location: 'Bengaluru',
    period: 'AUG 2019 – JAN 2022',
    current: false,
    sub: 'Microsoft Account — Amazon, Nike & Audi',
    bullets: [
      ['Drove', '20%', '20% faster decision-making by architecting 15+ Power BI dashboards transforming Azure Cosmos DB datasets into executive narratives'],
      ['Built Trending Travel Dashboard: weekly-refresh Power BI platform tracking destination trends, keyword performance (YoY/WoW), search volume with data masking'],
      ['Built Consumer Decision Journey Tool mapping user intent across the full funnel; optimized ROAS for Amazon, Nike, and Audi'],
      ['Enhanced database performance by', '30%', '30% by refactoring high-volume SQL queries; cut development rework 15% via structured requirements sessions'],
      ['Query Pathing Tool: search behavior tracker with POI classification — campaign ROI improved', '10%', '10%'],
    ],
  },
  {
    pos: 'P3',
    circuit: 'TRANSCENTRA RACEWAY',
    title: 'Data Analyst',
    company: 'TransCentra',
    location: 'Chennai',
    period: 'MAR 2018 – AUG 2019',
    current: false,
    bullets: [
      ['Executed complex SQL scripts for root cause analysis on software defects'],
      ['Maintained', '99%+', '99%+ SLA resolution rate for critical application incidents'],
      ['Administered server infrastructure ensuring high availability'],
    ],
  },
  {
    pos: 'P4',
    circuit: 'GROUPON INTERNATIONAL',
    title: 'Consultant — Data & Business Analytics',
    company: 'Groupon.com',
    location: 'Chennai',
    period: 'NOV 2016 – DEC 2017',
    current: false,
    bullets: [
      ['Generated data-driven business reports for e-commerce campaign strategies'],
      ['Managed customer support analytics channels for client engagement'],
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience">
      <div className="container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">
            <span className="eyebrow">Race Record</span>
          </div>
          <h2>Career Circuit</h2>
        </motion.div>

        {/* Timeline wrapper */}
        <div style={{ position: 'relative', paddingLeft: '64px' }}>

          {/* ── RACING LINE ── animated from top */}
          <div style={{ position: 'absolute', left: 23, top: 0, bottom: 0, width: 2, zIndex: 0 }}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '100%',
                transformOrigin: 'top',
                background: 'linear-gradient(180deg, var(--accent) 0%, rgba(223,255,0,0.35) 55%, rgba(223,255,0,0.08) 100%)',
              }}
            />
          </div>

          {/* Jobs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.map((job, i) => (
              <motion.div
                key={job.circuit}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative' }}
              >
                {/* ── NODE on the racing line ── */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.5 + i * 0.15 }}
                  style={{
                    position: 'absolute',
                    left: -50,
                    top: '2rem',
                    width: 14, height: 14,
                    borderRadius: '50%',
                    background: job.current ? 'var(--accent)' : 'var(--bg)',
                    border: `2px solid ${job.current ? 'var(--accent)' : 'var(--border-hi)'}`,
                    boxShadow: job.current ? '0 0 14px var(--accent-glow)' : 'none',
                    zIndex: 1,
                  }}
                />

                {/* ── CARD ── */}
                <motion.div
                  className="glass"
                  whileHover={{ borderColor: 'rgba(223,255,0,0.22)' }}
                  style={{ padding: '2rem 2.5rem' }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '1.5rem',
                    flexWrap: 'wrap', gap: '0.75rem',
                  }}>
                    <div>
                      {/* Circuit meta */}
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                          color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em',
                        }}>{job.pos}</span>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                          color: 'var(--text-3)', letterSpacing: '0.2em',
                        }}>{job.circuit}</span>
                        {job.current && (
                          <span className="sector-badge">
                            <span className="pulse" style={{ width: 4, height: 4 }} />
                            ACTIVE SEASON
                          </span>
                        )}
                      </div>
                      {/* Title */}
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem', fontWeight: 700,
                        letterSpacing: '-0.025em', marginBottom: '0.3rem',
                      }}>{job.title}</div>
                      {/* Company */}
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                        color: 'var(--accent)', fontWeight: 500,
                      }}>{job.company} · {job.location}</div>
                      {job.sub && (
                        <div style={{
                          fontSize: '0.76rem', color: 'var(--text-3)',
                          marginTop: '0.2rem', fontFamily: 'var(--font-mono)',
                        }}>{job.sub}</div>
                      )}
                    </div>

                    {/* Period badge */}
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.57rem',
                      color: 'var(--text-3)', letterSpacing: '0.1em',
                      padding: '0.3rem 0.85rem',
                      border: '1px solid var(--border-hi)', borderRadius: 3,
                      background: 'var(--surface-2)', whiteSpace: 'nowrap',
                    }}>{job.period}</span>
                  </div>

                  <div className="divider" style={{ marginBottom: '1.5rem' }} />

                  {/* Bullets */}
                  <ul style={{
                    listStyle: 'none', padding: 0, margin: 0,
                    display: 'flex', flexDirection: 'column', gap: '0.65rem',
                  }}>
                    {job.bullets.map((parts, bi) => (
                      <li
                        key={bi}
                        style={{
                          display: 'flex', alignItems: 'baseline', gap: '0.75rem',
                          fontSize: '0.86rem', color: 'var(--text-2)', lineHeight: 1.65,
                        }}
                      >
                        <span style={{
                          color: 'var(--accent)', fontFamily: 'var(--font-mono)',
                          fontSize: '0.45rem', flexShrink: 0, marginTop: 2,
                        }}>▶</span>
                        <span>
                          {parts.length === 1
                            ? parts[0]
                            : (
                              <>
                                {parts[0]}{' '}
                                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                                  {parts[1]}
                                </span>
                                {parts[2]?.replace(parts[1], '')}
                              </>
                            )
                          }
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
