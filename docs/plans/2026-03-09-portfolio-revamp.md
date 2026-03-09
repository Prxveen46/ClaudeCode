# Portfolio Revamp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Revamp portfolio with purple theme, horizontal scroll projects, enhanced scroll animations, and interactive skill cards — inspired by MoncyDev/Portfolio-Website.

**Architecture:** Single-file HTML (`portfolio/index.html`, currently 1600 lines). Pure CSS + vanilla JS. No new dependencies. Three.js r134 via CDN stays.

**Tech Stack:** HTML5, CSS3 (custom properties, transitions, keyframes), vanilla JavaScript (IntersectionObserver), Three.js r134

---

### Task 1: Purple Color System + Font

**Files:**
- Modify: `portfolio/index.html:9` (font link)
- Modify: `portfolio/index.html:16-30` (CSS variables)
- Modify: `portfolio/index.html:62` (section background)
- Modify: `portfolio/index.html:67` (heading font-family)
- Modify: `portfolio/index.html:105-108` (button colors)
- Modify: `portfolio/index.html:120` (glass-card hover)
- Modify: `portfolio/index.html:142` (nav scrolled bg)
- Modify: `portfolio/index.html:210-211` (pulse keyframe)
- Modify: `portfolio/index.html:227` (hero sphere hint glow)
- Modify: `portfolio/index.html:283` (skill-row hover bg)
- Modify: `portfolio/index.html:385-388` (tech-tag border/color)
- Modify: `portfolio/index.html:513` (cert-num color)
- Modify: `portfolio/index.html:562-565` (field-input focus)
- Modify: `portfolio/index.html:574` (footer bg)
- Modify: `portfolio/index.html:624-641` (aurora colors)
- Modify: `portfolio/index.html:688-695` (shimmer gradient)
- Modify: `portfolio/index.html:1330` (Three.js env light)
- Modify: `portfolio/index.html:1350` (Three.js key light)
- Modify: `portfolio/index.html:1363` (Three.js particle color)
- Modify: `portfolio/index.html:1394` (Three.js wireframe color)
- Modify: `portfolio/index.html:1034-1041` (SVG bar fills project 1)
- Modify: `portfolio/index.html:1049,1051` (SVG sparkline project 1)
- Modify: `portfolio/index.html:1097-1101` (SVG bar fills project 2)
- Modify: `portfolio/index.html:1109-1110` (SVG sparkline project 2)
- Modify: `portfolio/index.html:1156-1161` (SVG bar fills project 3)
- Modify: `portfolio/index.html:1167-1170` (SVG sparkline project 3)

**Step 1: Add Geist font to `<head>`**

