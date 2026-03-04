# 3D Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single self-contained HTML file — minimalist dark 3D portfolio for Praveen Kumar, Senior Data Analyst, with a Three.js interactive particle sphere hero, neon cyan accents, and sharp brutalist-minimal card design.

**Architecture:** Single `index.html` file with all CSS inline in `<style>` and all JS inline in `<script>`. Three.js loaded via CDN. Fixed canvas behind scroll content. No build step — open directly in browser.

**Tech Stack:** Three.js r160 (CDN), Google Fonts (Space Grotesk + Space Mono), vanilla JS, pure CSS. Output file: `/Users/praveenkumar/ClaudeCode/portfolio/index.html`

---

### Task 1: Project scaffold and base HTML structure

**Files:**
- Create: `portfolio/index.html`

**Step 1: Create the directory and file with base HTML skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Praveen Kumar | Senior Data Analyst</title>
  <meta name="description" content="Senior Data Analyst with 9+ years — Marketing Analytics, BI, SQL, Snowflake, Tableau, Power BI, Python.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <style>
    /* CSS goes here */
  </style>
</head>
<body>
  <!-- canvas injected by JS -->
  <!-- sections go here -->
  <script>
    // JS goes here
  </script>
</body>
</html>
```

**Step 2: Verify**

Open `portfolio/index.html` in browser. Should show blank dark page with no console errors. Check DevTools → Network tab confirms Google Fonts and Three.js loaded (200 status).

**Step 3: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: scaffold portfolio html with CDN dependencies"
```

---

### Task 2: CSS foundation — reset, variables, typography, layout

**Files:**
- Modify: `portfolio/index.html` — fill the `<style>` block

**Step 1: Write the complete CSS foundation**

Replace `/* CSS goes here */` with:

```css
/* ── RESET ── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* ── VARIABLES ── */
:root {
  --bg: #080808;
  --bg-card: #0f0f0f;
  --text-primary: #f0f0f0;
  --text-secondary: #888;
  --text-muted: #444;
  --accent: #00ffcc;
  --accent-dim: rgba(0, 255, 204, 0.15);
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(0, 255, 204, 0.4);
  --font-sans: 'Space Grotesk', sans-serif;
  --font-mono: 'Space Mono', monospace;
  --max-w: 1100px;
  --transition: 0.25s ease;
}

/* ── BASE ── */
html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

/* ── CANVAS (Three.js, fixed behind everything) ── */
#bg-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ── LAYOUT ── */
.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 2rem;
}

section {
  position: relative;
  z-index: 1;
  padding: 6rem 0;
}

/* ── TYPOGRAPHY ── */
h1, h2, h3, h4 {
  font-family: var(--font-sans);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

h1 { font-size: clamp(3rem, 7vw, 5.5rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: 1.15rem; }

.mono { font-family: var(--font-mono); }
.accent { color: var(--accent); }

.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
}

.section-title {
  margin-bottom: 3.5rem;
}

/* ── BUTTONS ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  transition: var(--transition);
}

.btn-primary {
  background: var(--accent);
  color: #080808;
  font-weight: 700;
}
.btn-primary:hover { background: #fff; }

.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ── DIVIDER ── */
.section-line {
  width: 40px;
  height: 2px;
  background: var(--accent);
  margin-bottom: 1.5rem;
}

/* ── REVEAL ANIMATION ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-d1 { transition-delay: 0.1s; }
.reveal-d2 { transition-delay: 0.2s; }
.reveal-d3 { transition-delay: 0.3s; }
```

**Step 2: Verify**

Refresh browser. Body should be `#080808`. Text should use Space Grotesk font (check in DevTools → Computed → font-family).

