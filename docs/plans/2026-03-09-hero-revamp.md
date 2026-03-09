# Hero Revamp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add aurora background, film grain, kinetic typography, magnetic CTA buttons, and scroll progress bar to the hero section.

**Architecture:** Pure CSS + ~80 lines of vanilla JS injected into the existing single-file portfolio (`portfolio/index.html`). No new dependencies. All animation respects `prefers-reduced-motion`. Five independent tasks, each with a git commit.

**Tech Stack:** CSS `@keyframes`, SVG `feTurbulence`, vanilla JS `mousemove`/`scroll` listeners, existing Three.js r134 sphere (untouched).

---

## Key File Reference

**File:** `portfolio/index.html` (1280 lines, single self-contained file)

| Anchor | Line | Notes |
|---|---|---|
| `</style>` | 596 | Insert all new CSS **before** this line |
| `<body>` | 598 | Insert `#aurora`, `.noise`, `#progress-bar` HTML **after** this line |
| `.eyebrow` | 621 | "Senior Data Analyst" label — JS targets this |
| `<h1>` | 622 | `Praveen<br><span class="name-line">Kumar.</span>` — JS will char-split |
| `.hero-desc` | 623 | Paragraph — JS staggers after h1 |
| `.hero-meta` | 628 | Location/badge row — JS staggers |
| `.hero-actions` | 635 | CTA buttons row — JS staggers |
| `.btn` | 636–637 | Two anchor tags — get magnetic mousemove |
| `</script>` | 1278 | Insert all new JS **before** this line |

---

## Task 1: Scroll Progress Bar

Simplest task first — isolated, no dependencies.

**Files:**
- Modify: `portfolio/index.html:596` (CSS), `portfolio/index.html:598` (HTML), `portfolio/index.html:1278` (JS)

**Step 1: Add HTML element**

Insert immediately after `<body>` (line 598). The new line goes between `<body>` and the `<canvas>`:

```html
<body>

  <div id="progress-bar" aria-hidden="true"></div>

  <canvas id="bg-canvas" aria-hidden="true"></canvas>
```

**Step 2: Add CSS**

Insert the following block just before `</style>` (line 596):

```css
    /* ── SCROLL PROGRESS ── */
    #progress-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      width: 0%;
      background: var(--accent);
      z-index: 1000;
      pointer-events: none;
      transition: width 0.08s linear;
    }
```

**Step 3: Add JS**

Insert immediately before `</script>` (line 1278):

```js
    // ── SCROLL PROGRESS ──
    (function() {
      const bar = document.getElementById('progress-bar');
      window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
        bar.style.width = Math.min(pct, 100) + '%';
      }, { passive: true });
    })();
```

**Step 4: Verify**

Open `http://localhost:3000`, scroll down — a thin `#00ffcc` line should grow from left to right at the very top of the page above the nav.

**Step 5: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add neon scroll progress bar"
```

---

## Task 2: Aurora Background

**Files:**
- Modify: `portfolio/index.html:596` (CSS), `portfolio/index.html:598` (HTML)

**Step 1: Add HTML**

Insert after the `#progress-bar` div (after Task 1 insertion), before `<canvas>`:

```html
  <div id="aurora" aria-hidden="true">
    <div class="aura aura-1"></div>
    <div class="aura aura-2"></div>
    <div class="aura aura-3"></div>
  </div>
```

**Step 2: Add CSS**

Insert immediately before `</style>`:

```css
    /* ── AURORA BACKGROUND ── */
    #aurora {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    }
    .aura {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      will-change: transform;
    }
    .aura-1 {
      width: 600px; height: 400px;
      background: rgba(0, 255, 204, 0.05);
      top: -100px; left: -100px;
      animation: drift1 22s ease-in-out infinite alternate;
    }
    .aura-2 {
      width: 500px; height: 500px;
      background: rgba(80, 32, 128, 0.04);
      top: 20%; right: -150px;
      animation: drift2 28s ease-in-out infinite alternate;
    }
    .aura-3 {
      width: 700px; height: 300px;
      background: rgba(0, 68, 102, 0.03);
      bottom: -80px; left: 20%;
      animation: drift3 35s ease-in-out infinite alternate;
    }
    @keyframes drift1 {
      from { transform: translate(0, 0); }
      to   { transform: translate(120px, 80px); }
    }
    @keyframes drift2 {
      from { transform: translate(0, 0); }
      to   { transform: translate(-80px, 100px); }
    }
    @keyframes drift3 {
      from { transform: translate(0, 0); }
      to   { transform: translate(-100px, -60px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .aura { animation: none; }
    }
```

