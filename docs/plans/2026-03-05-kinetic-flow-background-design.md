# Design Document: Kinetic Flow Background System

**Date**: 2026-03-05  
**Topic**: High-performance "Vector Field" particle system for portfolio background.

## Objective
To replace the static/subtle CSS background with a "creative and impressive" particle-based system that feels technical, modern, and reactive.

## Architecture

### 1. Rendering Engine
- **Canvas 2D**: Chosen over WebGL for its ease of "frame persistence" (trails) and sufficient performance for ~2000 tiny particles.
- **`requestAnimationFrame`**: High-frequency render loop.

### 2. Physics & Motion
- **Perlin Noise (Vector Field)**: Each particle calculates its velocity based on its (x, y) coordinates mapped to a 2D noise field.
- **Life Cycle**: Particles that leave the screen or "expire" are recycled to keep memory constant.
- **Tails**: Clear the Canvas with a low-opacity `fillStyle` (e.g., `rgba(x,x,x,0.1)`) instead of `clear()`.

### 3. Interactivity
- **Mouse Vortex**: The cursor will be represented as a local force point in the field, causing particles to accelerate toward or swirl around it.
- **Scroll Friction**: Global field speed will increase temporarily during scroll events, giving a sense of "wind surge."

### 4. Aesthetics
- **Color Palette**: Warm Neutrals (`#FAFAF9` base, `#d4d4d8` and `#fef3c7` particles).
- **Z-Layering**: Particles will have varying sizes and opacities to simulate 3D depth.
- **Grain Overlay**: Existing SVG `feTurbulence` grain will be layered on top to maintain the Apple-quality tactile feel.

## Performance Plan
- **Throttling**: Responsive resize handler will debounced/throttle the canvas scaling.
- **Complexity Guard**: Particle count will scale based on device pixel ratio or screen width.
- **Reduced Motion**: Respect `prefers-reduced-motion` by pausing the animation and rendering a single-frame "dust" state.
