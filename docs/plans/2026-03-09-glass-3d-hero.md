# Glass 3D Hero Objects — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the particle sphere with 3 wireframe-glass 3D objects (torus, icosahedron, octahedron) that orbit/float with mouse parallax.

**Architecture:** Rewrite the Three.js IIFE (lines 1313–1400 in `portfolio/index.html`) keeping the same canvas, renderer, camera, mouse-tracking, and resize handler. Add lighting + `MeshPhysicalMaterial` glass bodies + `LineSegments` wireframe overlays. Animate with orbits + self-rotation + mouse parallax in the existing rAF loop.

**Tech Stack:** Three.js r134 (already loaded via CDN), vanilla JS, single-file `portfolio/index.html`

**Design doc:** `docs/plans/2026-03-09-glass-3d-hero-design.md`

---

### Task 1: Replace scene objects — lighting + glass geometries + wireframes

**Files:**
- Modify: `portfolio/index.html:1313-1400` (the Three.js IIFE body inside `try { ... } catch`)

**Step 1: Replace the entire Three.js IIFE body**

Replace lines 1313–1400 (from `try { (function() {` through `})(); } catch(e) { ... }`) with:

```js
    // ── THREE.JS SCENE ──
    try { (function() {
      const canvas = document.getElementById('bg-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // ── ENVIRONMENT MAP (for glass refraction) ──
      // Generate a simple env from the lit scene itself
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      // Build a tiny env scene with colored lights
      const envScene = new THREE.Scene();
      envScene.add(new THREE.AmbientLight(0x111111));
      const envLight1 = new THREE.DirectionalLight(0x00ffcc, 0.8);
      envLight1.position.set(2, 3, 2);
      envScene.add(envLight1);
      const envLight2 = new THREE.DirectionalLight(0x1a1a2e, 0.4);
      envLight2.position.set(-2, -1, -2);
      envScene.add(envLight2);
      // Small sphere to reflect off of
      envScene.add(new THREE.Mesh(
        new THREE.IcosahedronGeometry(1, 1),
        new THREE.MeshStandardMaterial({ color: 0x080808 })
      ));
      const envMap = pmremGenerator.fromScene(envScene, 0, 0.1, 100).texture;
      scene.environment = envMap;
      pmremGenerator.dispose();

      // ── LIGHTING ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const keyLight = new THREE.DirectionalLight(0x00ffcc, 0.6);
      keyLight.position.set(2, 3, 2);
      scene.add(keyLight);
      const rimLight = new THREE.PointLight(0xffffff, 0.4);
      rimLight.position.set(0, 0, 5);
      scene.add(rimLight);

      // ── BACKGROUND PARTICLES (subtle star field) ──
      const bgGeo = new THREE.BufferGeometry();
      const bgCount = 500;
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount * 3; i++) bgPos[i] = (Math.random() - 0.5) * 40;
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      const bgMat = new THREE.PointsMaterial({ color: 0x00ffcc, size: 0.03, transparent: true, opacity: 0.15 });
      scene.add(new THREE.Points(bgGeo, bgMat));

      // ── GLASS MATERIAL ──
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a2e,
        transmission: 0.92,
        roughness: 0.08,
        thickness: 0.5,
        ior: 1.5,
        envMapIntensity: 1.0,
        transparent: true,
        side: THREE.DoubleSide,
      });

      // ── WIREFRAME MATERIAL ──
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.35,
      });

      // ── HELPER: create glass object with wireframe overlay ──
      function createGlassObject(geometry) {
        const group = new THREE.Group();
        // Glass body
        group.add(new THREE.Mesh(geometry, glassMat));
        // Wireframe overlay
        group.add(new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireMat));
        return group;
      }

      // ── OBJECTS ──
      const torus = createGlassObject(new THREE.TorusGeometry(1.2, 0.35, 32, 64));
      const ico   = createGlassObject(new THREE.IcosahedronGeometry(0.6, 0));
      const octa  = createGlassObject(new THREE.OctahedronGeometry(0.4, 0));

      // ── MAIN GROUP ──
      const glassGroup = new THREE.Group();
      glassGroup.add(torus);
      glassGroup.add(ico);
      glassGroup.add(octa);
      glassGroup.position.set(2.0, 0.2, 0);
      scene.add(glassGroup);

      // ── MOUSE TRACKING ──
      let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
      document.addEventListener('mousemove', e => {
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
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let frame = 0;
      (function animate() {
        requestAnimationFrame(animate);
        frame++;

        if (!reducedMotion) {
          // Torus: slow Y rotation in place
          torus.rotation.y = frame * 0.003;

          // Icosahedron: orbit clockwise at radius 2.0 + self-spin
          const icoAngle = frame * 0.008;
          ico.position.x = Math.cos(icoAngle) * 2.0;
          ico.position.z = Math.sin(icoAngle) * 2.0;
          ico.position.y = Math.sin(icoAngle * 0.5) * 0.3; // gentle bob
          ico.rotation.x = frame * 0.005;
          ico.rotation.y = frame * 0.005;

          // Octahedron: counter-orbit at radius 1.5
          const octaAngle = -frame * 0.006;
          octa.position.x = Math.cos(octaAngle) * 1.5;
          octa.position.z = Math.sin(octaAngle) * 1.5;
          octa.position.y = Math.cos(octaAngle * 0.7) * 0.2;
          octa.rotation.z = frame * 0.004;

          // Mouse parallax on whole group
          targetX += (mouseX - targetX) * 0.035;
          targetY += (mouseY - targetY) * 0.035;
          glassGroup.rotation.y = frame * 0.001 + targetX * 0.35;
          glassGroup.rotation.x = targetY * 0.2;
        }

        renderer.render(scene, camera);
      })();
    })(); } catch(e) { /* WebGL unavailable — glass objects skipped, rest of page continues */ }
```