**Step 3: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add CSS foundation — variables, typography, layout"
```

---

### Task 3: Three.js — background canvas + particle sphere

**Files:**
- Modify: `portfolio/index.html` — JS section

**Step 1: Add the canvas element to body (before sections)**

```html
<canvas id="bg-canvas"></canvas>
```

**Step 2: Write the Three.js scene in the `<script>` block**

```javascript
// ── THREE.JS SCENE ──
(function() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // ── BACKGROUND PARTICLE FIELD (sparse) ──
  const bgGeo = new THREE.BufferGeometry();
  const bgCount = 600;
  const bgPos = new Float32Array(bgCount * 3);
  for (let i = 0; i < bgCount * 3; i++) {
    bgPos[i] = (Math.random() - 0.5) * 40;
  }
  bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
  const bgMat = new THREE.PointsMaterial({
    color: 0x00ffcc,
    size: 0.04,
    transparent: true,
    opacity: 0.25,
  });
  scene.add(new THREE.Points(bgGeo, bgMat));

  // ── SPHERE PARTICLES ──
  const sphereGroup = new THREE.Group();
  scene.add(sphereGroup);

  const sGeo = new THREE.BufferGeometry();
  const sCount = 2000;
  const sPos = new Float32Array(sCount * 3);
  const radius = 1.8;

  for (let i = 0; i < sCount; i++) {
    // Fibonacci sphere distribution
    const phi = Math.acos(1 - 2 * (i + 0.5) / sCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    sPos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    sPos[i * 3 + 1] = radius * Math.cos(phi);
    sPos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  const sMat = new THREE.PointsMaterial({
    color: 0x00ffcc,
    size: 0.025,
    transparent: true,
    opacity: 0.85,
  });
  const spherePoints = new THREE.Points(sGeo, sMat);
  sphereGroup.add(spherePoints);

  // ── CONNECTING LINES (sample subset) ──
  const linePositions = [];
  const positions = sGeo.attributes.position.array;
  const threshold = 0.55; // connect nearby particles

  for (let i = 0; i < sCount; i++) {
    const ax = positions[i*3], ay = positions[i*3+1], az = positions[i*3+2];
    for (let j = i + 1; j < sCount; j++) {
      if (Math.random() > 0.015) continue; // sample only ~1.5%
      const bx = positions[j*3], by = positions[j*3+1], bz = positions[j*3+2];
      const dist = Math.sqrt((ax-bx)**2 + (ay-by)**2 + (az-bz)**2);
      if (dist < threshold) {
        linePositions.push(ax, ay, az, bx, by, bz);
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.15 });
  sphereGroup.add(new THREE.LineSegments(lineGeo, lineMat));

  // Position sphere to right of center (aligns with hero layout)
  sphereGroup.position.set(2.2, 0, 0);

  // ── MOUSE TRACKING ──
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── RESIZE ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── ANIMATE ──
  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Auto-rotate + mouse tilt
    sphereGroup.rotation.y = frame * 0.003 + targetX * 0.4;
    sphereGroup.rotation.x = targetY * 0.25;

    // Slow drift for bg field
    bgMat.opacity = 0.2 + Math.sin(frame * 0.005) * 0.05;

    renderer.render(scene, camera);
  }
  animate();
})();
```

**Step 3: Verify**

Open browser. Should see glowing cyan particle sphere on right side of dark canvas. Move mouse — sphere should tilt. No console errors.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add Three.js particle sphere + background field"
```

---

### Task 4: Navigation bar

**Files:**
- Modify: `portfolio/index.html` — add nav HTML + CSS

**Step 1: Add nav HTML (after canvas, before sections)**

```html
<nav id="nav">
  <div class="container nav-inner">
    <a href="#" class="nav-logo">PK</a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#education">Education</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>
```

**Step 2: Add nav CSS**

```css
/* ── NAV ── */
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: background 0.3s ease, border-bottom 0.3s ease;
}
#nav.scrolled {
  background: rgba(8,8,8,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 0.1em;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
}
.nav-links a {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}
.nav-links a:hover { color: var(--text-primary); }
.nav-links a.active { color: var(--accent); }
```

**Step 3: Add nav scroll JS**

```javascript
// Nav scroll behavior
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});
```

**Step 4: Verify**

Page shows "PK" logo and nav links. Scroll down — nav gets frosted glass background. Active link highlights in cyan.

**Step 5: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add fixed nav with scroll behavior and active states"
```

---

### Task 5: Hero section

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add hero HTML**

```html
<section class="hero" id="hero">
  <div class="container hero-inner">
    <div class="hero-text">
      <div class="eyebrow">Senior Data Analyst</div>
      <h1>Praveen<br><span class="name-line">Kumar.</span></h1>
      <p class="hero-desc">
        9+ years transforming complex datasets into business strategy —
        Marketing Analytics, BI, and enterprise insights for
        <span class="accent">Microsoft, Amazon, Nike &amp; Audi.</span>
      </p>
      <div class="hero-meta">
        <span class="mono" style="font-size:0.75rem; color:var(--text-muted);">📍 Bengaluru</span>
        <span class="hero-dot"></span>
        <span class="available-badge">
          <span class="pulse"></span>Open to opportunities
        </span>
      </div>
      <div class="hero-actions">
        <a href="#contact" class="btn btn-primary">Get In Touch</a>
        <a href="#experience" class="btn btn-ghost">View Experience</a>
      </div>
    </div>
    <!-- Three.js sphere renders in this space via canvas -->
  </div>
</section>
```

**Step 2: Add hero CSS**

```css
/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 6rem;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}
.hero-text { max-width: 560px; }