Replace line 9:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```
With:
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

**Step 2: Replace CSS variables block (lines 16-30)**

Replace the entire `:root { ... }` block with:
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

**Step 3: Update heading font-family (line 67)**

Replace:
```css
font-family: var(--font-sans);
```
With:
```css
font-family: var(--font-heading);
```

**Step 4: Update section background (line 62)**

Replace:
```css
background: rgba(8,8,8,0.75);
```
With:
```css
background: rgba(11,8,12,0.75);
```

**Step 5: Update btn-primary color (line 105)**

Replace:
```css
.btn-primary { background: var(--accent); color: #080808; font-weight: 700; }
```
With:
```css
.btn-primary { background: var(--accent); color: #0b080c; font-weight: 700; }
```

**Step 6: Update glass-card hover (line 120)**

Replace:
```css
.glass-card:hover { border-color: rgba(0,255,204,0.2); }
```
With:
```css
.glass-card:hover { border-color: rgba(194,164,255,0.2); }
```

**Step 7: Update nav scrolled bg (line 142)**

Replace:
```css
background: rgba(8,8,8,0.9);
```
With:
```css
background: rgba(11,8,12,0.9);
```

**Step 8: Update pulse keyframe (lines 210-211)**

Replace:
```css
0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,204,0.5); }
50% { box-shadow: 0 0 0 6px rgba(0,255,204,0); }
```
With:
```css
0%, 100% { box-shadow: 0 0 0 0 rgba(194,164,255,0.5); }
50% { box-shadow: 0 0 0 6px rgba(194,164,255,0); }
```

**Step 9: Update hero sphere hint glow (line 227)**

Replace:
```css
background: radial-gradient(circle, rgba(0,255,204,0.08) 0%, transparent 70%);
```
With:
```css
background: radial-gradient(circle, rgba(194,164,255,0.08) 0%, transparent 70%);
```

**Step 10: Update skill-row hover (line 283)**

Replace:
```css
.skill-row:hover { background: rgba(0,255,204,0.03); }
```
With:
```css
.skill-row:hover { background: rgba(194,164,255,0.03); }
```

**Step 11: Update tech-tag colors (lines 385-388)**

Replace:
```css
border: 1px solid rgba(0,255,204,0.2);
color: rgba(0,255,204,0.65);
```
With:
```css
border: 1px solid rgba(194,164,255,0.2);
color: rgba(194,164,255,0.65);
```

**Step 12: Update cert-num color (line 513)**

Replace:
```css
.cert-num { font-size: 1.5rem; font-weight: 700; color: rgba(0,255,204,0.15); flex-shrink: 0; font-family: var(--font-mono); }
```
With:
```css
.cert-num { font-size: 1.5rem; font-weight: 700; color: rgba(194,164,255,0.15); flex-shrink: 0; font-family: var(--font-mono); }
```

**Step 13: Update field-input focus (lines 563-564)**

Replace:
```css
border-color: var(--accent);
background: rgba(0,255,204,0.03);
```
With:
```css
border-color: var(--accent);
background: rgba(194,164,255,0.03);
```

**Step 14: Update footer bg (line 574)**

Replace:
```css
background: rgba(8,8,8,0.95);
```
With:
```css
background: rgba(11,8,12,0.95);
```

**Step 15: Update aurora blob colors (lines 626, 632, 639)**

Replace `.aura-1` background:
```css
background: rgba(0, 255, 204, 0.05);
```
With:
```css
background: rgba(194, 164, 255, 0.05);
```

Replace `.aura-2` background:
```css
background: rgba(80, 32, 128, 0.04);
```
With:
```css
background: rgba(127, 64, 255, 0.04);
```

Replace `.aura-3` background:
```css
background: rgba(0, 68, 102, 0.03);
```
With:
```css
background: rgba(251, 141, 255, 0.03);
```

**Step 16: Update shimmer gradient (lines 689-694)**

Replace:
```css
#f0f0f0 0%,
#00ffcc 35%,
#f0f0f0 50%,
#00ffcc 65%,
#f0f0f0 100%
```
With:
```css
#eae5ec 0%,
#c2a4ff 35%,
#eae5ec 50%,
#c2a4ff 65%,
#eae5ec 100%
```

**Step 17: Update Three.js colors**

Line 1330 — env light color:
```js
const envLight1 = new THREE.DirectionalLight(0x00ffcc, 0.8);
```
→
```js
const envLight1 = new THREE.DirectionalLight(0xc2a4ff, 0.8);
```

Line 1350 — key light color:
```js
const keyLight = new THREE.DirectionalLight(0x00ffcc, 0.6);
```
→
```js
const keyLight = new THREE.DirectionalLight(0xc2a4ff, 0.6);
```

Line 1363 — particle color:
```js
const bgMat = new THREE.PointsMaterial({ color: 0x00ffcc, size: 0.03, transparent: true, opacity: 0.15 });
```
→
```js
const bgMat = new THREE.PointsMaterial({ color: 0xc2a4ff, size: 0.03, transparent: true, opacity: 0.15 });
```

Line 1394 — wireframe color:
```js
color: 0x00ffcc,
```
→
```js
color: 0xc2a4ff,
```

**Step 18: Update all SVG bar fills and sparkline strokes from cyan to purple**

In ALL three project card mockups, replace every instance of:
- `rgba(0,255,204,...)` bar fills → `rgba(194,164,255,...)`
- `stroke="#00ffcc"` sparklines → `stroke="#c2a4ff"`
- `fill="#00ffcc"` circles → `fill="#c2a4ff"`

**Step 19: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: purple color system overhaul — variables, Three.js, aurora, mockups, Geist font"
```

---

### Task 2: Enhanced Scroll Animations

**Files:**
- Modify: `portfolio/index.html:122-131` (replace old .reveal CSS)
- Modify: `portfolio/index.html:1479-1483` (replace old IntersectionObserver JS)
- Modify: HTML sections to add `data-reveal` and `data-stagger` attributes