**Step 2: Verify the edit**

Run the preview server and take a screenshot to confirm:
- 3 glass objects visible right-of-center
- Wireframe edges in cyan (#00ffcc)
- Glass bodies are translucent with subtle refraction
- Objects orbit/rotate smoothly
- Hero text remains visible and unaffected on the left
- Aurora, grain, kinetic typography, magnetic CTAs, scroll bar all still work

**Step 3: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: replace particle sphere with wireframe-glass 3D objects (torus, icosahedron, octahedron)"
```

---

### Task 2: Fallback — handle missing transmission support

**Files:**
- Modify: `portfolio/index.html` (inside the Three.js IIFE just written)

**Step 1: Add fallback detection**

In the glass material section, wrap the `MeshPhysicalMaterial` in a try-catch and fall back to `MeshStandardMaterial` if `transmission` causes issues on older GPUs:

Replace the `// ── GLASS MATERIAL ──` block with:

```js
      // ── GLASS MATERIAL ──
      let glassMat;
      try {
        glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x1a1a2e,
          transmission: 0.92,
          roughness: 0.08,
          thickness: 0.5,
          ior: 1.5,
          envMapIntensity: 1.0,
          transparent: true,
          side: THREE.DoubleSide,
        });
        // Force a test compile to catch GPU issues early
        renderer.compile(scene, camera);
      } catch(matErr) {
        glassMat = new THREE.MeshStandardMaterial({
          color: 0x1a1a2e,
          transparent: true,
          opacity: 0.15,
          roughness: 0.2,
          metalness: 0.8,
          side: THREE.DoubleSide,
        });
      }
```

**Step 2: Verify fallback**

Take a screenshot — visually should look the same on a modern GPU. The fallback only activates on older hardware.

**Step 3: Commit**

```bash
git add portfolio/index.html
git commit -m "feat: add glass material fallback for older GPUs"
```

---

### Task 3: Visual tuning + push to GitHub

**Files:**
- Modify: `portfolio/index.html` (minor tweaks if needed)

**Step 1: Take screenshot and verify visual quality**

Check:
- [ ] Glass refraction visible on objects
- [ ] Wireframe edges are subtle cyan, not overpowering
- [ ] Orbits look smooth (icosahedron clockwise, octahedron counter-clockwise)
- [ ] Torus rotation is gentle
- [ ] Mouse parallax works on hover
- [ ] Hero text ("Praveen Kumar.") fully visible
- [ ] Aurora blobs still visible behind glass objects
- [ ] Film grain overlay intact
- [ ] Kinetic typography loads (eyebrow → chars → shimmer → desc → meta → actions)
- [ ] Scroll progress bar works
- [ ] Magnetic CTA buttons work
- [ ] No console errors

**Step 2: Tune if needed**

Potential adjustments (only if visual check reveals issues):
- `wireMat.opacity` — increase to 0.5 if edges too faint, decrease to 0.2 if too loud
- `glassMat.transmission` — decrease to 0.7 if objects too invisible
- `bgMat.opacity` — adjust background particle brightness
- `keyLight.intensity` — increase if glass too dark

**Step 3: Final commit and push**

```bash
git add portfolio/index.html
git commit -m "chore: tune glass object visual parameters"
git push portfolio main
```