h1 .name-line { color: var(--accent); }

.hero-desc {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 1.5rem 0 1.25rem;
  max-width: 460px;
}
.hero-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.hero-dot {
  width: 3px; height: 3px;
  background: var(--text-muted);
  border-radius: 50%;
}
.available-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: var(--accent);
}
.pulse {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,204,0.5); }
  50% { box-shadow: 0 0 0 6px rgba(0,255,204,0); }
}
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
```

**Step 3: Verify**

Hero fills viewport. Text on left, sphere on right (rendered behind by canvas). "Praveen Kumar." heading visible in large white/cyan type. Pulse dot animating.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add hero section with text layout and CTA buttons"
```

---

### Task 6: About section

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add about HTML**

```html
<section id="about">
  <div class="container">
    <div class="reveal">
      <div class="section-line"></div>
      <div class="eyebrow">About</div>
      <h2 class="section-title">Turning Data<br>Into Decisions</h2>
    </div>
    <div class="about-layout reveal reveal-d1">
      <div class="about-text">
        <p>I'm a results-driven Senior Data Analyst based in <strong>Bengaluru</strong> with 9+ years spanning Marketing Analytics, Business Intelligence, and Information Technology.</p>
        <p>Specializing in <strong>SQL, Snowflake, Tableau, Power BI, and Python</strong> — with deep expertise in digital marketing analytics, customer segmentation, behavior modeling, and campaign optimization.</p>
        <p>Across enterprise clients like <strong>Microsoft, Amazon, Nike, and Audi</strong>, I've engineered automated data pipelines, built interactive dashboards, and delivered insights that drive measurable revenue growth.</p>
      </div>
      <div class="about-stats">
        <div class="stat-box">
          <div class="stat-num">9<span>+</span></div>
          <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">25<span>+</span></div>
          <div class="stat-label">Dashboards Built</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">90<span>%</span></div>
          <div class="stat-label">Pipeline Efficiency</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">80<span>%</span></div>
          <div class="stat-label">CSAT Improvement</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add about CSS**

```css
/* ── ABOUT ── */
.about-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 5rem;
  align-items: start;
}
.about-text p {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.9;
  margin-bottom: 1.25rem;
}
.about-text strong { color: var(--text-primary); }
.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border: 1px solid var(--border);
}
.stat-box {
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
.stat-num {
  font-family: var(--font-mono);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 0.4rem;
}
.stat-num span { color: var(--accent); font-size: 1.4rem; }
.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: var(--font-mono);
}
```

**Step 3: Verify**

About section renders 2-column layout with 4 stat boxes in a 2×2 grid with sharp borders. Numbers display in mono font.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add about section with stat boxes"
```

---

### Task 7: Skills section

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add skills HTML**

