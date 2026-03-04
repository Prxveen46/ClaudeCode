# Dashboard Mockups Design
Date: 2026-03-04

## Overview
Add animated CSS/SVG dashboard mockup panels inside each of the 3 project cards in `portfolio/index.html`. Each mockup sits above the project number and title, showing a mini dashboard preview relevant to that project.

## Approach
Pure CSS + inline SVG. Zero new dependencies. Scroll-triggered animations using the existing IntersectionObserver. Each mockup has a fake OS window chrome header, 2–3 KPI tiles, an SVG bar chart, and an SVG sparkline.

## Panel Structure

```
┌─ ● ● ●  [Project Name] ──────────────┐
│  [ KPI 1 ]  [ KPI 2 ]  [ KPI 3 ]     │
│  [SVG bar chart]  [SVG sparkline]     │
└───────────────────────────────────────┘
```

### Window Chrome
- 3 small circle dots (red/yellow/green decorative)
- Project tool name in mono text (e.g. "powerbi · analytics")
- 1px bottom border separator

### KPI Row
- 2–3 bordered boxes, each with a large number + label
- Number: white, font-mono, large
- Label: muted text, font-mono, small caps
- Delta arrow (↑↓) in cyan for positive metrics

### Chart Area
- Left 60%: SVG bar chart — 6–8 `<rect>` bars animating up with CSS `scaleY` keyframes
- Right 40%: SVG sparkline — `<polyline>` drawing itself via `stroke-dashoffset` animation
- Both animate when card scrolls into view (`.visible` class trigger)

### Colors
- Panel background: `#0a0a0a`
- Bar fill: `rgba(0, 255, 204, 0.55)` with `rgba(0,255,204,0.2)` for alternating bars
- Sparkline stroke: `#00ffcc`
- KPI number: `#f0f0f0`
- Grid lines: `rgba(255,255,255,0.04)`

## Per-Project Mockup Data

### Card 01 — Trending Travel Dashboard
- **Tool label**: `powerbi · azure cosmos`
- **KPIs**: `+18% YoY` | `+7% WoW` | `2.4M Searches`
- **Bar chart**: Monthly keyword search volume (8 bars, Jan–Aug)
  - Heights: [40, 55, 48, 70, 85, 62, 90, 78] (%)
- **Sparkline**: Click index trend (rising with slight dip)
  - Points: 20,25,22,35,40,38,55,60,58,72

### Card 02 — Consumer Decision Journey Tool
- **Tool label**: `powerbi · python · sql`
- **KPIs**: `3.2x Funnel` | `+10% ROI` | `15+ Dashboards`
- **Bar chart**: Funnel stage conversion (5 bars: Awareness→Purchase)
  - Heights: [100, 72, 48, 30, 18] (%) — funnel shape
- **Sparkline**: User intent score over time (gradual rise)
  - Points: 10,15,18,22,28,35,42,48,55,62

### Card 03 — Query Pathing Tool
- **Tool label**: `sql · azure · geo-analytics`
- **KPIs**: `+30% DB Perf` | `99%+ SLA` | `+10% ROI`
- **Bar chart**: Query resolution time by region (6 bars)
  - Heights: [85, 60, 75, 50, 90, 65] (%) — varied by region
- **Sparkline**: SLA compliance trend (high and stable)
  - Points: 88,90,89,92,94,93,96,97,95,99

## Animation Spec
- Bar animation: CSS `@keyframes growUp` — `transform: scaleY(0)` → `scaleY(1)`, 0.6s ease, staggered delays per bar (0.05s each)
- Sparkline animation: CSS `stroke-dashoffset` from full length to 0, 1s ease, 0.3s delay after bars start
- Trigger: add class `.mock-animate` when parent `.project-card` gets `.visible` from IntersectionObserver
- Transform origin: `bottom` for bars (grow upward)

## CSS Additions
New classes: `.card-mockup`, `.mock-chrome`, `.mock-chrome-dots`, `.mock-chrome-label`, `.mock-kpis`, `.mock-kpi`, `.mock-kpi-value`, `.mock-kpi-label`, `.mock-charts`, `.mock-bars`, `.mock-sparkline`

## Files Modified
- `portfolio/index.html` — CSS block, HTML (3 project cards), JS (animate trigger)
