# Spline Hero Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the WebGL glass-slider hero with a static Spline 3D background + portfolio identity content (Praveen Kumar, Senior Data Analyst, CTAs).

**Architecture:** Single-file vanilla HTML/CSS/JS. Replace the Three.js WebGL slider entirely: swap hero HTML to a static layout, swap hero CSS to clean hero styles, swap the ~385-line slider IIFE with a ~30-line Spline async init block. Remove Three.js CDN script. Keep GSAP for entrance animations.

**Tech Stack:** `@splinetool/runtime` via dynamic ES module import, GSAP 3.12.2, vanilla JS

**Design doc:** `docs/plans/2026-03-10-spline-hero-design.md`

---

## Task 1: Replace hero HTML

**Files:**
- Modify: `portfolio/index.html:1305–1325`

### Step 1: Locate the hero section

```bash
grep -n 'class="hero"' portfolio/index.html
```
Expected: one match at ~line 1305 — `<section class="hero" id="hero">`.

### Step 2: Replace the entire `<section class="hero">` block

Current block (lines ~1305–1325):
```html
  <section class="hero" id="hero">
    <canvas class="webgl-canvas" aria-hidden="true"></canvas>
    <div class="canvas-overlay" aria-hidden="true"></div>
    <div class="slide-content">
      <p class="slide-eyebrow" id="slideEyebrow">Senior Data Analyst</p>
      <h1 class="slide-title" id="mainTitle"></h1>
      <p class="slide-description" id="mainDesc"></p>
    </div>
    <nav class="slides-navigation" id="slidesNav" aria-label="Slide navigation"></nav>
    <div class="slide-counter" aria-hidden="true">
      <span id="slideNumber">01</span>
      <span class="counter-sep"> / </span>
      <span id="slideTotal">05</span>
    </div>
    <a href="#about" class="scroll-cue" id="scrollCue" aria-label="Scroll to content">
      <span class="scroll-arrow">↓</span>
      <span class="scroll-label">SCROLL</span>
    </a>
  </section>
```

Replace with:
```html
  <section class="hero" id="hero">
    <canvas class="spline-canvas" aria-hidden="true"></canvas>
    <div class="canvas-overlay" aria-hidden="true"></div>
    <div class="hero-content">
      <p class="hero-eyebrow">Senior Data Analyst</p>
      <h1 class="hero-name" id="heroName">Praveen<br><span class="accent">Kumar.</span></h1>
      <p class="hero-tagline" id="heroTagline">
        9+ years transforming complex datasets into business strategy —
        Marketing Analytics, BI, and enterprise insights for
        <span class="accent">Microsoft, Amazon, Nike &amp; Audi.</span>
      </p>
      <div class="hero-ctas" id="heroCtas">
        <a href="#contact" class="btn btn-primary">Get In Touch</a>
        <a href="#experience" class="btn btn-ghost">View Experience</a>
      </div>
    </div>
    <a href="#about" class="scroll-cue" id="scrollCue" aria-label="Scroll to content">
      <span class="scroll-arrow">↓</span>
      <span class="scroll-label">SCROLL</span>
    </a>
  </section>
```

### Step 3: Verify

```bash
grep -n "spline-canvas\|hero-content\|hero-name\|hero-tagline\|hero-ctas\|heroName\|heroTagline\|heroCtas" portfolio/index.html | head -15
```
Expected: all 8 new identifiers present. Also verify old ones are gone:
```bash
grep -c "webgl-canvas\|slide-content\|slide-eyebrow\|slide-title\|slidesNav\|slide-counter" portfolio/index.html
```
Expected: `0`

### Step 4: Commit

```bash
git add portfolio/index.html
git commit -m "feat: replace slider HTML with static Spline hero scaffold"
```

---

## Task 2: Replace hero CSS

**Files:**
- Modify: `portfolio/index.html` (CSS `<style>` block)

### Step 1: Find all CSS blocks to remove

```bash
grep -n "\.slide-content\|\.slide-eyebrow\|\.slide-title\|\.slide-description\|\.slides-navigation\|\.slide-nav-item\|\.slide-progress\|\.slide-nav-title\|\.slide-counter\|\.counter-sep\|\.webgl-canvas\|\.no-webgl\|hero\.loaded \.webgl" portfolio/index.html
```

### Step 2: Remove the old CSS blocks

Find and remove these entire CSS blocks from the `<style>` section. Use Python to make the replacement surgical:

**Blocks to remove (find by their opening selector line):**
- `.webgl-canvas {` block (~lines 154–168)
- `.slide-content {` block (~lines 170–176)
- `.slide-eyebrow {` block (~lines 178–186)
- `.slide-title {` block (~lines 188–197)
- `.slide-description {` block (~lines 199–205)
- `.slides-navigation {` block (~lines 207–214)
- `.slide-nav-item {` block (~lines 216–223)
- `.slide-nav-item.active { ... }` and `.slide-nav-item:hover { ... }` lines (~lines 225–226)
- `.slide-progress-line {` block (~lines 228–234)
- `.slide-progress-fill {` block (~lines 236–242)
- `.slide-nav-title {` block (~lines 244–251)
- `.slide-counter {` block (~lines 253–262)
- `.counter-sep { ... }` line (~line 264)
- `.no-webgl .webgl-canvas`, `.no-webgl .canvas-overlay`, `.no-webgl .hero`, `.no-webgl .slide-content` block (~lines 303–310)
- `.hero .webgl-canvas { ... }` and `.hero.loaded .webgl-canvas { ... }` lines (~lines 311–312)
- Inside `@media (max-width: 768px)`: `.slide-content { ... }`, `.slide-title { ... }`, `.slides-navigation { ... }`, `.slide-progress-line { ... }`, `.slide-nav-title { ... }`, `.slide-counter { ... }` block (~lines 315–325)
- Inside `@media (prefers-reduced-motion: reduce)`: `.webgl-canvas { display: none !important; }` line (~line 1235)

### Step 3: Update `.canvas-overlay` gradient

Find the current `.canvas-overlay` block which has `background: rgba(0, 0, 0, 0.45)`. Replace `background` value with the reference's dual-gradient:

```css
.canvas-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(0,0,0,0.8), transparent 30%, transparent 70%, rgba(0,0,0,0.8)),
    linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.9));
  z-index: 1;
  pointer-events: none;
}
```

### Step 4: Add new hero CSS

After the `/* ── BUTTONS ── */` section (or after the existing `.canvas-overlay` block), add:

```css
/* ── HERO / SPLINE ── */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #0b080c;
}

.spline-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
  transition: opacity 1s ease;
}

.hero.loaded .spline-canvas { opacity: 1; }

.hero-content {
  position: absolute;
  bottom: 14vh;
  left: 6vw;
  z-index: 3;
  max-width: 560px;
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(3.5rem, 7vw, 6rem);
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 1.2rem;
}

.hero-tagline {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.55;
  max-width: 480px;
  margin-bottom: 2rem;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* No-Spline fallback */
.no-spline .spline-canvas { display: none; }
.no-spline .hero {
  background: linear-gradient(135deg, #0b080c 0%, #1a1028 60%, #0b080c 100%);
}

/* Mobile */
@media (max-width: 768px) {
  .hero-content {
    left: 1.5rem;
    right: 1.5rem;
    max-width: 100%;
    bottom: 12vh;
  }
  .hero-name { font-size: clamp(2.5rem, 10vw, 4rem); }
}
```

Also in `@media (prefers-reduced-motion: reduce)`: update the canvas reference line (was `.webgl-canvas`) to:
```css
.spline-canvas { display: none !important; }
```

### Step 5: Verify no stale slider CSS remains

```bash
grep -c "slide-content\|slide-eyebrow\|slide-title\|slide-description\|slides-navigation\|slide-nav-item\|slide-progress\|slide-nav-title\|slide-counter\|counter-sep\|webgl-canvas\|no-webgl" portfolio/index.html
```
Expected: `0`

Verify new CSS is present:
```bash
grep -n "spline-canvas\|hero-content\|hero-name\|hero-tagline\|hero-ctas\|no-spline\|hero\.loaded" portfolio/index.html | head -15
```
Expected: all new selectors found.

### Step 6: Commit

```bash
git add portfolio/index.html
git commit -m "feat: replace slider CSS with static Spline hero styles"
```

---

## Task 3: Replace slider JS with Spline init

**Files:**
- Modify: `portfolio/index.html:1832–2218`

### Step 1: Locate the boundaries

```bash
grep -n "three.min.js\|GLASS SLIDER HERO\|initRenderer" portfolio/index.html | head -10
```
Expected:
- ~line 1832: `<script src="...three.min.js">`
- ~line 1835: `// ── GLASS SLIDER HERO ──`
- ~line 2218: the closing `})();` of the slider IIFE

### Step 2: Remove the Three.js script tag (line ~1832)

Find this exact line and remove it:
```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
```

### Step 3: Replace the slider IIFE with the Spline init

Inside the `<script>` block, find the slider IIFE from `// ── GLASS SLIDER HERO ──` (line ~1835) through its closing `})();` (line ~2218). Replace that entire block with:

```js
    // ── SPLINE HERO ──
    (async () => {
      // 1. Load Spline 3D scene via runtime ES module
      try {
        const { Application } = await import(
          'https://unpkg.com/@splinetool/runtime@1/build/runtime.js'
        );
        const canvas = document.querySelector('.spline-canvas');
        if (canvas) {
          const spline = new Application(canvas);
          await spline.load('https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode');
          document.querySelector('.hero')?.classList.add('loaded');
        }
      } catch (e) {
        document.body.classList.add('no-spline');
        console.warn('Spline: scene failed to load', e);
      }

      // 2. GSAP entrance animations
      if (typeof gsap !== 'undefined') {
        gsap.fromTo('#heroName',    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1,   ease: 'power3.out', delay: 0.3 });
        gsap.fromTo('#heroTagline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.6 });
        gsap.fromTo('#heroCtas',    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.9 });
      }

      // 3. Scroll cue hide when #about enters viewport
      const cue = document.getElementById('scrollCue');
      const about = document.getElementById('about');
      if (cue && about) {
        new IntersectionObserver(([e]) => cue.classList.toggle('hidden', e.isIntersecting),
          { threshold: 0.1 }).observe(about);
      }
    })();
```

