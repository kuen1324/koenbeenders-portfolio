# ALIGNMENT & CENTERING AUDIT REPORT

**Date**: 2026-02-27
**Specialist**: Senior UX Engineer + Layout/Typografie
**Status**: Issues Found & Fixes Planned

---

## 📋 ISSUES IDENTIFIED

### **Issue #1: Hero Title/Subtitle Spacing Inconsistency**
**Location**: `.hero__title`, `.hero__subtitle` (lines 391-397 in globals.css)
**Problem**:
```css
.hero__title {
  margin: var(--space-6) 0 0 0; /* ❌ WRONG */
}
```
These have hardcoded margin-top which conflicts with gap-based system. Creates unpredictable spacing.

**Type**: Mathematically incorrect (margin shouldn't be used)
**Impact**: Hero content spacing feels irregular at different viewports
**Fix**: Remove margins, rely on `.hero .container { gap: var(...); }`

---

### **Issue #2: Work Header Label Spacing (Optically Misaligned)**
**Location**: `.work__header` (lines 407-418)
**Problem**:
- Header is centered vertically/horizontally ✅
- But `.label` before `h2` has no breathing room
- Feels "squished" together instead of deliberate spacing

**Type**: Optical centering problem
**Impact**: Work section feels cramped, lacks premium spacing
**Fix**: Add explicit gap between `.label` and `h2` or use flex/grid

---

### **Issue #3: Contact Content Alignment (Vertical)**
**Location**: `.contact__content` (lines 556-568)
**Problem**:
```css
.contact__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-8); /* ← Only gap-based, no padding */
}
```
CTA button ("Start a conversation") at bottom doesn't have visual "breathing room" below.

**Type**: Mathematically correct spacing, but optically needs emphasis
**Impact**: CTA feels weak/forgotten at end of section
**Fix**: Add `padding-bottom: var(--space-12)` to `.contact__content`

---

### **Issue #4: About Section Content Width (Not Explicit)**
**Location**: `.about__content` + `.about__paragraph` (lines 604-639)
**Problem**:
- `.about__paragraph` has `max-width: 680px` ✅
- But `.about__content` wrapper doesn't constrain properly
- Allows all nested elements to grow unpredictably

**Type**: Mathematically weak (no container max-width)
**Impact**: About section text can feel too wide at large viewports
**Fix**: Add `max-width: 720px; margin-inline: auto;` to `.about__content`

---

### **Issue #5: Hero Content Vertical Alignment (Suboptimal)**
**Location**: `.hero__content` (no explicit rules!)
**Problem**:
- Hero grid centers vertically ✅
- But content block itself doesn't declare max-width
- Text can sprawl at wide viewports
- CTA positioning unpredictable

**Type**: Mathematical + optical (no constraints)
**Impact**: Hero content feels "loose" at 1440px+ widths
**Fix**: Add max-width + text alignment rules to `.hero__content`

---

### **Issue #6: Work Card Alignment (Grid Gaps)**
**Location**: `.deck-container` (line 426: `gap: var(--space-6);`)
**Problem**:
- Gap between navigation buttons and carousel is `var(--space-6)` (24px)
- Other component gaps use `var(--space-12)` or `var(--space-16)`
- Inconsistent visual rhythm

**Type**: Spacing hierarchy problem
**Impact**: Navigation buttons feel too close to carousel at mobile
**Fix**: Increase to `var(--space-8)` for consistency

---

### **Issue #7: Navbar Vertical Centering**
**Location**: `nav` (line 808: `padding: 1rem;`)
**Problem**:
```css
nav {
  padding: 1rem;  /* Uniform padding */
  display: flex;
  align-items: center; /* ✅ Correct */
}
```
Navbar is centered BUT at mobile, 1rem padding feels arbitrary vs section padding (1rem to 3rem).

**Type**: Spacing inconsistency (not cohesive with section tokens)
**Impact**: Navbar padding doesn't scale responsively with content
**Fix**: Use responsive padding: mobile 0.75rem, desktop 1.5rem

---

### **Issue #8: Footer Copyright Text Alignment**
**Location**: `.footer__copy` (no explicit centering rules)
**Problem**:
- Footer is centered ✅
- But copyright text doesn't have explicit vertical alignment
- Optical hierarchy weak (copyright feels like afterthought)

**Type**: Optical centering + hierarchy
**Impact**: Footer feels less premium/intentional
**Fix**: Add font sizing and spacing rules

---

## 🎯 CENTERING MATRIX (Current State)

| Component | Type | Status | Fix |
|-----------|------|--------|-----|
| Hero section | Layout centering | ✅ Correct | Remove manual margins |
| Hero content | Width constraint | ❌ Missing | Add max-width rules |
| Work header | Vertical centering | ✅ Correct | Add label spacing |
| Work carousel | Layout centering | ✅ Correct | Adjust gap size |
| About section | Width constraint | ⚠️ Partial | Add wrapper max-width |
| Contact CTA | Vertical spacing | ⚠️ Weak | Add padding-bottom |
| Navbar | Responsive padding | ⚠️ Static | Make responsive |
| Footer | Optical hierarchy | ⚠️ Weak | Add rules |

---

## 📐 DEFINED PRIMITIVES (GOING FORWARD)

### Container Widths
```css
--container-content: 680px;  /* Text editorial content */
--container-max: 1200px;     /* General max-width */
--container-wide: 1440px;    /* Full-bleed hero (rarely) */
```

### Content Alignment Rules
```css
/* Content block: centered + width-constrained */
.content-block {
  width: 100%;
  max-width: var(--container-content);
  margin-inline: auto;
  text-align: center | left (explicit);
}

/* Heading alignment: optically centered */
.heading {
  text-align: center;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

/* Spacing: gaps only, no margins on children */
parent { gap: var(--space-*); }
child { margin: 0; }
```

### Section Proportion Rules
```css
/* Hero: breathing room, not cramped */
.hero { min-height: clamp(500px, 80vh, 650px); }

/* Work: carousel prominent, header spacious */
.work__header { margin-bottom: var(--space-20); }

/* About: compact, editorial */
.about { max-width: 800px; margin-inline: auto; }

/* Contact: call-to-action prominent */
.contact__content { padding-bottom: var(--space-20); }
```

---

## ✅ FIXES TO IMPLEMENT

1. **Hero**: Remove margin from `.hero__title`, `.hero__subtitle` → rely on gap
2. **Hero**: Add `.hero__content { max-width: 560px; margin-inline: auto; }`
3. **Work Header**: Add label-to-heading spacing via grid gap
4. **Work Carousel**: Increase gap from `var(--space-6)` → `var(--space-8)`
5. **About**: Add `.about__content { max-width: 720px; margin-inline: auto; }`
6. **Contact**: Add padding-bottom to `.contact__content`
7. **Navbar**: Make padding responsive (not static 1rem)
8. **Footer**: Add explicit centering rules to `.footer__copy`

---

## 📱 RESPONSIVE CENTERING VALIDATION

Testing needed on:
- ✅ 320px (mobile)
- ✅ 480px (small phone)
- ✅ 768px (tablet)
- ✅ 1024px (desktop)
- ✅ 1280px (large)
- ✅ 1440px+ (extra-wide)

**Checklist per viewport**:
- [ ] Hero centered & constrained
- [ ] Work carousel centered
- [ ] Content widths consistent
- [ ] No horizontal scroll
- [ ] Buttons aligned (text + icon)
- [ ] Text line-lengths < 75 chars
