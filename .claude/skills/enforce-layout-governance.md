---
name: enforce-layout-governance
description: Ensures UI components follow the custom global CSS variable system instead of hardcoded values or Tailwind.
---

# Enforce Layout Governance System

This project strictly utilizes a custom "Layout Governance System" defined in `app/globals.css`. It does **not** use Tailwind CSS or Shadcn UI. All components must adhere to this system to maintain visual consistency.

## Rules for Styling

When asked to create or modify a component, you MUST adhere to the following rules:

1.  **Never** use Tailwind utility classes (e.g., `p-4`, `flex`, `text-center`).
2.  **Never** hardcode spacing values (e.g., `margin: 16px;`, `gap: 24px;`).
3.  **Always** use the global CSS variables defined in `.root` of `app/globals.css`.

### Available Variables

#### 1. Spacing (The 8px base unit)
*   `var(--space-1)`: 0.25rem (4px)
*   `var(--space-2)`: 0.5rem (8px)
*   `var(--space-3)`: 0.75rem (12px)
*   `var(--space-4)`: 1rem (16px)
*   `var(--space-6)`: 1.5rem (24px)
*   `var(--space-8)`: 2rem (32px)
*   `var(--space-12)`: 3rem (48px)
*   `var(--space-16)`: 4rem (64px)

#### 2. Typography
*   `var(--fs-sm)`: Small text
*   `var(--fs-base)`: Base text (16px)
*   `var(--fs-md)`: Medium text
*   `var(--fs-lg)`: Large heading
*   `var(--fs-xl)`: Extra large
*   `var(--fs-2xl)`: Display size
*   **NOTE:** Never apply `margin-bottom` to typography elements (`h1`-`h6`, `p`). Spacing should be handled by `gap` on the parent container (Flex/Grid).

#### 3. Colors
*   `var(--bg)`: Main background (White)
*   `var(--bg-secondary)`: Off-white background
*   `var(--text-primary)`: Dark text
*   `var(--text-secondary)`: Gray text
*   `var(--accent)`: Primary brand blue (`#1B5FD6`)
*   `var(--border)`: Standard border color

## Workflow

1.  When styling, open `app/globals.css` if you need to reference specific variable names.
2.  Construct your layout using inline objects in React `style={{ gap: 'var(--space-4)' }}` or using isolated `.module.css` files referring to the variables.
3.  If implementing structural layout, use `<section className="section">` and `<div className="container">` wrappers which automatically handle responsive widths and padding. Do **not** add padding to containers.
