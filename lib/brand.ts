/**
 * Brand — Single source of truth for all brand data.
 * Import from here instead of hardcoding strings in components.
 */

export const brand = {
    name: 'Koen Beenders',
    tagline: 'Creative Developer & Designer',
    description:
        'I design and build digital experiences that balance precision with personality — from interfaces that feel inevitable to systems that scale beautifully.',
    email: 'kbeenders111@gmail.com',
    location: 'Amsterdam, NL',
    availability: 'Available for work',

    /** Core brand values */
    values: ['Craft', 'Clarity', 'Velocity'] as const,

    /** Voice rules: short, confident, technically grounded. No buzzword overload. */
    voice: {
        tone: 'Confident, precise, human',
        avoid: 'Buzzwords, superlatives without substance, passive voice',
    },

    /** CTA copy — consistent across the site */
    cta: {
        primary: 'See my work',
        secondary: 'Get in touch',
        contact: 'Start a conversation',
        hire: 'Work with me',
    },

    /** Social links — updated handles where possible */
    socials: {
        linkedin: 'https://www.linkedin.com/in/koen-beenders-21b27727a',
        github: 'https://github.com/koenbeenders',
        twitter: 'https://x.com/koenbeenders',
        dribbble: 'https://dribbble.com/koenbeenders',
    },

    /** Site URLs */
    url: 'https://koenbeenders.com',
} as const;

export type Brand = typeof brand;