### Step 4: Verify all slider JS is gone

```bash
grep -n "nebula\|starGroup\|GLASS SLIDER\|slideTextures\|navigateToSlide\|createNavigation\|startTimer\|updateContent\|shaderMaterial\|OrthographicCamera\|three.min.js" portfolio/index.html
```
Expected: **0 results**.

Verify Spline init is present:
```bash
grep -n "SPLINE HERO\|splinetool\|spline.load\|splinecode\|heroName\|heroTagline\|heroCtas\|no-spline" portfolio/index.html | head -15
```
Expected: all present.

### Step 5: Commit

```bash
git add portfolio/index.html
git commit -m "feat: replace slider JS with Spline 3D hero init"
```

---

## Task 4: Local verification

### Step 1: Start preview server

The portfolio is served at port 3000 via `.claude/launch.json` "Portfolio Preview":
```bash
lsof -ti:3000 | head -3
```
If nothing is running, the `preview_start` tool will start `python3 -m http.server 3000 --directory portfolio`.

### Step 2: Hard-reload and check for JS errors

```bash
# Check the inline script block for syntax errors (quick sanity)
node --input-type=module --eval "
  const fs = await import('fs');
  const html = fs.readFileSync('portfolio/index.html', 'utf8');
  const m = html.match(/<script>([\s\S]*?)<\/script>/g);
  const mainScript = m?.find(s => s.includes('SPLINE HERO'));
  const body = mainScript?.replace(/<\/?script>/g, '');
  if (body) {
    try { new Function(body); console.log('Script block: OK'); }
    catch(e) { console.error('SYNTAX ERROR:', e.message); }
  }
" 2>&1 || echo "(Node module check done)"
```

### Step 3: Visual checklist (via preview tools)

Capture a screenshot after the page loads and verify:
- [ ] Hero fills 100vh, dark `#0b080c` background visible immediately
- [ ] "SENIOR DATA ANALYST" eyebrow text in purple
- [ ] "Praveen Kumar." heading animates in (GSAP fade+slide from below)
- [ ] Tagline text fades in after 0.6s
- [ ] "Get In Touch" and "View Experience" CTA buttons appear after 0.9s
- [ ] Spline 3D scene fades in (`.hero.loaded` added, canvas opacity: 0 → 1)
- [ ] Side + bottom gradient overlay visible (dark edges)
- [ ] No console errors
- [ ] `↓ SCROLL` cue visible
- [ ] Scrolling reveals About section intact
- [ ] Nav bar highlights "ABOUT" when scrolled to About section

### Step 4: Mobile check (375px)

Resize to mobile and verify:
- [ ] Hero name font scales down (`clamp(2.5rem, 10vw, 4rem)`)
- [ ] Content doesn't overflow left/right margin
- [ ] CTAs stack or wrap cleanly

### Step 5: Spline load time note

The Spline scene will take 1–3s to load from CDN. During that time:
- Canvas stays invisible (opacity: 0) — the dark `#0b080c` background shows
- Once loaded, `.hero.loaded` is added and canvas fades in smoothly

If the Spline runtime CDN returns a 404 or CORS error, `no-spline` class is added to `<body>` and the static gradient fallback is shown. Check DevTools Network tab if the 3D scene doesn't appear.

---

## Task 5: Push to both remotes

### Step 1: Verify clean git state

```bash
git status
git log --oneline -5
```
Expected: working tree clean, 3 new commits from this feature.

### Step 2: Push

```bash
git push origin main && git push portfolio main
```

### Step 3: Verify Vercel deploy

Vercel auto-deploys from `portfolio` remote. Wait ~60s then open:
```
https://portfolio-two-lovat-85.vercel.app/
```
Confirm the Spline hero loads and the static content is correct.

---

## Summary of changes

| File | What changes |
|---|---|
| `portfolio/index.html` HTML | Remove slider scaffold (canvas, slide-content, nav dots, counter); add static hero (spline-canvas, hero-content, hero-name, hero-tagline, hero-ctas) |
| `portfolio/index.html` CSS | Remove 15+ slider CSS blocks; update canvas-overlay gradient; add hero-content/name/tagline/ctas/no-spline styles |
| `portfolio/index.html` JS | Remove `three.min.js` script tag; replace ~385-line slider IIFE with ~30-line Spline async init |

**Total commits:** 3 atomic commits (HTML, CSS, JS) + 1 push.

**Estimated time:** 20–30 minutes implementation + 5 min verification.