```html
<section id="skills">
  <div class="container">
    <div class="reveal">
      <div class="section-line"></div>
      <div class="eyebrow">Skills &amp; Tools</div>
      <h2 class="section-title">Technical Arsenal</h2>
    </div>
    <div class="skills-list reveal reveal-d1">

      <div class="skill-row">
        <div class="skill-cat">Data Visualization</div>
        <div class="skill-pills">
          <span class="pill">Tableau</span>
          <span class="pill">Power BI</span>
          <span class="pill">DAX</span>
          <span class="pill">Dashboarding</span>
          <span class="pill">Data Storytelling</span>
        </div>
      </div>

      <div class="skill-row">
        <div class="skill-cat">Database &amp; Warehousing</div>
        <div class="skill-pills">
          <span class="pill">SQL (Advanced)</span>
          <span class="pill">Snowflake</span>
          <span class="pill">Azure Cosmos DB</span>
          <span class="pill">GCP</span>
          <span class="pill">Data Modeling</span>
        </div>
      </div>

      <div class="skill-row">
        <div class="skill-cat">Programming</div>
        <div class="skill-pills">
          <span class="pill">Python</span>
          <span class="pill">R</span>
          <span class="pill">Scope Language</span>
          <span class="pill">Predictive Analytics</span>
          <span class="pill">Data Mining</span>
        </div>
      </div>

      <div class="skill-row">
        <div class="skill-cat">Marketing Analytics</div>
        <div class="skill-pills">
          <span class="pill">Customer Segmentation</span>
          <span class="pill">Campaign Optimization</span>
          <span class="pill">Ad Spend Analysis</span>
          <span class="pill">YoY / WoW Trends</span>
        </div>
      </div>

      <div class="skill-row">
        <div class="skill-cat">Tools &amp; Platforms</div>
        <div class="skill-pills">
          <span class="pill">Jira</span>
          <span class="pill">Azure DevOps</span>
          <span class="pill">GitHub</span>
          <span class="pill">MS Office</span>
          <span class="pill">Virtual Clusters</span>
        </div>
      </div>

      <div class="skill-row">
        <div class="skill-cat">Leadership</div>
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

**Step 2: Add skills CSS**

```css
/* ── SKILLS ── */
.skills-list { display: flex; flex-direction: column; gap: 0; }

.skill-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  align-items: center;
  gap: 2rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
  border-top: none;
  transition: var(--transition);
  position: relative;
}
.skill-row:first-child { border-top: 1px solid var(--border); }
.skill-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--accent);
  transform: scaleY(0);
  transition: transform var(--transition);
}
.skill-row:hover::before { transform: scaleY(1); }
.skill-row:hover { background: rgba(0,255,204,0.03); }

.skill-cat {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.skill-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.pill {
  font-size: 0.78rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: var(--transition);
  cursor: default;
}
.pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
}
```

**Step 3: Verify**

6 skill rows render as a table-like list with sharp borders. Hover shows cyan left-border accent. Pills highlight on hover.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add skills section with row layout and pill tags"
```

---

### Task 8: Experience timeline section

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add experience HTML**

```html
<section id="experience">
  <div class="container">
    <div class="reveal">
      <div class="section-line"></div>
      <div class="eyebrow">Experience</div>
      <h2 class="section-title">Career Journey</h2>
    </div>
    <div class="timeline">
      <div class="tl-line"></div>

      <div class="job-card reveal glass-card">
        <div class="tl-dot"></div>
        <div class="job-header">
          <div>
            <div class="job-title">Senior Data Analyst</div>
            <div class="job-company">Vimeo.com — Bengaluru</div>
          </div>
          <span class="job-period">Jan 2022 – Present</span>
        </div>
        <ul class="job-bullets">
          <li>Engineered automated data pipelines in Snowflake, reducing processing time by <span class="metric">90%</span></li>
          <li>Designed <span class="metric">10+</span> interactive Tableau dashboards, improving decision-making speed by <span class="metric">25%</span></li>
          <li>Conducted customer journey analysis driving <span class="metric">80%</span> CSAT improvement</li>
          <li>Achieved <span class="metric">15%</span> improvement in agent efficiency through performance analytics</li>
          <li>Reduced response times by <span class="metric">10%</span> and operational costs by <span class="metric">15%</span></li>
        </ul>
      </div>

      <div class="job-card reveal glass-card">
        <div class="tl-dot"></div>
        <div class="job-header">
          <div>
            <div class="job-title">Senior Analyst — Digital Marketing Analytics</div>
            <div class="job-company">Mindtree Limited (Microsoft Project) — Bengaluru</div>
          </div>
          <span class="job-period">Aug 2019 – Jan 2022</span>
        </div>
        <ul class="job-bullets">
          <li>Key analyst on Microsoft's Digital Marketing Analytics for Amazon, Nike, and Audi</li>
          <li>Built <span class="metric">15+</span> Power BI dashboards improving strategic decisions by <span class="metric">20%</span></li>
          <li>Created Trending Travel Dashboard, Consumer Decision Journey Tool &amp; Query Pathing Tool</li>
          <li>Improved ROI by <span class="metric">10%</span> through ad targeting optimization</li>
          <li>Enhanced database performance by <span class="metric">30%</span> via SQL query optimization</li>
        </ul>
      </div>

      <div class="job-card reveal glass-card">
        <div class="tl-dot"></div>
        <div class="job-header">
          <div>
            <div class="job-title">Data Analyst</div>
            <div class="job-company">TransCentra — Chennai</div>
          </div>
          <span class="job-period">Mar 2018 – Aug 2019</span>
        </div>
        <ul class="job-bullets">
          <li>Executed complex SQL scripts for root cause analysis on software defects</li>
          <li>Maintained <span class="metric">99%+</span> SLA resolution rate for critical application incidents</li>
          <li>Administered server infrastructure ensuring high availability</li>
        </ul>
      </div>

      <div class="job-card reveal glass-card">
        <div class="tl-dot"></div>
        <div class="job-header">
          <div>
            <div class="job-title">Consultant — Data &amp; Business Analytics</div>
            <div class="job-company">Groupon.com — Chennai</div>
          </div>
          <span class="job-period">Nov 2016 – Dec 2017</span>
        </div>
        <ul class="job-bullets">
          <li>Generated data-driven business reports for e-commerce campaign strategies</li>
          <li>Managed customer support analytics channels for client engagement</li>
        </ul>
      </div>

    </div>
  </div>
</section>
```

