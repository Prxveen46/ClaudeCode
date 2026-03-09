# Glass Slider Hero Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Three.js space scene hero with a full-viewport WebGL glass-morph image slider using GSAP text animations and 5 identity slides.

**Architecture:** Single-file vanilla HTML/JS — no framework change. Port the reference React component's logic (shader, GSAP text, nav dots, progress timer) directly into `portfolio/index.html`. Three.js stays, post-processing scripts go. GSAP added as new CDN script.

**Tech Stack:** Three.js r134, GSAP 3.12.2, vanilla JS, CSS custom properties, Unsplash images

---

## Task 1: Remove post-processing CDN scripts + add GSAP

**Files:**
- Modify: `portfolio/index.html:1755-1761`

**Step 1: Remove the 6 bloom/post-processing scripts and add GSAP**

Replace the current block at line 1755 (end of body scripts) from:
```html
  <!-- Three.js loaded at end of body — does NOT block rendering of text/layout above -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/postprocessing/EffectComposer.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/postprocessing/RenderPass.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/shaders/CopyShader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/postprocessing/ShaderPass.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/shaders/LuminosityHighPassShader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/postprocessing/UnrealBloomPass.js"></script>
```
With:
```html
  <!-- Scripts at end of body — does NOT block rendering of text/layout above -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
```

**Step 2: Verify the `preconnect` hint for cdnjs is already in `<head>`**

```bash
grep -n "cdnjs.cloudflare.com" portfolio/index.html
```
Expected: line ~31 `<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>` ✓ already there from the optimization pass.

**Step 3: Commit**
```bash
git add portfolio/index.html
git commit -m "chore: swap post-processing scripts for GSAP, remove bloom"
```

---

## Task 2: Replace hero HTML

**Files:**
- Modify: `portfolio/index.html:1225-1248`

**Step 1: Replace the entire `<section class="hero">` block**

Current (lines 1225–1248):
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
          <span class="mono" style="font-size:0.75rem;color:var(--text-muted);">Bengaluru, India</span>
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
    </div>
  </section>
```

Replace with:
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

**Step 2: Also remove the `#bg-canvas` canvas element (line ~1184) and its sibling decorative divs that are no longer needed**

Find and remove these lines (around line 1184):
```html
  <canvas id="bg-canvas" aria-hidden="true"></canvas>
```

The `#aurora` and `.noise` divs can stay — they still render behind all sections and add subtle texture. But confirm `#bg-canvas` is removed since the new `.webgl-canvas` is inside `<section class="hero">`.

**Step 3: Verify structure**
```bash
grep -n "webgl-canvas\|bg-canvas\|slide-content\|slidesNav\|scroll-cue" portfolio/index.html
```
Expected: `webgl-canvas` inside `#hero` section; `bg-canvas` NOT found.

**Step 4: Commit**
```bash
git add portfolio/index.html
git commit -m "feat: replace hero HTML with slider scaffold"
```

---

## Task 3: Replace hero CSS

**Files:**
- Modify: `portfolio/index.html` (CSS `<style>` block)

**Step 1: Find and remove all old hero CSS**

Find these sections in the `<style>` block and delete them entirely:
- `.hero { ... }` (around line 261)
- `.hero-inner { ... }` (around line 270)
- `.hero-text { ... }` (around line 276)
- `.hero-desc { ... }` (around line 278)
- `.hero-meta { ... }`, `.hero-dot { ... }` (around line 285)
- `.hero-actions { ... }` (around line 306)
- `.mock-charts` reference styles that are hero-only (keep the ones inside `.project-card`)
- `.char { ... }`, `@keyframes charRise { ... }` (around line 1089)
- `.hero-text h1.shimmer { ... }` and related (around line 1101)
- `.hero-text .eyebrow.reveal-hero, ...` and `@keyframes heroFadeUp { ... }` (around line 1133)
- The `#bg-canvas { ... }` block (around line 88) — `.webgl-canvas` replaces it

Also in the `@media (prefers-reduced-motion: reduce)` block, remove references to `.hero-text .eyebrow`, `.hero-text h1`, etc. (since those elements no longer exist).