**Step 3: Verify**

Reload `http://localhost:3000`. The hero should have a subtle atmospheric glow — very faint cyan top-left, faint purple top-right. If it looks too strong, the opacities (0.05, 0.04, 0.03) can be halved.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add subtle aurora background blobs"
```

---

## Task 3: Film Grain Noise Overlay

**Files:**
- Modify: `portfolio/index.html:596` (CSS), `portfolio/index.html:598` (HTML)

**Step 1: Add SVG filter + HTML**

Insert after the `#aurora` div (after Task 2), before `<canvas>`:

```html
  <!-- Film grain SVG filter -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </svg>
  <div class="noise" aria-hidden="true"></div>
```

**Step 2: Add CSS**

Insert immediately before `</style>`:

```css
    /* ── FILM GRAIN ── */
    .noise {
      position: fixed;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      filter: url(#grain);
      mix-blend-mode: overlay;
      opacity: 0.04;
    }
    @media (prefers-reduced-motion: reduce) {
      .noise { display: none; }
    }
```

**Step 3: Verify**

Reload `http://localhost:3000`. Zoom in on the hero — there should be a very subtle texture/grain over the dark background. It's most visible at 150–200% zoom. At normal zoom it reads as depth.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add SVG film grain noise overlay"
```

---

## Task 4: Kinetic Typography

This is the most involved task. A JS function splits the `<h1>` into per-character spans and staggers their animation.

**Files:**
- Modify: `portfolio/index.html:596` (CSS), `portfolio/index.html:1278` (JS)

**Step 1: Add CSS**

Insert immediately before `</style>`:

```css
    /* ── KINETIC TYPOGRAPHY ── */

    /* Hide hero text elements initially (JS will reveal them) */
    .hero-text .eyebrow,
    .hero-text h1,
    .hero-text .hero-desc,
    .hero-text .hero-meta,
    .hero-text .hero-actions {
      opacity: 0;
    }

    /* Individual char spans injected by JS */
    .char {
      display: inline-block;
      opacity: 0;
      transform: translateY(20px);
      animation: charRise 0.5s ease forwards;
    }

    @keyframes charRise {
      to { opacity: 1; transform: translateY(0); }
    }

    /* Shimmer sweep on h1 after chars settle */
    .hero-text h1.shimmer {
      background: linear-gradient(
        90deg,
        #f0f0f0 0%,
        #00ffcc 35%,
        #f0f0f0 50%,
        #00ffcc 65%,
        #f0f0f0 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerSweep 1.0s ease forwards;
    }

    @keyframes shimmerSweep {
      from { background-position: 100% center; }
      to   { background-position: 0% center; }
    }

    /* After shimmer: restore original colors */
    .hero-text h1.shimmer-done {
      background: none;
      -webkit-text-fill-color: inherit;
      color: var(--text-primary);
    }
    .hero-text h1.shimmer-done .name-line {
      color: var(--accent);
    }

    /* Staggered section reveals */
    .hero-text .eyebrow.reveal-hero,
    .hero-text .hero-desc.reveal-hero,
    .hero-text .hero-meta.reveal-hero,
    .hero-text .hero-actions.reveal-hero {
      animation: heroFadeUp 0.5s ease forwards;
    }

    @keyframes heroFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* prefers-reduced-motion: show everything immediately */
    @media (prefers-reduced-motion: reduce) {
      .hero-text .eyebrow,
      .hero-text h1,
      .hero-text .hero-desc,
      .hero-text .hero-meta,
      .hero-text .hero-actions { opacity: 1; }
      .char { opacity: 1; transform: none; animation: none; }
    }
```

**Step 2: Add JS**

Insert immediately before `</script>`:

```js
    // ── KINETIC TYPOGRAPHY ──
    (function() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Split h1 text nodes into <span class="char"> per character
      function splitChars(el) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;
        while ((node = walker.nextNode())) nodes.push(node);
        nodes.forEach(textNode => {
          const frag = document.createDocumentFragment();
          [...textNode.textContent].forEach(ch => {
            if (ch === ' ') {
              frag.appendChild(document.createTextNode(' '));
            } else {
              const span = document.createElement('span');
              span.className = 'char';
              span.textContent = ch;
              frag.appendChild(span);
            }
          });
          textNode.parentNode.replaceChild(frag, textNode);
        });
        return el.querySelectorAll('.char');
      }

      const h1 = document.querySelector('.hero-text h1');
      const eyebrow = document.querySelector('.hero-text .eyebrow');
      const desc = document.querySelector('.hero-text .hero-desc');
      const meta = document.querySelector('.hero-text .hero-meta');
      const actions = document.querySelector('.hero-text .hero-actions');

      const chars = splitChars(h1);
      let lastCharDelay = 0;

      // Stagger eyebrow first
      setTimeout(() => {
        eyebrow.classList.add('reveal-hero');
      }, 150);

      // Stagger chars in h1 starting at 350ms
      chars.forEach((span, i) => {
        const delay = 350 + i * 38;
        span.style.animationDelay = delay + 'ms';
        lastCharDelay = delay + 500; // 500ms = charRise duration
      });

      // After last char settles: shimmer sweep
      setTimeout(() => {
        h1.classList.add('shimmer');
        setTimeout(() => {
          h1.classList.remove('shimmer');
          h1.classList.add('shimmer-done');
        }, 1000);
      }, lastCharDelay);

      // Stagger remaining hero sections
      setTimeout(() => desc.classList.add('reveal-hero'), 500);
      setTimeout(() => meta.classList.add('reveal-hero'), 700);
      setTimeout(() => actions.classList.add('reveal-hero'), 900);
    })();