**Step 2: Add timeline + glass-card CSS**

```css
/* ── GLASS CARD (used for experience) ── */
.glass-card {
  background: rgba(15,15,15,0.6);
  border: 1px solid var(--border);
  backdrop-filter: blur(8px);
  transition: border-color var(--transition);
}
.glass-card:hover { border-color: rgba(0,255,204,0.2); }

/* ── TIMELINE ── */
.timeline { position: relative; padding-left: 2rem; }
.tl-line {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--accent), rgba(0,255,204,0.05));
}
.job-card {
  position: relative;
  padding: 2rem;
  margin-bottom: 1.5rem;
}
.tl-dot {
  position: absolute;
  left: -2.42rem; top: 2.1rem;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(0,255,204,0.2), 0 0 12px rgba(0,255,204,0.3);
}
.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.job-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}
.job-company {
  font-size: 0.82rem;
  color: var(--accent);
  font-family: var(--font-mono);
}
.job-period {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 0.3rem 0.8rem;
  white-space: nowrap;
  flex-shrink: 0;
}
.job-bullets { list-style: none; }
.job-bullets li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  padding: 0.3rem 0 0.3rem 1.2rem;
  position: relative;
  line-height: 1.6;
}
.job-bullets li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 0.75rem;
  top: 0.38rem;
}
.metric { color: var(--accent); font-weight: 700; font-family: var(--font-mono); }
```

**Step 3: Verify**

4 job cards with vertical cyan timeline line. Metric numbers glow in cyan. Glowing dot at each entry.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add experience timeline with job cards and metrics"
```

---

### Task 9: Projects section

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add projects HTML**

```html
<section id="projects">
  <div class="container">
    <div class="reveal">
      <div class="section-line"></div>
      <div class="eyebrow">Featured Projects</div>
      <h2 class="section-title">Tools &amp; Dashboards Built</h2>
    </div>
    <div class="projects-grid">

      <div class="project-card glass-card reveal reveal-d1">
        <div class="project-number mono">01</div>
        <h3>Trending Travel Dashboard</h3>
        <p>Weekly-refresh Power BI dashboard analyzing travel destination trends, keyword performance (YoY/WoW), search volume &amp; click index — with multi-page views and indexed data masking.</p>
        <div class="tech-row">
          <span class="tech-tag">Power BI</span>
          <span class="tech-tag">DAX</span>
          <span class="tech-tag">Azure Cosmos DB</span>
          <span class="tech-tag">Scope Language</span>
        </div>
      </div>

      <div class="project-card glass-card reveal reveal-d2">
        <div class="project-number mono">02</div>
        <h3>Consumer Decision Journey Tool</h3>
        <p>Analytical tool mapping user intent signals and purchase decision factors across the consumer funnel — refining Microsoft advertising strategies for enterprise clients.</p>
        <div class="tech-row">
          <span class="tech-tag">Power BI</span>
          <span class="tech-tag">SQL</span>
          <span class="tech-tag">Python</span>
          <span class="tech-tag">Marketing Analytics</span>
        </div>
      </div>

      <div class="project-card glass-card reveal reveal-d3">
        <div class="project-number mono">03</div>
        <h3>Query Pathing Tool</h3>
        <p>Search behavior tracking with location mapping, POI categorization, and destination logic — informing ad targeting improvements that boosted ROI by 10%.</p>
        <div class="tech-row">
          <span class="tech-tag">SQL</span>
          <span class="tech-tag">Azure</span>
          <span class="tech-tag">Data Modeling</span>
          <span class="tech-tag">Geo Analytics</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