**Step 2: Add new hero CSS**

Add this block after the `/* ── BUTTONS ── */` section:

```css
/* ── HERO / SLIDER ── */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #0b080c;
}

.webgl-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.canvas-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
  pointer-events: none;
}

/* Slide text content */
.slide-content {
  position: absolute;
  bottom: 14vh;
  left: 6vw;
  z-index: 3;
  max-width: 640px;
}

.slide-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
  opacity: 0.9;
}

.slide-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(3.5rem, 7vw, 6rem);
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 1.2rem;
  min-height: 1.1em;
}

.slide-description {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.55;
  max-width: 480px;
}

/* Slide navigation dots */
.slides-navigation {
  position: absolute;
  bottom: 2.5rem;
  left: 6vw;
  display: flex;
  gap: 1.5rem;
  z-index: 3;
}

.slide-nav-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.slide-nav-item.active {
  opacity: 1;
}

.slide-nav-item:hover {
  opacity: 0.8;
}

.slide-progress-line {
  width: 48px;
  height: 2px;
  background: rgba(194, 164, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.slide-progress-fill {
  height: 100%;
  width: 0%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.1s ease, opacity 0.3s ease;
}

.slide-nav-title {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
}

/* Slide counter */
.slide-counter {
  position: absolute;
  bottom: 2.8rem;
  right: 5vw;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  z-index: 3;
}

.counter-sep {
  margin: 0 0.15rem;
}

/* Scroll cue */
.scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 3;
  text-decoration: none;
  animation: scrollPulse 2s ease-in-out infinite;
  color: rgba(255, 255, 255, 0.45);
}

.scroll-arrow {
  font-size: 1rem;
  line-height: 1;
}

.scroll-label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
  50% { opacity: 0.9; transform: translateX(-50%) translateY(4px); }
}

.scroll-cue.hidden {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

/* Slider fade-in once textures loaded */
.hero .webgl-canvas { opacity: 0; transition: opacity 0.8s ease; }
.hero.loaded .webgl-canvas { opacity: 1; }

/* Mobile adjustments */
@media (max-width: 768px) {
  .slide-content {
    left: 1.5rem;
    right: 1.5rem;
    max-width: 100%;
    bottom: 12vh;
  }
  .slide-title { font-size: clamp(2.5rem, 10vw, 4rem); }
  .slides-navigation { left: 1.5rem; gap: 1rem; }
  .slide-progress-line { width: 32px; }
  .slide-nav-title { display: none; }
  .slide-counter { right: 1.5rem; }
}
```

**Step 3: Update `prefers-reduced-motion` block**

The existing block references `.hero-text .eyebrow`, `.char`, etc. Replace the hero-specific lines so it reads:
```css
@media (prefers-reduced-motion: reduce) {
  #bg-canvas { display: none; }
  #aurora { display: none; }
  .noise { display: none; }
  .webgl-canvas { display: none !important; }
  .canvas-overlay { display: none; }
  .scroll-cue { animation: none; opacity: 0.6; }
  [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

**Step 4: Verify no leftover hero references break layout**
```bash
grep -n "hero-text\|hero-desc\|hero-meta\|hero-actions\|hero-inner\|charRise\|shimmer\|heroFadeUp" portfolio/index.html
```
Expected: 0 results (all deleted).

**Step 5: Commit**
```bash
git add portfolio/index.html
git commit -m "feat: add slider hero CSS, remove space scene CSS"
```

---

## Task 4: Add slider JavaScript (replaces space scene)

**Files:**
- Modify: `portfolio/index.html:1764–2056` (the entire `// ── THREE.JS SPACE SCENE ──` block)

**Step 1: Locate exact replacement boundaries**

The space scene JS starts at line 1764:
```js
    // ── THREE.JS SPACE SCENE ──
```
And ends at line 2056:
```js
    })(); } catch(e) { /* WebGL unavailable — space scene skipped */ }
```

**Step 2: Replace the entire space scene block with the slider JS**

