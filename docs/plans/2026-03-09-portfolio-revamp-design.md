# Portfolio Revamp Design — Purple Theme + MoncyDev Patterns

**Date:** 2026-03-09
**Reference:** https://github.com/MoncyDev/Portfolio-Website
**Architecture:** Single-file HTML (no React migration). Pure CSS + vanilla JS.

---

## Approved Features

1. **Purple color system** — full theme shift from cyan to purple
2. **Horizontal scroll projects** — pinned section, horizontal card track
3. **Enhanced scroll animations** — dramatic staggered reveals, directional slides
4. **Interactive skill cards** — consolidated 6 → 4 categories, expandable on hover/click
5. **Supporting changes** — font, aurora, progress bar, nav hover, timeline

---

## 1. Color System Overhaul

### CSS Variables

```css
:root {
  --bg: #0b080c;
  --bg-card: #110e14;
  --text-primary: #eae5ec;
  --text-secondary: #adacac;
  --text-muted: #555;
  --accent: #c2a4ff;
  --accent-dim: rgba(194, 164, 255, 0.12);
  --accent-glow: rgba(194, 164, 255, 0.3);
  --accent-secondary: #fb8dff;
  --accent-deep: #7f40ff;
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(194, 164, 255, 0.4);
  --font-heading: 'Geist', 'Space Grotesk', sans-serif;
  --font-sans: 'Space Grotesk', sans-serif;
  --font-mono: 'Space Mono', monospace;
  --max-w: 1100px;
  --transition: 0.25s ease;
}
```

### Three.js Updates

- Wireframe: `0xc2a4ff` (purple)
- Key light: `0xc2a4ff` (purple)
- Glass tint: `0x1a1a2e` (keep — works with both themes)
- Background particles: `0xc2a4ff`

### Aurora Updates

- Blob 1: `#c2a4ff` (purple)
- Blob 2: `#7f40ff` (deep purple)
- Blob 3: `#fb8dff` (pink)

### Hero Text

- "Praveen" → white
- "Kumar." → `#c2a4ff` (purple accent)

---

## 2. Enhanced Scroll Animations

### Animation System

Pure CSS keyframes triggered by IntersectionObserver. No GSAP dependency.

### CSS Classes

```css
/* Base hidden state */
[data-reveal] {
  opacity: 0;
  will-change: transform, opacity;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Direction variants */
[data-reveal="up"]    { transform: translateY(40px); }
[data-reveal="left"]  { transform: translateX(-60px); }
[data-reveal="right"] { transform: translateX(60px); }
[data-reveal="scale"] { transform: scale(0.85); }

/* Revealed state */
[data-reveal].revealed {
  opacity: 1;
  transform: translate(0) scale(1);
}

/* Stagger delays via data attribute */
[data-stagger="1"] { transition-delay: 0.1s; }
[data-stagger="2"] { transition-delay: 0.2s; }
[data-stagger="3"] { transition-delay: 0.3s; }
[data-stagger="4"] { transition-delay: 0.4s; }
[data-stagger="5"] { transition-delay: 0.5s; }
```

### Word-by-Word Reveal

For About section paragraph: JS splits text into `<span>` words, each gets incrementing `data-stagger`. IntersectionObserver adds `.revealed` to parent.

### Section Mapping

| Section | Elements | Effect |
|---------|----------|--------|
| Hero | Keep kinetic typography | Already dramatic |
| About | Paragraph words | Word-by-word reveal |
| Skills | 4 skill cards | Stagger left/right alternating |
| Experience | Timeline entries | Slide from left with stagger |
| Projects | Section title only | Reveal up, then horizontal scroll |
| Education | Degree + cert cards | Scale in with stagger |
| Contact | Form fields + info | Stagger up from bottom |

### JS Observer

```js
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
```

---

## 3. Interactive Skill Cards

### Category Consolidation (6 → 4)

| Category | Icon | Skills |
|----------|------|--------|
| **Data & Analytics** | 📊 | Tableau, Power BI, DAX, Dashboarding, Data Storytelling, Customer Segmentation, Campaign Optimization, Ad Spend Analysis, YoY/WoW Trends |
| **Engineering** | ⚙️ | Python, R, SQL (Advanced), Snowflake, Azure Cosmos DB, GCP, Data Modeling, Scope Language, Predictive Analytics |
| **Tools & Platforms** | 🛠 | Jira, Azure DevOps, GitHub, MS Office, Virtual Clusters |
| **Leadership** | 🎯 | Cross-Functional Teams, Stakeholder Management, Agile/Scrum, Requirements Gathering |

### Layout & Behavior

**Container:** Flex column, total height ~500px on desktop.

**Default State:**
- All 4 cards at 25% height
- Shows category name + chevron icon
- Dashed border (purple accent), rounded corners
- Subtle purple glow on border