**Step 2: Add projects CSS**

```css
/* ── PROJECTS ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.project-card {
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
.project-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.project-card:hover::after { transform: scaleX(1); }
.project-number {
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}
.project-card h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}
.project-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.25rem;
}
.tech-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid rgba(0,255,204,0.2);
  color: rgba(0,255,204,0.7);
  letter-spacing: 0.04em;
}
```

**Step 3: Verify**

3 cards in a row. Hover reveals cyan top-border sweep animation. Tech tags styled in muted cyan.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add projects section with 3 sharp bordered cards"
```

---

### Task 10: Education and certifications section

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add education HTML**

```html
<section id="education">
  <div class="container">
    <div class="reveal">
      <div class="section-line"></div>
      <div class="eyebrow">Education &amp; Certifications</div>
      <h2 class="section-title">Academic Background</h2>
    </div>

    <div class="edu-grid reveal reveal-d1">
      <div class="glass-card edu-card">
        <div class="edu-degree mono">MBA</div>
        <h3>Master of Business Administration</h3>
        <div class="edu-school">Madras University, Chennai</div>
        <div class="edu-year">December 2020</div>
      </div>
      <div class="glass-card edu-card">
        <div class="edu-degree mono">B.E.</div>
        <h3>Bachelor of Engineering</h3>
        <div class="edu-school">Sathyabama University, Chennai</div>
        <div class="edu-year">April 2016</div>
      </div>
    </div>

    <div class="certs-section reveal reveal-d2">
      <div class="eyebrow" style="margin-top:3rem">Certifications</div>
      <div class="cert-grid">
        <div class="glass-card cert-card">
          <div class="cert-num mono">01</div>
          <div>
            <div class="cert-name">Advanced Data Science Certification</div>
            <div class="cert-issuer">upGrad · 2024</div>
          </div>
        </div>
        <div class="glass-card cert-card">
          <div class="cert-num mono">02</div>
          <div>
            <div class="cert-name">Data Science Programming Bootcamp</div>
            <div class="cert-issuer">upGrad · 2023</div>
          </div>
        </div>
        <div class="glass-card cert-card">
          <div class="cert-num mono">03</div>
          <div>
            <div class="cert-name">Power BI for Data Analytics</div>
            <div class="cert-issuer">Pluralsight · 2019</div>
          </div>
        </div>
        <div class="glass-card cert-card">
          <div class="cert-num mono">04</div>
          <div>
            <div class="cert-name">SQL for Data Science</div>
            <div class="cert-issuer">Coursera · 2019</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add education CSS**

```css
/* ── EDUCATION ── */
.edu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 0;
}
.edu-card { padding: 2rem; }
.edu-degree {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  margin-bottom: 0.75rem;
}
.edu-card h3 { font-size: 1.05rem; margin-bottom: 0.5rem; }
.edu-school {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}
.edu-year {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}
.cert-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.25rem;
}
.cert-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
}
.cert-num {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(0,255,204,0.2);
  flex-shrink: 0;
}
.cert-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.cert-issuer {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}
```

**Step 3: Verify**