**Step 1: Replace the old `.reveal` CSS block (lines 122-131) with new animation system**

Remove:
```css
/* ── REVEAL ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-d1 { transition-delay: 0.1s; }
.reveal-d2 { transition-delay: 0.2s; }
.reveal-d3 { transition-delay: 0.3s; }
```

Replace with:
```css
/* ── REVEAL ANIMATION SYSTEM ── */
[data-reveal] {
  opacity: 0;
  will-change: transform, opacity;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-reveal="up"]    { transform: translateY(40px); }
[data-reveal="down"]  { transform: translateY(-40px); }
[data-reveal="left"]  { transform: translateX(-60px); }
[data-reveal="right"] { transform: translateX(60px); }
[data-reveal="scale"] { transform: scale(0.85); }
[data-reveal].revealed {
  opacity: 1;
  transform: translate(0) scale(1);
}
[data-stagger="1"] { transition-delay: 0.1s; }
[data-stagger="2"] { transition-delay: 0.2s; }
[data-stagger="3"] { transition-delay: 0.3s; }
[data-stagger="4"] { transition-delay: 0.4s; }
[data-stagger="5"] { transition-delay: 0.5s; }
[data-stagger="6"] { transition-delay: 0.6s; }
[data-stagger="7"] { transition-delay: 0.7s; }
[data-stagger="8"] { transition-delay: 0.8s; }

/* Word-by-word reveal */
.word-reveal .word {
  display: inline-block;
  opacity: 0;
  transform: translateY(12px) rotateX(20deg);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.word-reveal.revealed .word {
  opacity: 1;
  transform: translateY(0) rotateX(0);
}

/* Keep old .reveal for backward compat with project card .visible */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

**Step 2: Update HTML — About section (lines 806-838)**

Replace the About section header (lines 808-812):
```html
<div class="reveal">
  <div class="section-line"></div>
  <div class="eyebrow">About</div>
  <h2 class="section-title">Turning Data<br>Into Decisions</h2>
</div>
```
With:
```html
<div>
  <div class="section-line" data-reveal="left"></div>
  <div class="eyebrow" data-reveal="up" data-stagger="1">About</div>
  <h2 class="section-title" data-reveal="up" data-stagger="2">Turning Data<br>Into Decisions</h2>
</div>
```

Replace About layout wrapper (line 813):
```html
<div class="about-layout reveal reveal-d1">
```
With:
```html
<div class="about-layout">
```

Wrap About text paragraphs with `data-reveal`:
- Each `<p>` in `.about-text` gets `data-reveal="up"` with stagger 3, 4, 5
- `.about-stats` gets `data-reveal="right" data-stagger="3"`

**Step 3: Update HTML — Skills section header (lines 844-848)**

Replace:
```html
<div class="reveal">
  <div class="section-line"></div>
  <div class="eyebrow">Skills &amp; Tools</div>
  <h2 class="section-title">Technical Arsenal</h2>
</div>
```
With:
```html
<div>
  <div class="section-line" data-reveal="left"></div>
  <div class="eyebrow" data-reveal="up" data-stagger="1">Skills &amp; Tools</div>
  <h2 class="section-title" data-reveal="up" data-stagger="2">Technical Arsenal</h2>
</div>
```

**Step 4: Update HTML — Experience section (lines 915-919)**

Replace header with `data-reveal` attributes. Each `.job-card` gets `data-reveal="left"` with incrementing stagger.

**Step 5: Update HTML — Education section (lines 1193-1196)**

Replace header + cards with `data-reveal="scale"` and stagger.

**Step 6: Update HTML — Contact section (lines 1251-1254)**

Replace header + layout elements with `data-reveal="up"` and stagger.

**Step 7: Replace old IntersectionObserver JS (lines 1479-1483)**

Remove:
```js
// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
```

Replace with:
```js
// ── ENHANCED SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Keep old observer for project card .visible (bar animations)
const visibleObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); visibleObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => visibleObs.observe(el));

// Word-by-word split for About paragraphs
document.querySelectorAll('.about-text p').forEach(p => {
  const words = p.textContent.trim().split(/\s+/);
  p.innerHTML = words.map((w, i) =>
    `<span class="word" style="transition-delay:${i * 0.03}s">${w}</span>`
  ).join(' ');
  p.classList.add('word-reveal');
  revealObserver.observe(p);
});
```

**Step 8: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: enhanced scroll animations — data-reveal system, stagger, word-by-word"
```

