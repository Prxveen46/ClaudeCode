# Dashboard Mockups Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add animated CSS/SVG mini-dashboard panels to the top of each project card in `portfolio/index.html` — fake OS window chrome, KPI tiles, animated bar chart, and animated sparkline — all triggered by the existing scroll reveal observer.

**Architecture:** Pure inline CSS + SVG, zero new dependencies. Each `.card-mockup` panel is injected before `.project-number` in each card. CSS animations use `transform: scaleY()` for bars and `stroke-dashoffset` for sparklines, both triggered when the parent `.project-card` receives the `.visible` class from the existing `IntersectionObserver`.

**Tech Stack:** Pure CSS keyframe animations, inline SVG `<rect>` + `<polyline>`, vanilla JS (no additions — piggybacks on existing observer). File modified: `/Users/praveenkumar/ClaudeCode/portfolio/index.html`

---

### Task 1: Add card mockup CSS

**Files:**
- Modify: `portfolio/index.html` — inside `<style>` block, after the `/* ── PROJECTS ── */` section (around line 385, after `.tech-tag {}`)

**Step 1: Insert the mockup CSS block**

Find this exact line in the CSS (comes right after `.tech-tag { ... }`):

```css
    /* ── EDUCATION ── */
```

Insert the following block BEFORE it:

```css
    /* ── CARD MOCKUP ── */
    .card-mockup {
      background: #050505;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      margin: -2rem -2rem 1.75rem -2rem;
      overflow: hidden;
    }
    .mock-chrome {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.55rem 0.85rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      background: rgba(255,255,255,0.015);
    }
    .mock-dots { display: flex; gap: 4px; }
    .mock-dots span {
      width: 7px; height: 7px;
      border-radius: 50%;
      opacity: 0.8;
    }
    .mock-dots span:nth-child(1) { background: #ff5f57; }
    .mock-dots span:nth-child(2) { background: #febc2e; }
    .mock-dots span:nth-child(3) { background: #28c840; }
    .mock-chrome-label {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: var(--text-muted);
      letter-spacing: 0.06em;
    }
    .mock-body { padding: 0.8rem 0.85rem 0.85rem; }
    .mock-kpis { display: flex; gap: 0.4rem; margin-bottom: 0.75rem; }
    .mock-kpi {
      flex: 1;
      border: 1px solid rgba(255,255,255,0.05);
      padding: 0.45rem 0.5rem;
      background: rgba(255,255,255,0.02);
    }
    .mock-kpi-value {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
      margin-bottom: 0.2rem;
    }
    .mock-kpi-label {
      font-family: var(--font-mono);
      font-size: 0.56rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .mock-charts {
      display: flex;
      gap: 0.5rem;
      height: 52px;
      align-items: flex-end;
    }
    .mock-bars { flex: 3; height: 100%; }
    .mock-bars svg { width: 100%; height: 100%; display: block; }
    .mock-spark { flex: 2; height: 100%; }
    .mock-spark svg { width: 100%; height: 100%; display: block; }

    /* Bar grow animation — triggered by .visible on parent card */
    .mock-bar {
      transform-box: fill-box;
      transform-origin: 50% 100%;
      transform: scaleY(0);
    }
    .project-card.visible .mock-bar {
      animation: growBar 0.45s ease forwards;
    }
    .project-card.visible .mock-bar:nth-child(1) { animation-delay: 0.05s; }
    .project-card.visible .mock-bar:nth-child(2) { animation-delay: 0.10s; }
    .project-card.visible .mock-bar:nth-child(3) { animation-delay: 0.15s; }
    .project-card.visible .mock-bar:nth-child(4) { animation-delay: 0.20s; }
    .project-card.visible .mock-bar:nth-child(5) { animation-delay: 0.25s; }
    .project-card.visible .mock-bar:nth-child(6) { animation-delay: 0.30s; }
    .project-card.visible .mock-bar:nth-child(7) { animation-delay: 0.35s; }
    .project-card.visible .mock-bar:nth-child(8) { animation-delay: 0.40s; }
    @keyframes growBar {
      from { transform: scaleY(0); }
      to   { transform: scaleY(1); }
    }

    /* Sparkline draw animation */
    .mock-spark-line {
      stroke-dasharray: 220;
      stroke-dashoffset: 220;
    }
    .project-card.visible .mock-spark-line {
      animation: drawLine 0.9s ease forwards;
      animation-delay: 0.35s;
    }
    @keyframes drawLine {
      to { stroke-dashoffset: 0; }
    }
```