2 degree cards side-by-side. Below, 4 cert cards in 2×2 grid. Large muted cert numbers add visual hierarchy.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add education and certifications section"
```

---

### Task 11: Contact section and footer

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add contact + footer HTML**

```html
<section id="contact">
  <div class="container">
    <div class="reveal">
      <div class="section-line"></div>
      <div class="eyebrow">Let's Connect</div>
      <h2 class="section-title">Get In Touch</h2>
    </div>
    <div class="contact-layout reveal reveal-d1">

      <div class="contact-info">
        <p class="contact-intro">Whether you're looking for a Senior Data Analyst, need analytics consulting, or want to discuss a project — I'd love to hear from you.</p>
        <div class="contact-links">
          <a href="mailto:prxveen46@gmail.com" class="contact-link">
            <span class="contact-link-label mono">EMAIL</span>
            <span>prxveen46@gmail.com</span>
          </a>
          <a href="tel:+918883886881" class="contact-link">
            <span class="contact-link-label mono">PHONE</span>
            <span>+91-8883886881</span>
          </a>
          <a href="https://www.linkedin.com/in/praveenvr46/" target="_blank" rel="noopener" class="contact-link">
            <span class="contact-link-label mono">LINKEDIN</span>
            <span>praveenvr46</span>
          </a>
          <div class="contact-link" style="cursor:default">
            <span class="contact-link-label mono">LOCATION</span>
            <span>Bengaluru, Karnataka</span>
          </div>
        </div>
      </div>

      <div class="glass-card form-card">
        <form class="form-grid" onsubmit="handleFormSubmit(event)">
          <div class="form-row">
            <div class="field-group">
              <label class="field-label mono">Name</label>
              <input type="text" class="field-input" placeholder="Your full name" required>
            </div>
            <div class="field-group">
              <label class="field-label mono">Email</label>
              <input type="email" class="field-input" placeholder="your@email.com" required>
            </div>
          </div>
          <div class="field-group">
            <label class="field-label mono">Message</label>
            <textarea class="field-textarea" placeholder="Tell me about your project or opportunity..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; padding:1rem;">
            Send Message →
          </button>
        </form>
      </div>

    </div>
  </div>
</section>

<footer>
  <div class="container footer-inner">
    <span class="mono" style="font-size:0.75rem; color:var(--text-muted);">© 2026 Praveen Kumar</span>
    <span class="mono" style="font-size:0.75rem; color:var(--text-muted);">Senior Data Analyst · Bengaluru, India</span>
  </div>
</footer>
```

**Step 2: Add contact + footer CSS**

```css
/* ── CONTACT ── */
.contact-layout {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 4rem;
  align-items: start;
}
.contact-intro {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}
.contact-links { display: flex; flex-direction: column; gap: 0; }
.contact-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color var(--transition);
}
.contact-link:hover { color: var(--accent); }
.contact-link:first-child { border-top: 1px solid var(--border); }
.contact-link-label {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  width: 80px;
  flex-shrink: 0;
}

/* Form */
.form-card { padding: 2.5rem; }
.form-grid { display: flex; flex-direction: column; gap: 1.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.field-group { display: flex; flex-direction: column; gap: 0.4rem; }
.field-label {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.field-input, .field-textarea {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  padding: 0.8rem 1rem;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  outline: none;
  transition: border-color var(--transition);
}
.field-input:focus, .field-textarea:focus {
  border-color: var(--accent);
  background: rgba(0,255,204,0.03);
}
.field-textarea { min-height: 120px; resize: vertical; }

/* ── FOOTER ── */
footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  padding: 1.75rem 0;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**Step 3: Add form submit JS**

```javascript
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  form.innerHTML = '<p style="color:var(--accent);font-family:var(--font-mono);font-size:0.9rem;padding:2rem 0;text-align:center;">✓ Message received! I\'ll be in touch soon.</p>';
}
```

**Step 4: Verify**

Contact section shows info links left, form right. Footer is minimal one-liner. Form shows success message on submit.

**Step 5: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add contact section, form, and footer"
```

---

### Task 12: Scroll reveal animations

**Files:**
- Modify: `portfolio/index.html` — JS section

**Step 1: Add IntersectionObserver for .reveal elements**

```javascript
// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

**Step 2: Verify**

Scroll through the page. Sections fade + slide up into view. Elements with `.reveal-d1/d2/d3` animate with staggered delays.

**Step 3: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add scroll reveal animations with IntersectionObserver"
```

---

### Task 13: CSS 3D card tilt on hover

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add card tilt CSS** (adds perspective to project/job card containers)

```css
/* 3D tilt prep — parent needs perspective */
.projects-grid, .cert-grid { perspective: 1000px; }
.project-card, .cert-card {
  transform-style: preserve-3d;
  will-change: transform;
}
```

**Step 2: Add card tilt JS**

```javascript
// 3D card tilt on mouse move
function initCardTilt() {
  document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });
}
initCardTilt();
```

**Step 3: Verify**

Hover over project cards and cert cards — they tilt in 3D following the mouse. Tilt resets smoothly on mouse leave.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add CSS 3D card tilt effect on hover"
```