---

### Task 3: Interactive Skill Cards

**Files:**
- Modify: `portfolio/index.html:259-300` (replace skill CSS)
- Modify: `portfolio/index.html:842-910` (replace skills HTML)
- Add JS: skill card interaction handler

**Step 1: Replace skill CSS (lines 259-300) with interactive card styles**

Remove the entire `/* ── SKILLS ── */` block (lines 259-300) and replace with:

```css
/* ── SKILLS ── */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 480px;
}
.skill-card {
  flex: 1;
  min-height: 60px;
  padding: 1.25rem 1.5rem;
  border: 1px dashed var(--border-hover);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  position: relative;
}
.skill-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.skill-card-title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.skill-card-icon { font-size: 1.2rem; }
.skill-card-chevron {
  font-size: 0.7rem;
  color: var(--text-muted);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.skill-card.active .skill-card-chevron { transform: rotate(180deg); }
.skill-card.active {
  flex: 4;
  border-style: solid;
  border-color: var(--accent);
  box-shadow: 0 0 30px var(--accent-dim), inset 0 1px 0 rgba(194,164,255,0.1);
}
.skill-card .skill-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease 0.15s, max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.skill-card.active .skill-pills {
  opacity: 1;
  max-height: 200px;
}
.pill {
  font-size: 0.78rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  border-radius: 4px;
  transition: var(--transition);
  cursor: default;
}
.pill:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

/* Corner accent squares */
.skill-card::before,
.skill-card::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.skill-card::before { top: 8px; left: 8px; }
.skill-card::after { bottom: 8px; right: 8px; }
.skill-card.active::before,
.skill-card.active::after { opacity: 1; }

@media (max-width: 900px) {
  .skills-container { min-height: auto; }
  .skill-card { min-height: auto; }
}
```

**Step 2: Replace skills HTML (lines 842-910)**

Replace the entire `<!-- SKILLS -->` section with:

```html
<!-- SKILLS -->
<section id="skills">
  <div class="container">
    <div>
      <div class="section-line" data-reveal="left"></div>
      <div class="eyebrow" data-reveal="up" data-stagger="1">Skills &amp; Tools</div>
      <h2 class="section-title" data-reveal="up" data-stagger="2">Technical Arsenal</h2>
    </div>
    <div class="skills-container">
      <div class="skill-card" data-reveal="left" data-stagger="3">
        <div class="skill-card-header">
          <span class="skill-card-title"><span class="skill-card-icon">📊</span> Data &amp; Analytics</span>
          <span class="skill-card-chevron">▼</span>
        </div>
        <div class="skill-pills">
          <span class="pill">Tableau</span>
          <span class="pill">Power BI</span>
          <span class="pill">DAX</span>
          <span class="pill">Dashboarding</span>
          <span class="pill">Data Storytelling</span>
          <span class="pill">Customer Segmentation</span>
          <span class="pill">Campaign Optimization</span>
          <span class="pill">Ad Spend Analysis</span>
          <span class="pill">YoY / WoW Trends</span>
        </div>
      </div>
      <div class="skill-card" data-reveal="right" data-stagger="4">
        <div class="skill-card-header">
          <span class="skill-card-title"><span class="skill-card-icon">⚙️</span> Engineering</span>
          <span class="skill-card-chevron">▼</span>
        </div>
        <div class="skill-pills">
          <span class="pill">Python</span>
          <span class="pill">R</span>
          <span class="pill">SQL (Advanced)</span>
          <span class="pill">Snowflake</span>
          <span class="pill">Azure Cosmos DB</span>
          <span class="pill">GCP</span>
          <span class="pill">Data Modeling</span>
          <span class="pill">Scope Language</span>
          <span class="pill">Predictive Analytics</span>
        </div>
      </div>
      <div class="skill-card" data-reveal="left" data-stagger="5">
        <div class="skill-card-header">
          <span class="skill-card-title"><span class="skill-card-icon">🛠</span> Tools &amp; Platforms</span>
          <span class="skill-card-chevron">▼</span>
        </div>
        <div class="skill-pills">
          <span class="pill">Jira</span>
          <span class="pill">Azure DevOps</span>
          <span class="pill">GitHub</span>
          <span class="pill">MS Office</span>
          <span class="pill">Virtual Clusters</span>
        </div>
      </div>
      <div class="skill-card" data-reveal="right" data-stagger="6">
        <div class="skill-card-header">
          <span class="skill-card-title"><span class="skill-card-icon">🎯</span> Leadership</span>
          <span class="skill-card-chevron">▼</span>
        </div>
        <div class="skill-pills">
          <span class="pill">Cross-Functional Teams</span>
          <span class="pill">Stakeholder Management</span>
          <span class="pill">Agile / Scrum</span>
          <span class="pill">Requirements Gathering</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 3: Add skill card JS interaction handler**

Add after the enhanced scroll reveal JS (after the word-by-word split block):

```js
// ── SKILL CARDS ──
(function() {
  const cards = document.querySelectorAll('.skill-card');
  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  function activateCard(card) {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }

  cards.forEach(card => {
    if (isMobile) {
      card.addEventListener('click', () => {
        if (card.classList.contains('active')) {
          card.classList.remove('active');
        } else {
          activateCard(card);
        }
      });
    } else {
      card.addEventListener('mouseenter', () => activateCard(card));
    }
  });
})();
```

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: interactive skill cards — 4 expandable categories with hover/click"
```