Replace from `// ── THREE.JS SPACE SCENE ──` through the closing `} catch(e) {...}` with:

```js
    // ── GLASS SLIDER HERO ──
    (() => {
      // SLIDES DATA
      const slides = [
        {
          title: "Data Analyst",
          description: "9+ years transforming raw data into decisions.",
          media: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
        },
        {
          title: "Marketing Analytics",
          description: "Microsoft · Amazon · Nike · Audi.",
          media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
        },
        {
          title: "Business Intelligence",
          description: "Snowflake · Tableau · Power BI · DAX.",
          media: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1920&q=80"
        },
        {
          title: "AI & Generative",
          description: "21st.dev · Google Stitch · Nano Banana.",
          media: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1920&q=80"
        },
        {
          title: "Open to Opportunities",
          description: "Bengaluru, India · Let's build together.",
          media: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80"
        }
      ];

      // STATE
      let currentSlideIndex = 0;
      let isTransitioning = false;
      let shaderMaterial, renderer, scene, camera;
      let slideTextures = [];
      let texturesLoaded = false;
      let autoSlideTimer = null;
      let progressAnimation = null;
      let sliderEnabled = false;
      const SLIDE_DURATION = 5000;
      const TRANSITION_DURATION = 2.5;
      const PROGRESS_INTERVAL = 50;

      // SHADERS
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform sampler2D uTexture1, uTexture2;
        uniform float uProgress;
        uniform vec2 uResolution, uTexture1Size, uTexture2Size;

        varying vec2 vUv;

        vec2 getCoverUV(vec2 uv, vec2 textureSize) {
          vec2 s = uResolution / textureSize;
          float scale = max(s.x, s.y);
          vec2 scaledSize = textureSize * scale;
          vec2 offset = (uResolution - scaledSize) * 0.5;
          return (uv * uResolution - offset) / scaledSize;
        }

        void main() {
          float progress = uProgress;
          vec2 uv1 = getCoverUV(vUv, uTexture1Size);
          vec2 uv2 = getCoverUV(vUv, uTexture2Size);

          float maxR = length(uResolution) * 0.85;
          float br = progress * maxR;
          vec2 p = vUv * uResolution;
          vec2 c = uResolution * 0.5;
          float d = length(p - c);
          float nd = d / max(br, 0.001);
          float param = smoothstep(br + 3.0, br - 3.0, d);

          vec4 img;
          if (param > 0.0) {
            float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
            vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
            vec2 distUV = uv2 - dir * ro;
            float time = progress * 5.0;
            distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * nd * param;
            float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
            img = vec4(
              texture2D(uTexture2, distUV + dir * ca * 1.2).r,
              texture2D(uTexture2, distUV + dir * ca * 0.2).g,
              texture2D(uTexture2, distUV - dir * ca * 0.8).b,
              1.0
            );
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.08;
          } else {
            img = texture2D(uTexture2, uv2);
          }

          vec4 oldImg = texture2D(uTexture1, uv1);
          if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
          gl_FragColor = mix(oldImg, img, param);
        }
      `;

      // TEXT HELPERS
      const splitText = text =>
        text.split('').map(c =>
          `<span style="display:inline-block;opacity:0;">${c === ' ' ? '&nbsp;' : c}</span>`
        ).join('');

      const updateContent = idx => {
        const titleEl = document.getElementById('mainTitle');
        const descEl = document.getElementById('mainDesc');
        if (!titleEl || !descEl) return;

        gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.4, stagger: 0.015, ease: 'power2.in' });
        gsap.to(descEl, { y: -10, opacity: 0, duration: 0.3, ease: 'power2.in' });

        setTimeout(() => {
          titleEl.innerHTML = splitText(slides[idx].title);
          descEl.textContent = slides[idx].description;
          gsap.set(titleEl.children, { opacity: 0 });
          gsap.set(descEl, { y: 20, opacity: 0 });

          const ch = titleEl.children;
          switch (idx) {
            case 0: // Stagger up
              gsap.set(ch, { y: 20 });
              gsap.to(ch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out' });
              break;
            case 1: // Blur reveal
              gsap.set(ch, { filter: 'blur(10px)', scale: 1.4, y: 0 });
              gsap.to(ch, { filter: 'blur(0px)', scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: 'random' }, ease: 'power2.out' });
              break;
            case 2: // Scale in
              gsap.set(ch, { scale: 0, y: 0 });
              gsap.to(ch, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' });
              break;
            case 3: // Rotate X flip
              gsap.set(ch, { rotationX: 90, y: 0, transformOrigin: '50% 50%' });
              gsap.to(ch, { rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power2.out' });
              break;
            case 4: // Slide left
              gsap.set(ch, { x: 30, y: 0 });
              gsap.to(ch, { x: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out' });
              break;
            default:
              gsap.set(ch, { y: 20 });
              gsap.to(ch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out' });
          }
          gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: 'power3.out' });
        }, 450);
      };

      // NAV DOTS
      const createNavigation = () => {
        const nav = document.getElementById('slidesNav');
        if (!nav) return;
        nav.innerHTML = '';
        slides.forEach((slide, i) => {
          const item = document.createElement('div');
          item.className = `slide-nav-item${i === 0 ? ' active' : ''}`;
          item.innerHTML = `
            <div class="slide-progress-line"><div class="slide-progress-fill"></div></div>
            <div class="slide-nav-title">${slide.title}</div>`;
          item.addEventListener('click', e => {
            e.stopPropagation();
            if (!isTransitioning && i !== currentSlideIndex) {
              stopTimer();
              quickResetProgress(currentSlideIndex);
              navigateToSlide(i);
            }
          });
          nav.appendChild(item);
        });
      };

      const updateNavState = idx =>
        document.querySelectorAll('.slide-nav-item').forEach((el, i) =>
          el.classList.toggle('active', i === idx));

      const updateProgress = (idx, pct) => {
        const fill = document.querySelectorAll('.slide-nav-item')[idx]?.querySelector('.slide-progress-fill');
        if (fill) { fill.style.width = `${pct}%`; fill.style.opacity = '1'; }
      };

      const quickResetProgress = idx => {
        const fill = document.querySelectorAll('.slide-nav-item')[idx]?.querySelector('.slide-progress-fill');
        if (fill) { fill.style.transition = 'width 0.2s ease-out'; fill.style.width = '0%'; setTimeout(() => fill.style.transition = 'width 0.1s ease, opacity 0.3s ease', 200); }
      };

      const updateCounter = idx => {
        const sn = document.getElementById('slideNumber'); if (sn) sn.textContent = String(idx + 1).padStart(2, '0');
        const st = document.getElementById('slideTotal'); if (st) st.textContent = String(slides.length).padStart(2, '0');
      };

      // TIMER
      const startTimer = () => {
        if (!texturesLoaded || !sliderEnabled) return;
        stopTimer();
        let pct = 0;
        const inc = (100 / SLIDE_DURATION) * PROGRESS_INTERVAL;
        progressAnimation = setInterval(() => {
          if (!sliderEnabled) { stopTimer(); return; }
          pct += inc;
          updateProgress(currentSlideIndex, pct);
          if (pct >= 100) {
            clearInterval(progressAnimation); progressAnimation = null;
            const fill = document.querySelectorAll('.slide-nav-item')[currentSlideIndex]?.querySelector('.slide-progress-fill');
            if (fill) { fill.style.opacity = '0'; setTimeout(() => fill.style.width = '0%', 300); }
            if (!isTransitioning) navigateToSlide((currentSlideIndex + 1) % slides.length);
          }
        }, PROGRESS_INTERVAL);
      };

      const stopTimer = () => {
        if (progressAnimation) clearInterval(progressAnimation);
        if (autoSlideTimer) clearTimeout(autoSlideTimer);
        progressAnimation = null; autoSlideTimer = null;
      };

      const safeStartTimer = (delay = 0) => {
        stopTimer();
        if (sliderEnabled && texturesLoaded)
          autoSlideTimer = delay > 0 ? setTimeout(startTimer, delay) : (startTimer(), null);
      };

      // NAVIGATION
      const navigateToSlide = targetIdx => {
        if (isTransitioning || targetIdx === currentSlideIndex) return;
        stopTimer();
        quickResetProgress(currentSlideIndex);

        const from = slideTextures[currentSlideIndex];
        const to = slideTextures[targetIdx];
        if (!from || !to) return;

        isTransitioning = true;
        shaderMaterial.uniforms.uTexture1.value = from;
        shaderMaterial.uniforms.uTexture2.value = to;
        shaderMaterial.uniforms.uTexture1Size.value = from.userData.size;
        shaderMaterial.uniforms.uTexture2Size.value = to.userData.size;

        updateContent(targetIdx);
        currentSlideIndex = targetIdx;
        updateCounter(currentSlideIndex);
        updateNavState(currentSlideIndex);

        gsap.fromTo(shaderMaterial.uniforms.uProgress,
          { value: 0 },
          {
            value: 1,
            duration: TRANSITION_DURATION,
            ease: 'power2.inOut',
            onComplete: () => {
              shaderMaterial.uniforms.uProgress.value = 0;
              shaderMaterial.uniforms.uTexture1.value = to;
              shaderMaterial.uniforms.uTexture1Size.value = to.userData.size;
              isTransitioning = false;
              safeStartTimer(100);
            }
          }
        );
      };

      // TEXTURE LOADER
      const loadTexture = src => new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(src, t => {
          t.minFilter = t.magFilter = THREE.LinearFilter;
          t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
          resolve(t);
        }, undefined, reject);
      });

      // RENDERER INIT
      const initRenderer = async () => {
        const canvas = document.querySelector('.webgl-canvas');
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        try {
          renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
        } catch (e) {
          document.body.classList.add('no-webgl');
          return;
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTexture1:    { value: null },
            uTexture2:    { value: null },
            uProgress:    { value: 0 },
            uResolution:  { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uTexture1Size:{ value: new THREE.Vector2(1, 1) },
            uTexture2Size:{ value: new THREE.Vector2(1, 1) }
          },
          vertexShader,
          fragmentShader
        });

        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

        // Load all textures
        for (const s of slides) {
          try { slideTextures.push(await loadTexture(s.media)); }
          catch { console.warn(`Slider: failed to load ${s.media}`); }
        }

        if (slideTextures.length >= 2) {
          shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
          shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
          shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
          shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
          texturesLoaded = true;
          sliderEnabled = true;
          document.querySelector('.hero').classList.add('loaded');
          safeStartTimer(600);
        }

        // Render loop
        const render = () => { requestAnimationFrame(render); renderer.render(scene, camera); };
        render();
      };

      // SCROLL CUE HIDE
      const setupScrollCue = () => {
        const cue = document.getElementById('scrollCue');
        const about = document.getElementById('about');
        if (!cue || !about) return;
        const obs = new IntersectionObserver(([entry]) => {
          cue.classList.toggle('hidden', entry.isIntersecting);
        }, { threshold: 0.1 });
        obs.observe(about);
      };

      // CLICK TO ADVANCE
      document.querySelector('.hero')?.addEventListener('click', () => {
        if (!isTransitioning && texturesLoaded && sliderEnabled)
          navigateToSlide((currentSlideIndex + 1) % slides.length);
      });

      // RESIZE
      window.addEventListener('resize', () => {
        if (renderer) {
          renderer.setSize(window.innerWidth, window.innerHeight);
          shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        }
      });

      // VISIBILITY
      document.addEventListener('visibilitychange', () =>
        document.hidden ? stopTimer() : (!isTransitioning && safeStartTimer()));

      // INIT
      createNavigation();
      updateCounter(0);
      setupScrollCue();

      // Initial text animation
      const titleEl = document.getElementById('mainTitle');
      const descEl = document.getElementById('mainDesc');
      if (titleEl && descEl) {
        titleEl.innerHTML = splitText(slides[0].title);
        descEl.textContent = slides[0].description;
        gsap.fromTo(titleEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: 'power3.out', delay: 0.4 });
        gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 });
      }

      initRenderer();
    })();
