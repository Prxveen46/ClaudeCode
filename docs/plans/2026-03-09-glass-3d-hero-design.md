# Glass 3D Hero Objects — Design

**Date:** 2026-03-09
**File:** `portfolio/index.html` (single-file portfolio)
**Scope:** Replace Three.js particle sphere with wireframe-glass 3D objects
**Dependencies:** None new — Three.js r134 already loaded

---

## Goal

Replace the existing particle sphere with 3 minimalist wireframe-glass hybrid objects that orbit/float each other. Keeps the dark cinematic feel while adding a modern glassmorphic 3D aesthetic.

---

## Object Composition

3 glass primitives positioned right-of-center (same area as current sphere):

| Object | Geometry | Size | Orbit Radius | Role |
|--------|----------|------|-------------|------|
| Torus (primary) | `TorusGeometry(1.2, 0.35, 32, 64)` | Largest | Center (no orbit) | Anchor — slow Y rotation |
| Icosahedron (secondary) | `IcosahedronGeometry(0.6, 0)` | Medium | 2.0 | Satellite — orbits + spins |
| Octahedron (accent) | `OctahedronGeometry(0.4, 0)` | Smallest | 1.5 (opposite dir) | Counter-orbit — adds depth |

### Dual-Layer Rendering

Each object has two overlaid meshes:

1. **Glass body** — `MeshPhysicalMaterial`:
   - `transmission: 0.9` (highly transparent)
   - `roughness: 0.1` (near mirror-smooth)
   - `thickness: 0.5` (refraction depth)
   - `color: #1a1a2e` (dark blue-black tint)
   - `ior: 1.5` (glass index of refraction)
   - `envMapIntensity: 1.0`

2. **Wireframe overlay** — `LineSegments` + `WireframeGeometry`:
   - `LineBasicMaterial({ color: #00ffcc, opacity: 0.35, transparent: true })`
   - Matches existing `--accent` color system

### Group Position

`group.position.set(2.0, 0.2, 0)` — identical to current sphere placement. Hero text layout untouched.

---

## Motion

### Rotation

| Object | Self-Rotation | Orbit Speed | Orbit Direction |
|--------|--------------|-------------|-----------------|
| Torus | Y: 0.003 rad/frame | N/A (stationary) | — |
| Icosahedron | X+Y: 0.005 rad/frame | 0.008 rad/frame | Clockwise |
| Octahedron | Z: 0.004 rad/frame | 0.006 rad/frame | Counter-clockwise |

- Torus: one full rotation every ~35 seconds (same pace as old sphere)
- Icosahedron: completes orbit every ~13 seconds
- Octahedron: completes orbit every ~17 seconds

### Mouse Parallax

Reuse existing pattern — entire group tilts toward cursor:
```js
targetX += (mouseX - targetX) * 0.035;
targetY += (mouseY - targetY) * 0.035;
group.rotation.y = frame * 0.003 + targetX * 0.35;
group.rotation.x = targetY * 0.2;
```

### `prefers-reduced-motion`

All rotation and orbits stop. Objects render static in default positions. Mouse parallax disabled.

---

## Lighting

| Light | Type | Color | Intensity | Position/Direction |
|-------|------|-------|-----------|-------------------|
| Fill | AmbientLight | #ffffff | 0.3 | Omnidirectional |
| Key | DirectionalLight | #00ffcc | 0.6 | Top-right (2, 3, 2) |
| Rim | PointLight | #ffffff | 0.4 | Behind camera (0, 0, 5) |

The cyan-tinted key light creates subtle accent reflections on the glass surfaces, tying into the existing color system.

---

## Environment Map

`MeshPhysicalMaterial` with `transmission` needs an environment map for refraction. Use Three.js built-in `RoomEnvironment` generator:

```js
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const envMap = pmremGenerator.fromScene(new RoomEnvironment()).texture;
scene.environment = envMap;
```

Note: `RoomEnvironment` is in `three/examples/jsm/environments/RoomEnvironment.js` — available via CDN as addon. If not available in r134 CDN build, fall back to a simple `CubeCamera` capture or skip transmission (use standard transparent material).

---

## Implementation Constraints

### What changes
- **Replace** the Three.js IIFE content (lines 1312-1400) — new scene objects
- **Keep** the `try { ... } catch(e) {}` wrapper (recent fix)
- **Keep** canvas element, renderer setup, resize handler, mouse tracking
- **Keep** all other hero features: aurora, grain, kinetic typography, magnetic CTAs, scroll bar

### What stays the same
- `<canvas id="bg-canvas">` HTML element
- `PerspectiveCamera(60, aspect, 0.1, 1000)` at z=5
- Scene/camera/rAF loop structure
- Renderer config: `antialias: true, alpha: true`
- Mouse tracking: `mouseX/mouseY` from existing `mousemove` listener

### Performance
- 3 objects x 2 meshes = 6 draw calls (very lightweight)
- `WireframeGeometry` + `LineSegments` = GPU-efficient edge rendering
- `renderer.toneMappingExposure = 1.0` for natural look
- `renderer.toneMapping = THREE.ACESFilmicToneMapping` for cinematic feel

### Fallback
If `MeshPhysicalMaterial.transmission` is not supported (older GPU / r134 limitation):
- Fall back to `MeshStandardMaterial({ transparent: true, opacity: 0.15, color: #1a1a2e })`
- Wireframe overlay still renders correctly
- Visual degrades gracefully — still looks good, just no refraction
