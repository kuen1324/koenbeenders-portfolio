---
name: add-scroll-animation
description: Guidelines for implementing scroll-driven animations using the existing GSAP and Lenis setup.
---

# Add Scroll Animation

This portfolio is heavily focused on kinetic, smooth-scrolling experiences. It utilizes **Lenis** for smooth scrolling and **GSAP (ScrollTrigger)** for animations.

When asked to "animate" elements on scroll, you MUST use the provided infrastructure rather than writing vanilla CSS transitions or intersection observers from scratch (unless modifying a core, existing observer).

## Available Tools

### 1. `useScrollReveal` Custom Hook
This hook is located at `hooks/useScrollReveal.ts`. It provides a simple, reusable way to add a CSS class to an element when it scrolls into view.

**Usage:**
```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function MyComponent() {
    // The hook returns a ref. Attach it to the element you want to reveal.
    const revealRef = useScrollReveal('is-revealed', { threshold: 0.2, margin: '0px' });

    return (
        <div ref={revealRef} className="my-element">
            Content to reveal
        </div>
    );
}
```
**CSS Requirement**: You must define `.my-element` with the hidden state, and `.my-element.is-revealed` with the visible state in `globals.css` (or the module style).

### 2. GSAP `useGSAP` Hook
For complex, multi-step, or scrubbing animations, use `@gsap/react` and `ScrollTrigger`.

**Usage:**
```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(boxRef.current, {
            y: 100, // Move down 100px
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom", // Trigger when top of container hits bottom of viewport
                end: "bottom top",   // End when bottom of container hits top of viewport
                scrub: true,         // Tie animation directly to scroll position
            }
        });
    }, { scope: containerRef }); // Scope ensures GSAP only selects within this component

    return (
        <section ref={containerRef} className="section">
            <div ref={boxRef} className="box">Parallax Box</div>
        </section>
    );
}
```

## Rules for Animation
1.  **Performance First**: Only animate `transform` (e.g., `x`, `y`, `scale`, `rotate`) and `opacity`. Never animate layout properties like `width`, `height`, `margin`, or `padding` on scroll.
2.  **Cleanup**: Always use `useGSAP` or ensure standard `useEffects` return a cleanup function (`observer.disconnect()` or `ScrollTrigger.kill()`) to prevent memory leaks during Next.js client routing.
3.  **No `will-change` Abuse**: Only apply `will-change: transform` in CSS to elements that are actively being scrolled/animated.