**Step 2: Verify CSS added correctly**

Open `http://localhost:3000` in browser. No visual change yet (HTML not added). DevTools → Sources confirms no CSS parse errors.

**Step 3: Commit**

```bash
cd /Users/praveenkumar/ClaudeCode
git add portfolio/index.html
git commit -m "feat: add card mockup CSS — chrome, KPI, bar/sparkline animations"
```

---

### Task 2: Add mockup HTML to Card 01 — Trending Travel Dashboard

**Files:**
- Modify: `portfolio/index.html` — first project card (lines ~736–746)

**Step 1: Find the first project card opening**

Locate:
```html
        <div class="project-card glass-card reveal reveal-d1">
          <div class="project-number">01</div>
```

**Step 2: Insert the mockup HTML between them**

Replace with:
```html
        <div class="project-card glass-card reveal reveal-d1">
          <!-- MOCKUP: Trending Travel Dashboard -->
          <div class="card-mockup">
            <div class="mock-chrome">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-chrome-label">powerbi · azure-cosmos · scope</span>
            </div>
            <div class="mock-body">
              <div class="mock-kpis">
                <div class="mock-kpi">
                  <div class="mock-kpi-value">+18%</div>
                  <div class="mock-kpi-label">YoY Growth</div>
                </div>
                <div class="mock-kpi">
                  <div class="mock-kpi-value">+7%</div>
                  <div class="mock-kpi-label">WoW Trend</div>
                </div>
                <div class="mock-kpi">
                  <div class="mock-kpi-value">2.4M</div>
                  <div class="mock-kpi-label">Searches</div>
                </div>
              </div>
              <div class="mock-charts">
                <!-- Bar chart: monthly keyword volume (8 months) -->
                <div class="mock-bars">
                  <svg viewBox="0 0 100 52" preserveAspectRatio="none">
                    <!-- Grid lines -->
                    <line x1="0" y1="13" x2="100" y2="13" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <line x1="0" y1="26" x2="100" y2="26" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <line x1="0" y1="39" x2="100" y2="39" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <!-- Bars: heights = [40,55,48,70,85,62,90,78]% of 52 -->
                    <rect class="mock-bar" x="1"  y="31" width="9" height="21" fill="rgba(0,255,204,0.55)"/>
                    <rect class="mock-bar" x="13" y="23" width="9" height="29" fill="rgba(0,255,204,0.35)"/>
                    <rect class="mock-bar" x="25" y="27" width="9" height="25" fill="rgba(0,255,204,0.55)"/>
                    <rect class="mock-bar" x="37" y="15" width="9" height="37" fill="rgba(0,255,204,0.35)"/>
                    <rect class="mock-bar" x="49" y="8"  width="9" height="44" fill="rgba(0,255,204,0.65)"/>
                    <rect class="mock-bar" x="61" y="20" width="9" height="32" fill="rgba(0,255,204,0.35)"/>
                    <rect class="mock-bar" x="73" y="5"  width="9" height="47" fill="rgba(0,255,204,0.75)"/>
                    <rect class="mock-bar" x="85" y="11" width="9" height="41" fill="rgba(0,255,204,0.55)"/>
                  </svg>
                </div>
                <!-- Sparkline: click index trend (rising) -->
                <div class="mock-spark">
                  <svg viewBox="0 0 100 52" preserveAspectRatio="none">
                    <polyline class="mock-spark-line"
                      points="0,41 11,38 22,40 33,33 44,31 55,32 66,23 77,20 88,22 100,14"
                      fill="none" stroke="#00ffcc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <!-- End dot -->
                    <circle cx="100" cy="14" r="2.5" fill="#00ffcc" opacity="0"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="project-number">01</div>
```

**Step 3: Verify in browser**

Open `http://localhost:3000`, scroll to Projects section. Card 01 should show:
- Dark panel with 3 colored dots + "powerbi · azure-cosmos · scope" label
- 3 KPI tiles: +18% YoY | +7% WoW | 2.4M Searches
- On scroll into view: 8 bars animate upward, sparkline draws itself

**Step 4: Commit**

```bash
cd /Users/praveenkumar/ClaudeCode
git add portfolio/index.html
git commit -m "feat: add dashboard mockup to card 01 — trending travel dashboard"
```

---

### Task 3: Add mockup HTML to Card 02 — Consumer Decision Journey Tool

