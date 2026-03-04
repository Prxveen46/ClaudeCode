# Portfolio 3D Website Design
Date: 2026-03-04

## Overview
A minimalist aesthetic 3D portfolio website for Praveen Kumar, Senior Data Analyst with 9+ years of experience. Single self-contained HTML file using Three.js via CDN.

## Approach
Option A — Single-page scroll with Three.js canvas fixed behind all content. Particle data sphere in hero. Subtle particle field persists as background. CSS 3D tilt on card hover.

## Visual Identity
- **Background:** `#080808` (near-black)
- **Text Primary:** `#f0f0f0`
- **Text Secondary:** `#888`
- **Accent:** `#00ffcc` (neon cyan) — used sparingly
- **Font:** Space Grotesk (headings/body) + Space Mono (numbers/labels)
- **Border radius:** 0px (sharp/brutalist)
- **Cards:** `border: 1px solid rgba(255,255,255,0.08)` — no fill, no glass
- **No gradients** except on Three.js sphere glow

## Tech Stack
- Three.js r160 via CDN (particle sphere + background field)
- Pure vanilla JS (no framework)
- Google Fonts: Space Grotesk + Space Mono
- Single HTML file, no build step

## Sections

### 1. Nav (fixed)
- Logo: "PK" in cyan
- Links: About · Experience · Skills · Projects · Education · Contact
- 1px border-bottom, backdrop-blur on scroll

### 2. Hero (100vh)
- **Left:** Role label (cyan uppercase) → "Praveen Kumar" (80px) → tagline → CTA buttons (sharp corners, no fill ghost style)
- **Right:** Three.js interactive particle sphere (~400px), mouse-reactive rotation, subtle cyan glow halo

### 3. About
- 2-col: prose paragraph left, 4 stat boxes right
- Stats: 9+ yrs · 25+ dashboards · 90% efficiency · 80% CSAT
- Stat boxes: flat, sharp border, no fill

### 4. Skills
- 6 rows (not cards), category LEFT + pill tags RIGHT
- Hover: thin 2px cyan left-border accent
- Categories: Data Visualization · Database & Warehousing · Programming · Marketing Analytics · Tools & Platforms · Leadership

### 5. Experience (timeline)
- Thin vertical cyan line left
- 4 jobs: Vimeo (2022–Present) · Mindtree/Microsoft (2019–2022) · TransCentra (2018–2019) · Groupon (2016–2017)
- Metric numbers in cyan

### 6. Projects (3 cards)
- Sharp bordered cards
- Trending Travel Dashboard · Consumer Decision Journey Tool · Query Pathing Tool
- Tech tags below each

### 7. Education + Certs
- 2 degrees (MBA Madras Univ / B.E. Sathyabama Univ)
- 2×2 cert grid: Advanced Data Science (upGrad 2024) · Data Science Bootcamp (upGrad 2023) · Power BI (Pluralsight 2019) · SQL for Data Science (Coursera 2019)

### 8. Contact
- Left: email · phone · LinkedIn · location
- Right: static contact form (name, email, subject, message)

### 9. Footer
- `© 2026 Praveen Kumar · Senior Data Analyst · Bengaluru`

## Personal Info
- **Name:** Praveen Kumar
- **Title:** Senior Data Analyst
- **Location:** Bengaluru, Karnataka 560076
- **Email:** prxveen46@gmail.com
- **Phone:** +91-8883886881
- **LinkedIn:** linkedin.com/in/praveenvr46
- **Open to:** New opportunities

## Three.js Sphere Spec
- ~2000 particles in sphere formation
- Connecting lines between nearby particles
- Mouse parallax: sphere rotates subtly tracking mouse position
- Auto-rotate: slow constant Y-axis rotation
- Color: `#00ffcc` with alpha fade at edges
- Background particle field: sparse ~500 particles floating slowly
