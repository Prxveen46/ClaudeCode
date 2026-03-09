# Glass Slider Hero — Design Document
**Date:** 2026-03-10
**File:** `portfolio/index.html`
**Status:** Approved, ready for implementation

---

## 1. Goal

Replace the existing Three.js space scene hero with a cinematic full-viewport WebGL image slider that acts as the dominant first impression of the portfolio. The slider uses a glass-morph expanding-circle shader transition (ported from the provided React reference component) and GSAP text animations. The rest of the portfolio (About, Skills, Timeline, Projects, Education, Contact) scrolls below unchanged.

---

## 2. Confirmed Choices

| Decision | Choice | Rationale |
|---|---|---|
| Placement | Replace hero entirely | Maximum impact on first impression |
| Imagery | Abstract dark data/tech Unsplash photos | Professional, on-brand for a data analyst |
| Viewport behaviour | Slider is full-takeover (100vh) | Cinematic; sections scroll below |
| Slide count | 5 slides | One per expertise pillar |
| Implementation | Direct port to vanilla HTML/JS | No framework change, zero deployment risk |

---

## 3. Slide Content

| # | Title | Description | Image keyword |
|---|---|---|---|
| 01 | **Data Analyst** | 9+ years transforming raw data into decisions | Glowing data dashboard (dark) |
| 02 | **Marketing Analytics** | Microsoft · Amazon · Nike · Audi | Dark advertising / funnel |
| 03 | **Business Intelligence** | Snowflake · Tableau · Power BI · DAX | Abstract BI chart / warehouse |
| 04 | **AI & Generative** | 21st.dev · Google Stitch · Nano Banana | Neural / circuit board glow |
| 05 | **Open to Opportunities** | Bengaluru, India · Let's build together | City lights at night |

**Unsplash URLs** (auto-format, 1920w, q80):
- Slide 01: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80`
- Slide 02: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80`
- Slide 03: `https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1920&q=80`
- Slide 04: `https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1920&q=80`
- Slide 05: `https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80`

---

## 4. Layout

```
┌─────────────────────────────────────────────────────┐
│  [NAV bar — unchanged]                              │
│                                                     │
│  SENIOR DATA ANALYST         ← mono eyebrow         │
│  Data Analyst.               ← Geist 700, 5-7rem    │
│  9+ years transforming…      ← Space Grotesk muted  │
│                                                     │
│                  ●────  ○  ○  ○  ○                  │  ← nav dots + purple progress
│                        ↓ SCROLL                     │  ← scroll cue
└─────────────────────────────────────────────────────┘
      ↓ normal scroll → About, Skills, Experience…
```

---

## 5. Visual Design

| Element | Spec |
|---|---|
| Canvas | `position: fixed` replaced by `position: absolute` (so sections scroll over it) |
| Text overlay | `position: absolute`, centred-left, `z-index: 2` |
| Title font | Geist 700, `clamp(3.5rem, 7vw, 6rem)` |
| Description font | Space Grotesk, 1.1rem, `--text-secondary` |
| Eyebrow | Space Mono, 0.7rem, letter-spacing 0.2em, `--accent` colour |
| Progress lines | `--accent: #c2a4ff` fill on active dot |
| Counter | `01 / 05`, Space Mono, bottom-right |
| Canvas overlay | `rgba(0,0,0,0.45)` div over canvas for text legibility |
| Scroll cue | `↓ SCROLL`, Space Mono, bottom-centre, pulse animation |

---

## 6. GSAP Text Animations (per slide)

| Slide | Animation |
|---|---|
| 01 Data Analyst | Stagger up — letters rise sequentially |
| 02 Marketing Analytics | Blur reveal — letters sharpen from fog |
| 03 Business Intelligence | Scale in — letters pop from zero |
| 04 AI & Generative | Rotate X flip — letters flip forward |
| 05 Open to Opportunities | Slide left — letters sweep in from right |

Animate-out on transition: all children fade up (`y: -20, opacity: 0`) then new content animates in.

---

## 7. Shader (Glass Effect)

Ported directly from reference component's `fragmentShader`:
- **Expanding circle reveal**: new image grows from viewport centre outward
- **Chromatic aberration** at circle edge (`uGlassChromaticAberration`)
- **Liquid wobble** inside expanding sphere (`uGlassLiquidFlow`)
- **Transition duration**: 2.5s, GSAP `power2.inOut`
- **Auto-advance**: every 5s, with purple progress-line fill

