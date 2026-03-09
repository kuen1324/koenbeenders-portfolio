---
name: floating-glass-nav
description: Add or modify the floating frosted glass pill navigation bar. Handles nav items, section tracking, active indicator, CSS glass effect, and scroll-triggered visibility.
---

# Floating Glass Navigation Skill

This skill governs the **floating bottom-center pill navigation bar** used in this portfolio project.

## Files Involved

| File | Role |
|------|------|
| `components/FloatingNav.tsx` | The React component — nav items, IntersectionObserver, click handler |
| `app/globals.css` (`.floating-nav*` rules) | All visual styles — glass pill, indicator, responsive layout |
| `app/page.tsx` | Mounts `<FloatingNav />` as the last child of `<main>` |

---

## How It Works

### Section Tracking
Each section in `page.tsx` must have an `id` that matches a nav item's `id` field:
```tsx
// In page.tsx sections:
<section id="hero">...</section>
<section id="work">...</section>
<section id="about">...</section>
<section id="contact">...</section>
```

The `IntersectionObserver` in `FloatingNav.tsx` watches these IDs and sets `active` when ≥30% of the section is in view.

### Visibility
The nav is hidden (`opacity: 0`, `transform: translateY(100px)`) until `window.scrollY > 300`. Then the `.floating-nav--visible` class kicks in to slide it into view.

### Active Indicator
A blue pill (`floating-nav__indicator`) slides behind the active item using `translateX(index * 100%)`. The `activeIndex` is computed from `navItems.findIndex`.

---

## Adding a New Nav Item

### Step 1 — Add to `navItems` array in `FloatingNav.tsx`
```tsx
{
  id: "gallery",      // must match the section's id attribute
  label: "Gallery",
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* SVG path here */}
    </svg>
  ),
},
```

### Step 2 — Ensure the section has the matching `id`
```tsx
// In page.tsx or the section component:
<section id="gallery">
```

### Step 3 — The indicator width auto-adjusts
The indicator width is `calc(100% / N - Xpx)` where N = number of items. If items are not equal width, update the CSS:
```css
/* globals.css — update if item count changes */
.floating-nav__indicator {
  width: calc(20% - 2px); /* for 5 items: 100/5 = 20% */
}
```

> **Current item count**: 4 (Home, Work, About, Contact) → width = `calc(25% - 2px)`

---

## Changing the Glass Style

All glass styling lives in `globals.css` under the `/* FLOATING GLASS NAVIGATION */` block:

```css
/* Frosted glass pill */
.floating-nav__pill {
  background: rgba(255, 255, 255, 0.72);      /* ← opacity of glass */
  backdrop-filter: blur(24px) saturate(1.8);  /* ← blur intensity */
  border: 1px solid rgba(255, 255, 255, 0.3); /* ← edge highlight */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); /* ← drop shadow */
}
```

### Making it darker (for dark-themed sites):
```css
.floating-nav__pill {
  background: rgba(20, 20, 20, 0.72);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

---

## Changing the Active Indicator Color

```css
/* globals.css */
.floating-nav__indicator {
  background: var(--accent);  /* ← change to any color */
  box-shadow: 0 2px 12px rgba(27, 95, 214, 0.3); /* ← glow matches color */
}
```

---

## Changing Scroll Threshold

The nav appears after scrolling 300px. Change in `FloatingNav.tsx`:
```tsx
// Show nav after scrolling past hero
const onScroll = () => {
  setVisible(window.scrollY > 300); // ← change 300 to desired px
};
```

---

## Responsive Behaviour

- **Desktop (≥768px)**: Icons + text labels shown, `padding: 10px 20px` per item
- **Mobile (<768px)**: Icons only (labels hidden via `display: none`), `padding: 12px 16px`

To show labels on mobile too, remove the `display: none` from `.floating-nav__label` in globals.css.

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Active indicator doesn't move | Section `id` doesn't match `navItem.id` | Check both match exactly (case-sensitive) |
| Nav visible on page load | `window.scrollY > 300` triggers too early | Increase threshold or add `!document.scrollingElement` check |
| Indicator wrong size | Item count changed | Update `width: calc(Xpx - 2px)` in `.floating-nav__indicator` |
| Nav hides behind content | `z-index` conflict | Ensure `.floating-nav` has `z-index: 200` or higher |
| Glass blur doesn't work | Old browser | Add `-webkit-backdrop-filter` fallback (already included) |