**Files:**
- Modify: `portfolio/index.html` — second project card (lines ~747–757)

**Step 1: Find the second project card opening**

Locate:
```html
        <div class="project-card glass-card reveal reveal-d2">
          <div class="project-number">02</div>
```

**Step 2: Insert the mockup HTML between them**

Replace with:
```html
        <div class="project-card glass-card reveal reveal-d2">
          <!-- MOCKUP: Consumer Decision Journey Tool -->
          <div class="card-mockup">
            <div class="mock-chrome">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-chrome-label">powerbi · python · sql · funnel</span>
            </div>
            <div class="mock-body">
              <div class="mock-kpis">
                <div class="mock-kpi">
                  <div class="mock-kpi-value">3.2x</div>
                  <div class="mock-kpi-label">Funnel Eff.</div>
                </div>
                <div class="mock-kpi">
                  <div class="mock-kpi-value">+10%</div>
                  <div class="mock-kpi-label">ROI Lift</div>
                </div>
                <div class="mock-kpi">
                  <div class="mock-kpi-value">15+</div>
                  <div class="mock-kpi-label">Dashboards</div>
                </div>
              </div>
              <div class="mock-charts">
                <!-- Bar chart: funnel stage conversion (5 stages, descending) -->
                <div class="mock-bars">
                  <svg viewBox="0 0 100 52" preserveAspectRatio="none">
                    <line x1="0" y1="13" x2="100" y2="13" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <line x1="0" y1="26" x2="100" y2="26" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <line x1="0" y1="39" x2="100" y2="39" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <!-- Bars: heights = [100,72,48,30,18]% of 52 — funnel shape -->
                    <rect class="mock-bar" x="8"  y="0"  width="13" height="52" fill="rgba(0,255,204,0.70)"/>
                    <rect class="mock-bar" x="27" y="15" width="13" height="37" fill="rgba(0,255,204,0.55)"/>
                    <rect class="mock-bar" x="46" y="27" width="13" height="25" fill="rgba(0,255,204,0.45)"/>
                    <rect class="mock-bar" x="65" y="36" width="13" height="16" fill="rgba(0,255,204,0.35)"/>
                    <rect class="mock-bar" x="84" y="43" width="13" height="9"  fill="rgba(0,255,204,0.25)"/>
                  </svg>
                </div>
                <!-- Sparkline: user intent score (gradual rise) -->
                <div class="mock-spark">
                  <svg viewBox="0 0 100 52" preserveAspectRatio="none">
                    <polyline class="mock-spark-line"
                      points="0,47 11,45 22,43 33,41 44,38 55,34 66,31 77,27 88,24 100,20"
                      fill="none" stroke="#00ffcc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="100" cy="20" r="2.5" fill="#00ffcc" opacity="0"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="project-number">02</div>
```

**Step 3: Verify in browser**

Card 02 should show:
- 3 KPI tiles: 3.2x Funnel | +10% ROI | 15+ Dashboards
- 5 bars descending (funnel shape — tallest left, shortest right)
- Sparkline with steady upward slope

**Step 4: Commit**

```bash
cd /Users/praveenkumar/ClaudeCode
git add portfolio/index.html
git commit -m "feat: add dashboard mockup to card 02 — consumer decision journey"
```

---

### Task 4: Add mockup HTML to Card 03 — Query Pathing Tool

**Files:**
- Modify: `portfolio/index.html` — third project card (lines ~758–768)

**Step 1: Find the third project card opening**

Locate:
```html
        <div class="project-card glass-card reveal reveal-d3">
          <div class="project-number">03</div>
```

**Step 2: Insert the mockup HTML between them**

