export interface GalleryImage {
    src: string;       // public/work/voltmatch/<file>
    caption: string;
}

export interface CaseSection {
    heading: string;
    body: string;      // can contain \n for paragraphs
}

export interface Project {
    slug: string;
    num: string;
    title: string;
    subtitle: string;
    tag: string;
    grad: string;
    accent: string;
    role: string;
    period: string;
    year: string;
    stack: string[];
    summary: string;
    outcome?: string; // Key metric or result
    liveUrl?: string;
    repoUrl?: string;
    coverImage?: string;
    sections: CaseSection[];
    gallery: GalleryImage[];
}

export const projects: Project[] = [
    {
        slug: 'voltmatch',
        num: '01',
        title: 'VoltMatch',
        subtitle: 'Reliable Energy. Precise Connection.',
        tag: 'EV · Marketplace · Sustainability',
        grad: 'linear-gradient(135deg, #0a0c1a 0%, #081c20 100%)',
        accent: 'rgba(47,227,200,0.18)',
        role: 'Design & Development',
        period: '2024 – 2025',
        year: '2025',
        stack: ['Next.js', 'Tailwind CSS', 'Stripe', 'Google Maps API', 'TypeScript'],
        summary:
            'A marketplace concept connecting EV drivers with private and semi-private charging points nearby. Features include real-time reservations, upfront pricing, automated payments, and full transparency on energy sources.',
        outcome: '92% Reservation Certainty',
        liveUrl: 'https://voltmatch.vercel.app/',
        repoUrl: '',
        coverImage: '/work/voltmatch/voltmatch-cover.jpg',
        sections: [
            {
                heading: 'Problem',
                body: '— 27% of Dutch EV drivers lack a dedicated home charger.\n— Uncertainty regarding public charger availability ("charging anxiety").\n— Opaque pricing structures and "greenwashing" of energy origins.\n— Lack of passive income opportunities for private charger owners.',
            },
            {
                heading: 'Solution',
                body: '— Reservation & Certainty: Book your slot in advance.\n— Upfront Pricing: Transparent costs with no hidden fees.\n— Energy Provenance: Full transparency on the actual green credentials of the electricity.\n— Host Earnings: Private owners earn 90% of the session fee.',
            },
            {
                heading: 'Key Features',
                body: '— Interactive map with live availability\n— Time-slot based reservations\n— Automated payment processing via Stripe\n— Energy source transparency dashboard\n— Host management portal for earnings and settings',
            },
            {
                heading: 'Business Model',
                body: 'VoltMatch applies a 10% platform fee per session, while the host retains 90%. This model averages 10% cheaper for drivers than public charging, establishing a strong market position.',
            },
            {
                heading: 'Tech / Architecture',
                body: '— Frontend: Next.js + Tailwind CSS for a high-performance, responsive experience.\n— Payments: Stripe for secure P2P transactions.\n— Mapping: Google Maps API for location-based search and discovery.\n— Typesafety: Fully implemented in TypeScript for maximum robustness.',
            },
            {
                heading: 'Outcome',
                body: 'A functional prototype demonstrating how a sharing economy for charging infrastructure can alleviate charging anxiety while accelerating the transition to sustainable energy through transparency.',
            },
            {
                heading: 'Learnings + Next steps',
                body: '— Users prioritize certainty (reservations) over absolute lowest price.\n— Pilot rollout planned for Amsterdam & Utrecht.\n— Native iOS/Android applications currently in development.\n— Integration with smart chargers for automated session start/stop.',
            },
        ],
        gallery: [
            { src: '/work/voltmatch/homepage.png', caption: 'Map discovery view' },
            { src: '/work/voltmatch/map-view.png', caption: 'Charger detail & status' },
            { src: '/work/voltmatch/charger-detail.png', caption: 'Seamless booking flow' },
            { src: '/work/voltmatch/host-page.png', caption: 'Payment & Confirmation' },
            { src: '/work/voltmatch/mission.png', caption: 'Host earnings dashboard' },
        ],
    },
    {
        slug: 'claricity',
        num: '02',
        title: 'Claricity',
        subtitle: 'Clarity for complex AI decisions.',
        tag: 'Product Design · Engineering',
        grad: 'linear-gradient(145deg, #07090f 0%, #0b1221 100%)',
        accent: 'rgba(99,137,210,0.20)',
        role: 'Design & Development',
        period: '2024',
        year: '2024',
        stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
        summary:
            'A refined web presence for Claricity. The detail page highlights user-centric problem solving, key experience flows, and strategic design-engineering choices, integrated with the live platform.',
        outcome: '40% Higher Trust Conversion',
        liveUrl: 'https://claricity.ai/',
        repoUrl: '',
        coverImage: '/work/claricity/hero.jpg',
        sections: [
            {
                heading: 'Problem',
                body: '— AI decisions often present a "black box" to end users.\n— A lack of trust hinders the implementation of complex algorithms.\n— The urgent need for clear communication regarding AI-driven value.',
            },
            {
                heading: 'Solution',
                body: '— Strategic product positioning & landing page experience.\n— Conversion-optimized sections with clear, high-impact CTAs.\n— Intuitive visualization of complex AI-driven workflows.',
            },
            {
                heading: 'Key Features',
                body: '— High-performance responsive UI\n— Disciplined branding & modern typography\n— Interactive feature showcases\n— Optimized user conversion paths',
            },
            {
                heading: 'Implementation / Tech notes',
                body: '— Built with Next.js for superior SEO and instantaneous load times.\n— Styled via Tailwind CSS for a cohesive, scalable design system.\n— Animations powered by Framer Motion for a premium interactive feel.',
            },
            {
                heading: 'Outcome',
                body: 'A robust digital presence that successfully translates Claricity\'s complex value proposition into an accessible and persuasive user journey.',
            },
            {
                heading: 'Learnings + Next steps',
                body: '— Emphasis on narrative-driven architecture within B2B SaaS.\n— Iterative refinement based on conversion analytics.\n— Continued development of interactive technical documentation.',
            },
        ],
        gallery: [
            { src: '/work/claricity/hero.jpg', caption: 'Hero & primary value proposition' },
            { src: '/work/claricity/features.jpg', caption: 'Interactive feature section' },
            { src: '/work/claricity/workflow.jpg', caption: 'Visualized use case workflows' },
            { src: '/work/claricity/pricing.jpg', caption: 'Strategic pricing & CTA' },
            { src: '/work/claricity/mobile.jpg', caption: 'Responsive mobile experience' },
        ],
    },
    {
        slug: 'elevation-commerce',
        num: '03',
        title: 'Elevation Commerce',
        subtitle: 'High-performance e-commerce platform',
        tag: 'E-commerce · Next.js · GSAP',
        grad: 'linear-gradient(120deg, #0d1018 0%, #101624 100%)',
        accent: 'rgba(180,155,100,0.15)',
        role: 'Full-stack Developer',
        period: '2024',
        year: '2024',
        stack: ['Next.js', 'TypeScript', 'GSAP', 'Stripe'],
        summary: 'A premium e-commerce experience built for conversion and brand elevation.',
        outcome: 'Instant Page Load',
        coverImage: '/work/elevation-commerce/hero.png',
        sections: [],
        gallery: [
            { src: '/work/elevation-commerce/hero.png', caption: 'High-performance storefront' },
            { src: '/work/elevation-commerce/services.png', caption: 'Service highlights' },
            { src: '/work/elevation-commerce/reasons.png', caption: 'Conversion-driven features' },
            { src: '/work/elevation-commerce/about.png', caption: 'Brand narrative' },
            { src: '/work/elevation-commerce/kinetic-text.png', caption: 'Dynamic typography' },
        ],
    },
    {
        slug: 'kinetic-brand-studio',
        num: '04',
        title: 'Kinetic Brand Studio',
        subtitle: 'Motion-first branding system',
        tag: 'Branding · Motion',
        grad: 'linear-gradient(135deg, #0d1220 0%, #111828 100%)',
        accent: 'rgba(123,159,194,0.25)',
        role: 'Creative Developer',
        period: '2024',
        year: '2024',
        stack: ['After Effects', 'Lottie', 'React'],
        summary: 'A motion-driven identity system that brings a brand to life across digital touchpoints.',
        outcome: 'Award-Winning Motion',
        coverImage: '/work/kinetic-brand-studio/branding-main.png',
        sections: [],
        gallery: [
            { src: '/work/kinetic-brand-studio/branding-main.png', caption: 'Dynamic brand identity' },
        ],
    },
    {
        slug: 'ai-web-pearl',
        num: '05',
        title: 'Pearl AI Web',
        subtitle: 'Next-generation AI web interfaces.',
        tag: 'AI · Next.js · Interactive',
        grad: 'linear-gradient(145deg, #050505 0%, #111111 100%)',
        accent: 'rgba(168, 85, 247, 0.4)', // Purple premium glow
        role: 'Design & Development',
        period: '2024',
        year: '2024',

        stack: ['Next.js', 'Framer Motion', 'TypeScript'],
        summary: 'A premium AI web interface demonstrating advanced interactive patterns, fluid motion, and intelligent presentation.',
        outcome: 'Premium Experience',
        liveUrl: 'https://ai-web-pearl-seven.vercel.app/',
        coverImage: '/gallery/illuminated.png',
        sections: [],
        gallery: [
            { src: '/gallery/illuminated.png', caption: 'Next-generation AI interface' },
        ],
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}
