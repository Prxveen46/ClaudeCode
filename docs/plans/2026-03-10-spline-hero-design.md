# Spline Hero Design

**Date:** 2026-03-10
**Goal:** Replace the WebGL glass-slider hero with a static Spline 3D interactive background + portfolio identity content.

---

## Decisions Made

| Question | Decision |
|---|---|
| Slider vs static | **Static** — single screen, no auto-advance, no nav dots |
| Hero content | **Portfolio identity** — Praveen Kumar / Senior Data Analyst / CTAs |
| Navigation | **Keep existing** portfolio nav unchanged |
| Overlay style | **Match reference** — side fade + bottom fade |
| Spline integration | **Runtime vanilla JS** — `@splinetool/runtime` via ES module import |

---

## Architecture

### What Changes

| Element | Before | After |
|---|---|---|
| Background | Three.js WebGL glass slider | Spline 3D scene (runtime ES module) |
| Hero HTML | 5-slide scaffold (canvas, eyebrow, title, desc, nav, counter) | Static (canvas, eyebrow, name, tagline, CTAs) |
| Hero CSS | Slider styles (nav items, progress lines, counter) | Clean hero styles (eyebrow, name, tagline, ctas) |
| Hero JS | ~350-line slider IIFE | ~30-line Spline init + GSAP entrance |
| Three.js CDN | Present | **Removed** |
| GSAP CDN | Present | **Kept** |

### Script Loading

```html
<!-- end of <body> — GSAP as classic global, Spline via async ES module in the inline script -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script>
  // ── SPLINE HERO ──
  (async () => {
    // Spline runtime loaded via dynamic import inside async IIFE
    // GSAP already available as global from the script above
    ...
  })();
</script>
```

---

## HTML Structure

Replaces the entire `<section class="hero" id="hero">` block:

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

---

## CSS

### New hero styles (replaces slider-specific CSS)

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

.canvas-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(0,0,0,0.8), transparent 30%, transparent 70%, rgba(0,0,0,0.8)),
    linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.9));
  z-index: 1;
  pointer-events: none;
}

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

### Removed CSS

- `.slides-navigation { ... }`
- `.slide-nav-item { ... }`, `.slide-nav-item.active { ... }`, `.slide-nav-item:hover { ... }`
- `.slide-progress-line { ... }`, `.slide-progress-fill { ... }`
- `.slide-nav-title { ... }`
- `.slide-counter { ... }`, `.counter-sep { ... }`
- `.slide-eyebrow { ... }`, `.slide-title { ... }`, `.slide-description { ... }`, `.slide-content { ... }`
- `.hero .webgl-canvas { ... }`, `.hero.loaded .webgl-canvas { ... }`
- `.no-webgl .* { ... }` → replaced with `.no-spline .* { ... }`

### No-Spline fallback

```css
.no-spline .spline-canvas { display: none; }
.no-spline .hero {
  background: linear-gradient(135deg, #0b080c 0%, #1a1028 60%, #0b080c 100%);
}
```

---

## JavaScript

Replaces the entire `// ── GLASS SLIDER HERO ──` IIFE:

```js
// ── SPLINE HERO ──
(async () => {
  // 1. Spline 3D scene
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

---

## Spline Scene

- **URL:** `https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode`
- **Runtime CDN:** `https://unpkg.com/@splinetool/runtime@1/build/runtime.js` (ES module)
- **Pointer events:** Enabled on the canvas (Spline scene is interactive)
- **Resize:** Spline Application handles canvas resize internally

---

## Files Touched

| File | Changes |
|---|---|
| `portfolio/index.html` | Replace hero HTML; replace hero CSS; replace slider JS with Spline JS; remove Three.js script tag |