Replace with:
```html
        <div class="project-card glass-card reveal reveal-d3">
          <!-- MOCKUP: Query Pathing Tool -->
          <div class="card-mockup">
            <div class="mock-chrome">
              <div class="mock-dots"><span></span><span></span><span></span></div>
              <span class="mock-chrome-label">sql · azure · geo-analytics</span>
            </div>
            <div class="mock-body">
              <div class="mock-kpis">
                <div class="mock-kpi">
                  <div class="mock-kpi-value">+30%</div>
                  <div class="mock-kpi-label">DB Perf.</div>
                </div>
                <div class="mock-kpi">
                  <div class="mock-kpi-value">99%+</div>
                  <div class="mock-kpi-label">SLA Rate</div>
                </div>
                <div class="mock-kpi">
                  <div class="mock-kpi-value">+10%</div>
                  <div class="mock-kpi-label">ROI Boost</div>
                </div>
              </div>
              <div class="mock-charts">
                <!-- Bar chart: query resolution time by region (6 regions) -->
                <div class="mock-bars">
                  <svg viewBox="0 0 100 52" preserveAspectRatio="none">
                    <line x1="0" y1="13" x2="100" y2="13" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <line x1="0" y1="26" x2="100" y2="26" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <line x1="0" y1="39" x2="100" y2="39" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
                    <!-- Bars: heights = [85,60,75,50,90,65]% of 52 -->
                    <rect class="mock-bar" x="3"  y="8"  width="11" height="44" fill="rgba(0,255,204,0.60)"/>
                    <rect class="mock-bar" x="19" y="21" width="11" height="31" fill="rgba(0,255,204,0.40)"/>
                    <rect class="mock-bar" x="35" y="13" width="11" height="39" fill="rgba(0,255,204,0.55)"/>
                    <rect class="mock-bar" x="51" y="26" width="11" height="26" fill="rgba(0,255,204,0.35)"/>
                    <rect class="mock-bar" x="67" y="5"  width="11" height="47" fill="rgba(0,255,204,0.70)"/>
                    <rect class="mock-bar" x="83" y="18" width="11" height="34" fill="rgba(0,255,204,0.45)"/>
                  </svg>
                </div>
                <!-- Sparkline: SLA compliance trend (high, stable near top) -->
                <div class="mock-spark">
                  <svg viewBox="0 0 100 52" preserveAspectRatio="none">
                    <polyline class="mock-spark-line"
                      points="0,8 11,6 22,7 33,5 44,4 55,5 66,3 77,3 88,4 100,1"
                      fill="none" stroke="#00ffcc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="100" cy="1" r="2.5" fill="#00ffcc" opacity="0"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="project-number">03</div>
```

**Step 3: Verify in browser**

Card 03 should show:
- 3 KPI tiles: +30% DB Perf | 99%+ SLA | +10% ROI
- 6 bars with varied heights (not a funnel — regional variation)
- Sparkline flat near the top of the chart (representing consistently high SLA)

**Step 4: Commit**

```bash
cd /Users/praveenkumar/ClaudeCode
git add portfolio/index.html
git commit -m "feat: add dashboard mockup to card 03 — query pathing tool"
```

---

### Task 5: Trigger sparkline end-dot fade-in

**Files:**
- Modify: `portfolio/index.html` — CSS block

**Step 1: Add end-dot animation CSS** (after `.project-card.visible .mock-spark-line` rule)

```css
    .project-card.visible .mock-spark svg circle {
      animation: dotFade 0.3s ease forwards;
      animation-delay: 1.25s;
    }
    @keyframes dotFade {
      to { opacity: 1; }
    }
```

This makes the cyan end-dot on each sparkline pop in after the line finishes drawing — a small but polished touch.

**Step 2: Verify**

Reload and scroll to Projects. After each sparkline finishes drawing (~1.25s after card becomes visible), a small cyan dot appears at the end of the line.

**Step 3: Commit**

```bash
cd /Users/praveenkumar/ClaudeCode
git add portfolio/index.html
git commit -m "feat: add sparkline end-dot fade-in animation"
```

---

### Task 6: Final visual verification

**Step 1: Check all 3 cards in browser**

- [ ] All 3 cards have the dark mockup panel at the top
- [ ] Window chrome dots (red/yellow/green) visible in each
- [ ] Each card has the correct tool label in the chrome bar
- [ ] 3 KPI tiles per card with correct values
- [ ] Bars animate upward staggered when scrolling to Projects section
- [ ] Sparkline draws itself left-to-right after bars
- [ ] End dot appears on each sparkline
- [ ] Card 02 bars are funnel-shaped (descending left to right)
- [ ] Card 03 sparkline is flat near top (high SLA)
- [ ] 3D card tilt still works on hover
- [ ] Cyan top-border sweep on hover still works
- [ ] No console errors

**Step 2: Check mobile (resize to 375px)**

- [ ] Mockup panels still visible
- [ ] KPI tiles don't overflow
- [ ] Charts scale correctly (SVG is responsive)

**Step 3: Final commit if any small fixes were made**

```bash
cd /Users/praveenkumar/ClaudeCode
git add portfolio/index.html
git commit -m "fix: dashboard mockup final visual polish"
```