---

### Task 4: Horizontal Scroll Projects

**Files:**
- Modify: `portfolio/index.html:356-388` (replace projects CSS)
- Modify: `portfolio/index.html:994-1188` (rewrite projects HTML structure)
- Add JS: horizontal scroll mechanics
- Update responsive CSS

**Step 1: Replace projects CSS (lines 356-388) with horizontal scroll styles**

Keep the existing `.card-mockup` and bar/sparkline animation CSS (lines 390-494) — only replace the `/* ── PROJECTS ── */` block:

```css
/* ── PROJECTS ── */
#projects {
  padding: 0;
  height: 300vh;
  position: relative;
  background: transparent;
}
.projects-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: rgba(11,8,12,0.75);
  padding: 2rem 0;
}
.projects-header {
  padding: 0 2rem;
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
  margin-bottom: 2rem;
}
.projects-track {
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  will-change: transform;
}
.project-card {
  min-width: 75vw;
  max-width: 75vw;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 16px;
  transition: border-color var(--transition), transform 0.3s ease;
}
.project-card:hover {
  border-color: var(--border-hover);
  transform: scale(1.01);
}
.project-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.project-card:hover::after { transform: scaleX(1); }
.project-number {
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 6rem;
  font-weight: 800;
  color: rgba(194,164,255,0.04);
  font-family: var(--font-heading);
  line-height: 1;
  pointer-events: none;
}
.project-card h3 { font-size: 1.15rem; margin-bottom: 0.75rem; line-height: 1.3; }
.project-card p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.75; margin-bottom: 1.25rem; }
.tech-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid rgba(194,164,255,0.2);
  color: rgba(194,164,255,0.65);
  letter-spacing: 0.04em;
  border-radius: 4px;
}

@media (max-width: 768px) {
  #projects {
    height: auto;
    padding: 4rem 0;
  }
  .projects-sticky {
    position: relative;
    height: auto;
    overflow: visible;
  }
  .projects-track {
    flex-direction: column;
    padding: 0;
  }
  .project-card {
    min-width: 100%;
    max-width: 100%;
  }
}
```

**Step 2: Rewrite projects HTML (lines 994-1188)**

Replace the entire `<!-- PROJECTS -->` section. Keep the 3 project cards with their mockup internals intact, but wrap them in the new horizontal scroll structure:

```html
<!-- PROJECTS -->
<section id="projects">
  <div class="projects-sticky">
    <div class="projects-header">
      <div class="section-line" data-reveal="left"></div>
      <div class="eyebrow" data-reveal="up" data-stagger="1">Featured Projects</div>
      <h2 data-reveal="up" data-stagger="2">Tools &amp; Dashboards Built</h2>
    </div>
    <div class="projects-track">
      <!-- Card 1, Card 2, Card 3 — keep existing .project-card contents unchanged -->
      <!-- But wrap each card in the new layout; remove reveal-d1/d2/d3 classes -->
      <!-- Remove .container wrapper and .projects-grid -->
    </div>
  </div>
</section>
```