```

**Step 3: Verify**

Reload `http://localhost:3000` with a hard refresh (Cmd+Shift+R). You should see:
1. "SENIOR DATA ANALYST" eyebrow fades up at ~150ms
2. Each character of "Praveen Kumar." rises individually from ~350ms onward
3. After the last char settles, a gradient shimmer sweeps across the h1 once
4. Description, meta, and buttons stagger in after

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add kinetic typography — per-char stagger + shimmer sweep"
```

---

## Task 5: Magnetic CTA Buttons

**Files:**
- Modify: `portfolio/index.html:596` (CSS), `portfolio/index.html:1278` (JS)

**Step 1: Add CSS**

Insert immediately before `</style>`:

```css
    /* ── MAGNETIC BUTTONS ── */
    .btn {
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                  background 0.25s ease,
                  border-color 0.25s ease,
                  color 0.25s ease;
    }
```

**Step 2: Add JS**

Insert immediately before `</script>`:

```js
    // ── MAGNETIC BUTTONS ──
    (function() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width  / 2)) * 0.35;
          const y = (e.clientY - (r.top  + r.height / 2)) * 0.35;
          btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    })();
```

**Step 3: Verify**

Reload and hover slowly over "Get In Touch" and "View Experience" buttons — they should drift slightly toward the cursor, snapping back smoothly on leave.

**Step 4: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add magnetic hover effect to CTA buttons"
```

---

## Final Check

After all 5 tasks:

- [ ] Scroll progress bar grows along top edge when scrolling
- [ ] Subtle aurora blobs visible in hero background (faint cyan/purple)
- [ ] Film grain texture adds depth (visible at 150% zoom)
- [ ] Hero text reveals with per-char stagger on fresh page load
- [ ] Shimmer sweeps once across h1 then disappears
- [ ] Buttons drift toward cursor on hover, snap back on leave
- [ ] `prefers-reduced-motion: reduce` → all text visible immediately, no animations
- [ ] No console errors (favicon 404 is pre-existing and harmless)
- [ ] Three.js particle sphere still renders correctly