```

**Step 3: Verify the space scene is fully gone**
```bash
grep -n "nebula\|starGroup\|mountainSmooth\|EffectComposer\|composer\|bloomPass\|smoothCam\|atmosphere" portfolio/index.html
```
Expected: 0 results.

**Step 4: Commit**
```bash
git add portfolio/index.html
git commit -m "feat: implement glass slider hero with GSAP text animations"
```

---

## Task 5: Fix `no-webgl` fallback CSS

**Files:**
- Modify: `portfolio/index.html` (CSS `<style>` block, after `.hero` styles)

**Step 1: Add WebGL fallback styles**

Add after the `.scroll-cue.hidden` rule:

```css
/* WebGL unavailable fallback */
.no-webgl .webgl-canvas { display: none; }
.no-webgl .canvas-overlay { display: none; }
.no-webgl .hero {
  background: linear-gradient(135deg, #0b080c 0%, #1a1028 60%, #0b080c 100%);
  display: flex;
  align-items: center;
}
.no-webgl .slide-content { position: relative; bottom: auto; left: auto; padding: 0 2rem; }
```

**Step 2: Commit**
```bash
git add portfolio/index.html
git commit -m "feat: add no-webgl fallback styles for hero"
```

---

## Task 6: Local verification

**Step 1: Start the local preview server**

The portfolio is served via a static server already configured in `.claude/launch.json` as "Portfolio Preview" on port 3000. Start it:
```bash
# Already running? Check:
lsof -ti:3000
# If not, it uses: npx serve portfolio -p 3000
```

**Step 2: Open http://localhost:3000 and verify**

Check each of these manually:
- [ ] Hero fills 100vh, no white flash
- [ ] Canvas fades in (`.hero.loaded` class added) within ~2s (texture load time)
- [ ] Slide 1 title "Data Analyst" animates in with stagger-up letters
- [ ] Auto-timer fires after 5s → transitions to slide 2 "Marketing Analytics" with glass circle expand
- [ ] Slide 2 title uses blur-reveal animation
- [ ] Progress line fills in purple on the active nav dot
- [ ] Clicking a nav dot jumps to that slide
- [ ] Click anywhere on canvas advances slide
- [ ] Counter shows `01 / 05` and updates
- [ ] `↓ SCROLL` cue is visible, disappears on scroll past `#about`
- [ ] Scrolling down reveals About, Skills, etc. sections intact
- [ ] Nav bar still works (highlights active section)
- [ ] No console errors

**Step 3: Check mobile (375px viewport)**
```
Resize browser to 375px wide and verify:
- Title font scales down cleanly
- Nav dot titles hidden (only progress lines show)
- Content doesn't overflow
```

**Step 4: If textures fail to load (CORS)**

Unsplash sometimes has CORS issues. If canvas stays black:
- Open DevTools → Network tab → check if Unsplash images return 200
- If blocked, swap `images.unsplash.com` for `source.unsplash.com` in the slide URLs
- Alternative fallback URLs if needed are listed in the design doc

---

## Task 7: Push to both remotes

**Step 1: Verify clean git state**
```bash
git status
git log --oneline -5
```
Expected: 4-5 new commits from this feature, clean working tree.

**Step 2: Push**
```bash
git push origin main && git push portfolio main
```

**Step 3: Verify Vercel deploy**

Vercel auto-deploys on push. Wait ~60s then check:
```
https://portfolio-two-lovat-85.vercel.app/
```
Verify the slider is live with the same behaviour as local.

---

## Summary of all files touched

| File | Changes |
|---|---|
| `portfolio/index.html` | Remove post-processing scripts; add GSAP script; replace hero HTML; replace hero CSS; replace space scene JS with slider JS; add no-webgl fallback CSS |

**Total commits:** 5–6 atomic commits, one per task.

**Estimated time:** 45–60 minutes implementation + 5 min verification.