Each `.project-card` keeps its mockup HTML but:
- Remove `reveal reveal-d1` / `reveal-d2` / `reveal-d3` classes (cards are always visible in horizontal scroll)
- Keep `glass-card` class
- Keep `project-card` class
- The `.project-number` becomes absolutely positioned large watermark text

**Step 3: Add horizontal scroll JS**

Add to the `<script>` section:

```js
// ── HORIZONTAL SCROLL PROJECTS ──
(function() {
  const section = document.getElementById('projects');
  const track = document.querySelector('.projects-track');
  if (!section || !track || window.innerWidth < 769) return;

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;
    if (sectionHeight <= 0) return;
    const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
    const maxTranslate = track.scrollWidth - window.innerWidth + 100;
    track.style.transform = `translateX(${-progress * maxTranslate}px)`;
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Trigger bar animations when cards become visible
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); cardObs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  track.querySelectorAll('.project-card').forEach(c => cardObs.observe(c));
})();
```

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: horizontal scroll projects — pinned section, scroll-driven track"
```

---

### Task 5: Nav Hover Effect + Timeline Enhancement

**Files:**
- Modify: `portfolio/index.html:155-165` (nav link CSS)
- Modify: `portfolio/index.html:302-317` (timeline CSS)
- Modify: `portfolio/index.html:767-774` (nav HTML)

**Step 1: Add nav hover CSS**

Replace nav link styles (lines 155-165):

```css
.nav-links { display: flex; list-style: none; gap: 2.5rem; }
.nav-links a {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}
.nav-links a:hover, .nav-links a.active { color: var(--accent); }
```

With:

```css
.nav-links { display: flex; list-style: none; gap: 2.5rem; }
.nav-links a {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
  height: 1.2em;
  line-height: 1.2em;
}
.nav-links a span { display: block; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease; }
.nav-links a span:last-child { color: var(--accent); position: absolute; top: 100%; }
.nav-links a:hover span:first-child { transform: translateY(-100%); }
.nav-links a:hover span:last-child { transform: translateY(-100%); }
.nav-links a.active span:first-child { color: var(--accent); }
```

**Step 2: Update nav HTML (lines 767-774)**

Replace nav links with double-span structure:

```html
<ul class="nav-links">
  <li><a href="#about"><span>About</span><span>About</span></a></li>
  <li><a href="#experience"><span>Experience</span><span>Experience</span></a></li>
  <li><a href="#skills"><span>Skills</span><span>Skills</span></a></li>
  <li><a href="#projects"><span>Projects</span><span>Projects</span></a></li>
  <li><a href="#education"><span>Education</span><span>Education</span></a></li>
  <li><a href="#contact"><span>Contact</span><span>Contact</span></a></li>
</ul>
```

**Step 3: Enhance timeline CSS (lines 302-317)**

Replace the timeline line and dot styles:

```css
/* ── TIMELINE ── */
.timeline { position: relative; padding-left: 2rem; }
.tl-line {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-deep), var(--accent), var(--accent-secondary));
  background-size: 2px 200%;
  animation: tlGradient 8s ease-in-out infinite alternate;
}
@keyframes tlGradient {
  from { background-position: 0 0%; }
  to { background-position: 0 100%; }
}
.tl-line::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: -5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow);
  animation: tlPulse 2s ease-in-out infinite;
}
@keyframes tlPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}
.job-card { position: relative; padding: 2rem; margin-bottom: 1.5rem; }
.tl-dot {
  position: absolute;
  left: -2.42rem; top: 2.1rem;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(194,164,255,0.15), 0 0 12px var(--accent-glow);
}
```

**Step 4: Update experience job cards with data-reveal attributes**

Each `.job-card` gets `data-reveal="left"` and incrementing `data-stagger`.

**Step 5: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: nav text-slide hover effect + animated gradient timeline"
```

---

### Task 6: Final Visual Tuning + Push

**Step 1: Restart preview server and take screenshot**

Verify visual quality across all sections.

**Step 2: Check for any remaining cyan references**

Search the file for `00ffcc`, `0,255,204`, and `#00ffcc`. Fix any stragglers.

**Step 3: Test responsive at mobile width**

Verify skill cards, horizontal scroll fallback, and animations work on narrow viewports.

**Step 4: Push to GitHub**

```bash
git push portfolio main
```

**Step 5: Commit any final tweaks**

If visual tuning reveals issues, fix and commit before pushing.