**Hover/Active State (desktop: hover, mobile: click):**
- Active card expands to ~55%
- Other cards shrink to ~15%
- Expanded card reveals skill pills with stagger fade-in (50ms per pill)
- Chevron rotates 180deg
- Border becomes solid, glow intensifies

**CSS:**
```css
.skill-card {
  flex: 1;
  min-height: 60px;
  transition: flex 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px dashed var(--border-hover);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}
.skill-card.active {
  flex: 4;
  border-style: solid;
  box-shadow: 0 0 30px var(--accent-dim);
}
.skill-card .pills {
  opacity: 0;
  transition: opacity 0.3s ease 0.2s;
}
.skill-card.active .pills {
  opacity: 1;
}
```

**Mobile (< 768px):** Stack vertically, tap to toggle. Only one card open at a time.

---

## 4. Horizontal Scroll Projects

### Architecture

```
<section id="projects" style="height: 300vh; position: relative;">
  <div class="projects-sticky" style="position: sticky; top: 0; height: 100vh; overflow: hidden;">
    <div class="container">
      <h2>Featured Projects</h2>
    </div>
    <div class="projects-track" style="display: flex; gap: 2rem; transition: transform 0.1s linear;">
      <!-- Cards here -->
    </div>
  </div>
</section>
```

### Scroll Mechanics (vanilla JS)

```js
const projectsSection = document.getElementById('projects');
const track = document.querySelector('.projects-track');
const cards = track.children;

function updateHorizontalScroll() {
  const rect = projectsSection.getBoundingClientRect();
  const sectionHeight = projectsSection.offsetHeight - window.innerHeight;
  const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
  const maxTranslate = track.scrollWidth - window.innerWidth + 100;
  track.style.transform = `translateX(${-scrollProgress * maxTranslate}px)`;
}

window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
```

### Card Design

Each card: `min-width: 75vw` on desktop, `min-width: 90vw` on mobile.

```
┌─────────────────────────────────────────────┐
│  01                                         │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │     Dashboard Mockup / Image        │   │
│  │         (60% of card)               │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Trending Travel Dashboard                  │
│  Data Visualization · Analytics             │
│                                             │
│  [Power BI] [DAX] [Azure] [Scope]          │
└─────────────────────────────────────────────┘
```

- Background: `var(--bg-card)` with `border: 1px solid var(--border)`
- Hover: `border-color: var(--border-hover)`, subtle scale 1.02
- Project number: Large faded text (opacity 0.06), font-size 8rem
- Dashboard mockup: Existing CSS mockups (chrome bar, charts, KPIs)

### Mobile Fallback (< 768px)

Disable horizontal scroll. Cards stack vertically with normal scroll. Remove sticky positioning.

---

## 5. Supporting Changes

### Font Addition

Add Geist font from Google Fonts for headings:
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- `h1, h2, h3, h4` use `var(--font-heading)` → Geist
- Body text stays Space Grotesk
- Labels/mono stays Space Mono

### Nav Hover Effect (MoncyDev-style text slide)

Each nav link wraps text in two `<span>` stacked:
```html
<a href="#about" class="nav-link">
  <span class="nav-text">About</span>
  <span class="nav-text nav-text--hover">About</span>
</a>
```

CSS: On hover, first span slides up and fades, second span slides up from below. `overflow: hidden` on link. Color transitions to `var(--accent)`.

### Experience Timeline Enhancement

- Replace simple left border with animated gradient line:
  - `linear-gradient(to bottom, var(--accent-deep), var(--accent), var(--accent-secondary))`
  - `background-size: 2px 200%` with `@keyframes` scroll animation
- Add glowing dot at timeline bottom:
  - `width: 12px; height: 12px; border-radius: 50%; background: var(--accent);`
  - `box-shadow: 0 0 20px var(--accent-glow);`
  - Pulsing `@keyframes` animation (scale 1 → 1.3 → 1, opacity 1 → 0.6 → 1)
- Each timeline dot: 8px circle with purple fill + glow

### Progress Bar

Change `background: var(--accent)` — automatically uses new purple.

### Section Backgrounds

Update `section` background from `rgba(8,8,8,0.75)` to `rgba(11,8,12,0.75)` to match new `--bg`.

---

## 6. Scope Summary

| Change | Impact | Risk |
|--------|--------|------|
| CSS variables (color system) | Global | Low — single point of change |
| Font addition (Geist) | Global headings | Low |
| Scroll animation system | All sections | Medium — new JS observer + CSS |
| Interactive skill cards | Skills section rewrite | Medium |
| Horizontal scroll projects | Projects section rewrite | High — new layout paradigm |
| Three.js color updates | 3D scene | Low — color values only |
| Aurora color updates | Aurora blobs | Low |
| Nav hover effect | Nav only | Low |
| Timeline enhancement | Experience section | Low-Medium |
| Progress bar | Scroll bar | Low — inherits --accent |

**No new JS dependencies.** All animations pure CSS + IntersectionObserver.
**Three.js stays at r134 via CDN.** Only color values change.
