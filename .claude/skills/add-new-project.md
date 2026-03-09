---
name: add-new-project
description: Instructions for correctly adding a new project to the portfolio data layer.
---

# Add New Project

This portfolio uses a static data layer for the projects to power the GSAP Carousel and Next.js static pages. All projects are stored and typed in `lib/projects.ts`.

## Steps to Add a Project

1.  **Open `lib/projects.ts`**.
2.  **Locate the `projects` array**.
3.  **Add a new `Project` object** to the top or bottom of the array depending on the desired chronological order.

### Project Object Structure

The object MUST strictly adhere to the `Project` interface:

```typescript
export interface Project {
    slug: string;        // Used for the URL (e.g., /work/my-project)
    title: string;       // Display title
    tag: string;         // Short category tag (e.g., "Web App", "Brand Design")
    accent: string;      // RGB or HSL string for hover glow (e.g., 'rgba(56, 189, 248, 0.4)')
    grad: string;        // CSS linear-gradient string for the card background
    description: string; // Used on the individual case study page
    tech: string[];      // Array of technologies used
    link?: string;       // Optional external live link
    video?: string;      // Optional local path to an MP4 video showcasing the work
}
```

## Important Considerations

*   **`slug`**: Must be URL-safe (kebab-case, lowercase).
*   **`accent` and `grad`**: These are critical for the UI. Ensure `accent` uses a transparent `rgba()` or `hsla()` value so the glow effect blends nicely, and `grad` is a subtle, dark-themed or rich `linear-gradient` that fits the card background style.
*   **Media**: Any referenced videos or images must be placed in the `/public` directory before adding the project data.

## Example

```typescript
{
    slug: 'lumina-dashboard',
    title: 'Lumina Analytics',
    tag: 'Fintech Dashboard',
    accent: 'rgba(16, 185, 129, 0.3)', // Emerald glow
    grad: 'linear-gradient(145deg, #064e3b 0%, #022c22 100%)',
    description: 'A high-performance financial analytics dashboard built to handle real-time trading data with sub-second latency.',
    tech: ['Next.js', 'React Query', 'Tailwind', 'Recharts'],
    link: 'https://lumina.example.com'
}
```