---

## 8. Script Changes

### Removed from `<head>` / end of `<body>`
```
three@0.134.0/examples/js/postprocessing/EffectComposer.js
three@0.134.0/examples/js/postprocessing/RenderPass.js
three@0.134.0/examples/js/shaders/CopyShader.js
three@0.134.0/examples/js/postprocessing/ShaderPass.js
three@0.134.0/examples/js/shaders/LuminosityHighPassShader.js
three@0.134.0/examples/js/postprocessing/UnrealBloomPass.js
```
(6 scripts removed — bloom not needed for glass slider)

### Added
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```
(before the existing `three.min.js` script at end of body)

---

## 9. HTML Structure Changes

### Removed
```html
<section class="hero" id="hero">
  <!-- kinetic h1, hero-text, hero-actions, hero-meta -->
</section>
```

### Added
```html
<section class="hero" id="hero">
  <canvas class="webgl-canvas"></canvas>
  <div class="canvas-overlay"></div>          <!-- dark tint for legibility -->
  <div class="slide-content">
    <p class="slide-eyebrow" id="slideEyebrow">Senior Data Analyst</p>
    <h1 class="slide-title" id="mainTitle"></h1>
    <p class="slide-description" id="mainDesc"></p>
  </div>
  <nav class="slides-navigation" id="slidesNav"></nav>
  <div class="slide-counter">
    <span id="slideNumber">01</span>
    <span class="counter-sep"> / </span>
    <span id="slideTotal">05</span>
  </div>
  <div class="scroll-cue">
    <span>↓</span>
    <span class="scroll-label">SCROLL</span>
  </div>
</section>
```

---

## 10. CSS Changes

### Removed
- `.hero-text`, `.char`, `.kinetic-word`, `.hero-title`, `.hero-desc`, `.hero-meta`, `.hero-actions` styles
- `#bg-canvas` fixed positioning + filter styles (replaced by `.webgl-canvas`)
- `#aurora`, `.noise` decorative elements (optional: keep as subtle background layer)

### Added
- `.webgl-canvas` — `position: absolute; inset: 0; width: 100%; height: 100%;`
- `.canvas-overlay` — `position: absolute; inset: 0; background: rgba(0,0,0,0.45);`
- `.slide-content` — text block, left-aligned, centred vertically
- `.slide-eyebrow` — mono uppercase, accent colour
- `.slide-title` — Geist 700, large clamp
- `.slide-description` — Space Grotesk, muted colour
- `.slides-navigation` — bottom bar with dot items + progress lines
- `.slide-nav-item`, `.slide-progress-line`, `.slide-progress-fill` — purple fill
- `.slide-counter` — bottom-right mono counter
- `.scroll-cue` — bottom-centre pulse animation, links to `#about`

---

## 11. JavaScript Changes

### Removed
- Entire space scene: star fields, nebula, mountain parallax, atmosphere sphere
- `smoothScroll`, `smoothCam`, triple-lerp scroll pipeline
- `EffectComposer`, `UnrealBloomPass` setup

### Added (ported from reference)
- `SLIDER_CONFIG` — 5 slides array with title, description, Unsplash image URL
- `glassEffect` fragment shader (verbatim from reference)
- `initRenderer()` — Three.js orthographic camera + shader material setup
- `loadImageTexture()` — TextureLoader promise wrapper
- `navigateToSlide()` — transition logic with GSAP tween on `uProgress`
- `updateContent()` — GSAP text animate-out/in with 5 unique animations
- `createSlidesNavigation()` — dynamic dot nav generation
- `startAutoSlideTimer()` / `stopAutoSlideTimer()` — progress bar interval
- `handleSlideChange()` — auto-advance handler
- Scroll-cue hide logic: `IntersectionObserver` on `#about` to fade cue

---

## 12. Fallback

If WebGL is unavailable:
```css
.no-webgl .webgl-canvas { display: none; }
.no-webgl .hero { background: linear-gradient(135deg, #0b080c 0%, #1a1028 100%); }
```
Check via `renderer.getContext()` — add `no-webgl` class to `<body>` if null.

---

## 13. Out of Scope

- Frost / ripple / plasma / timeshift shader variants (only glass effect implemented)
- Settings panel / effect switcher UI (reference has this, portfolio doesn't need it)
- Mobile swipe gesture (nice-to-have, deferred)
- Projects section slider (separate future request)