---

### Task 14: Responsive layout (mobile)

**Files:**
- Modify: `portfolio/index.html` — CSS section

**Step 1: Add responsive CSS at end of `<style>` block**

```css
/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  h1 { font-size: 3.2rem; }

  .hero-inner { grid-template-columns: 1fr; }
  /* Sphere still visible in canvas behind */

  .about-layout { grid-template-columns: 1fr; gap: 3rem; }
  .about-stats { grid-template-columns: 1fr 1fr; }

  .skill-row { grid-template-columns: 1fr; gap: 0.75rem; }
  .skill-cat { border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }

  .projects-grid { grid-template-columns: 1fr; }

  .edu-grid { grid-template-columns: 1fr; }
  .cert-grid { grid-template-columns: 1fr; }

  .contact-layout { grid-template-columns: 1fr; gap: 3rem; }
  .form-row { grid-template-columns: 1fr; }

  .footer-inner { flex-direction: column; gap: 0.5rem; text-align: center; }

  .nav-links { display: none; }
}

@media (max-width: 600px) {
  section { padding: 4rem 0; }
  .about-stats { grid-template-columns: 1fr 1fr; }
  .hero { padding-top: 5rem; }
}
```

**Step 2: Verify**

Resize browser to 375px width (mobile). Nav links hide. All grid layouts collapse to single column. Text remains readable.

**Step 3: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add responsive breakpoints for mobile layout"
```

---

### Task 15: Final polish and verification

**Files:**
- Modify: `portfolio/index.html` — any remaining gaps

**Step 1: Add sphere glow halo in hero**

In the CSS:
```css
/* Sphere glow hint (purely decorative, positioned to align with Three.js sphere) */
.hero-glow {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,255,204,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
```

Add inside `.hero` section:
```html
<div class="hero-glow" aria-hidden="true"></div>
```

Make sure `.hero-inner` has `position: relative; z-index: 1;`

**Step 2: Ensure sections have opaque enough background for readability**

Add to the CSS:
```css
section { background: rgba(8,8,8,0.7); }
/* Hero is the only section that shows canvas through */
.hero { background: transparent; }
#nav { background: transparent; }
footer { background: rgba(8,8,8,0.9); }
```

**Step 3: Open in browser and do final walkthrough**

Check every section:
- [ ] Nav fixed + scrolled state works
- [ ] Three.js sphere visible, mouse-reactive
- [ ] Hero text readable over canvas
- [ ] About stats display correctly
- [ ] Skills rows hover correctly (cyan left-border)
- [ ] Timeline dots and cyan line render
- [ ] Projects cards tilt on hover
- [ ] Education 2-col, certs 2-col
- [ ] Contact links work (email opens mail client, LinkedIn opens correctly)
- [ ] Form submits → success message
- [ ] Footer renders
- [ ] Mobile: resize to 375px → all layouts correct
- [ ] Console: zero errors

**Step 4: Final commit**

```bash
git add portfolio/index.html
git commit -m "feat: complete 3D portfolio site — polish and final verification"
```

---

## Summary

The final file is `portfolio/index.html` — a single self-contained file.

**To view:** Open `portfolio/index.html` in any modern browser.
**Sections:** Nav → Hero (3D sphere) → About → Skills → Experience → Projects → Education → Contact → Footer

**Key interactions:**
- Three.js sphere tracks mouse in hero
- Background particle field throughout
- Card tilt (CSS 3D) on project + cert cards
- Skill rows accent on hover
- Scroll reveal animations on all sections
- Nav highlights active section on scroll
