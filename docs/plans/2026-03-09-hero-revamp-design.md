# Hero Revamp — 2026 UX Design

**Date:** 2026-03-09
**File:** `portfolio/index.html` (single-file portfolio)
**Scope:** Hero section only — zero new dependencies, pure CSS + ~80 lines JS

---

## Goals

Turn the current static hero into a cinematic first impression using four layered effects:

1. **Aurora background** — subtle animated color blobs behind the Three.js particle sphere
2. **Film grain** — SVG `feTurbulence` noise overlay for depth/texture
3. **Kinetic typography** — per-character staggered fade-up reveal on load + gradient shimmer sweep
4. **Magnetic CTA buttons** — cursor-tracking translate on hover
5. **Scroll progress bar** — thin neon bar at top of viewport

---

## Approach: CSS-first + JS micro-sprinkles

All visual effects are CSS-driven. JS only handles:
- Text-splitting (DOM manipulation, runs once on DOMContentLoaded)
- Magnetic button offset (mousemove listener, ~15 lines)
- Scroll bar width (scroll listener, ~5 lines)

No new libraries. Respects `prefers-reduced-motion`.

---

## Layer Stack (z-index order)

| Layer | Element | z-index | Notes |
|---|---|---|---|
| 1 | `#bg-canvas` (Three.js) | 0 | existing |
| 2 | `#aurora` | 1 | new — 3 blurred ellipses |
| 3 | `.noise` | 2 | new — SVG grain filter |
| 4 | `<section>` hero content | 10 | existing |
| 5 | `#progress-bar` | 1000 | new — top of viewport |

---

## Aurora Background

```html
<div id="aurora" aria-hidden="true">
  <div class="aura aura-1"></div>
  <div class="aura aura-2"></div>
  <div class="aura aura-3"></div>
</div>
```

| Blob | Color | Size | Opacity | Duration |
|---|---|---|---|---|
| `.aura-1` | `#00ffcc` (cyan) | 600×400px | 5% | 22s |
| `.aura-2` | `#502080` (deep purple) | 500×500px | 4% | 28s |
| `.aura-3` | `#004466` (dark teal) | 700×300px | 3% | 35s |

Each blob: `filter: blur(120px)`, absolutely positioned, independent `@keyframes driftN` that translates ±80–120px on both axes in a sinusoidal loop.

---

## Film Grain

Inline SVG defines `feTurbulence` filter. A full-screen fixed div applies it:

```css
.noise {
  position: fixed; inset: 0; z-index: 2;
  pointer-events: none;
  filter: url(#grain);
  mix-blend-mode: overlay;
  opacity: 0.035;
}
```

---

## Kinetic Typography

### Load sequence (timing from page load):
- `0ms` — page loads, all hero text hidden (`opacity: 0`)
- `200ms` — `.hero-label` ("SENIOR DATA ANALYST") fades in as a unit
- `400ms` — `h1` characters begin staggered `charRise` (40ms per char)
- `~1400ms` — last character settles, `.shimmer` class added to `h1`
- `1200ms` — `.hero-desc` paragraph slides up
- `1600ms` — `.hero-meta` (location / status) fades in
- `1800ms` — `.hero-actions` (buttons) fade in

### `@keyframes charRise`
```css
@keyframes charRise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Gradient shimmer sweep on h1
```css
.hero-name.shimmer {
  background: linear-gradient(90deg, #f0f0f0 0%, #00ffcc 40%, #f0f0f0 60%, #00ffcc 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmerSweep 1.2s ease forwards;
}
@keyframes shimmerSweep {
  from { background-position: 100% center; }
  to   { background-position: 0% center; }
}
```

After `shimmerSweep` ends, remove the gradient so the default split color (white "Praveen" + cyan "Kumar.") is restored.

### `prefers-reduced-motion` fallback
All chars and sections set to `opacity: 1` immediately, no delays.

---

## Magnetic CTA Buttons

```js
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.35;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
```

Transition on `.btn`: `transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)`.

---

## Scroll Progress Bar

```html
<div id="progress-bar" aria-hidden="true"></div>
```

```css
#progress-bar {
  position: fixed; top: 0; left: 0;
  height: 3px; width: 0%;
  background: var(--accent);
  z-index: 1000;
  transition: width 0.05s linear;
  pointer-events: none;
}
```

```js
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});
```

---

## Implementation Constraints

- All CSS added to the existing `<style>` block, before `/* ── EDUCATION ── */`
- New HTML elements (`#aurora`, `.noise`, `#progress-bar`) added just after `<body>` opens
- JS added to the existing `<script>` block, after the `IntersectionObserver` setup
- No changes to existing Three.js sphere code
- No changes to existing section structure
