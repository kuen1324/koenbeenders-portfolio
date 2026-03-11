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
    coverIcon?: string;
    coverIconWidth?: number | string; // px or CSS value (e.g. '80%') — defaults to 72px
    coverBg?: string; // solid background color, no image
    sections: CaseSection[];
    gallery: GalleryImage[];
}

export const projects: Project[] = [
    {
        slug: 'claricity',
        num: '01',
        title: 'Claricity',
        subtitle: 'Branding en website voor een AI-automatiseringsplatform.',
        tag: 'Branding · Web Design · Frontend · AI Product',
        grad: 'linear-gradient(145deg, #07090f 0%, #0b1221 100%)',
        accent: 'rgba(99,137,210,0.20)',
        role: 'Design & Development',
        period: '2025 – 2026',
        year: '2026',
        stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
        summary:
            'Voor Claricity werd de volledige branding en visuele identiteit ontwikkeld, gevolgd door het ontwerp en de ontwikkeling van de website. De uitdaging lag in het vertalen van een technisch AI-product naar een heldere en toegankelijke merkervaring.',
        outcome: 'Branding + website van concept tot live',
        liveUrl: 'https://claricity.ai/',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop',
        coverIcon: '/claricity-icon.svg',
        coverIconWidth: 380,
        sections: [
            {
                heading: 'Opdracht',
                body: 'Voor Claricity ontwikkelde ik de volledige branding en visuele identiteit van het product, gevolgd door het ontwerp en de ontwikkeling van de website. Het platform gebruikt AI-systemen om bedrijfsprocessen en interacties met klanten te automatiseren en efficiënter te maken.',
            },
            {
                heading: 'Uitdaging',
                body: 'De uitdaging lag in het vertalen van een technisch AI-product naar een heldere en toegankelijke merkervaring. Vanuit een nieuw design system ontwierp ik een website die de technologie begrijpelijk maakt en vertrouwen uitstraalt richting potentiële klanten.',
            },
            {
                heading: 'Aanpak',
                body: '— Visuele identiteit en design system opgebouwd van nul\n— Positionering en copyrichtlijnen voor het merk\n— Responsieve website met focus op conversie en vertrouwen\n— Heldere visualisatie van de AI-werkstromen',
            },
            {
                heading: 'Tech',
                body: '— Next.js voor snelle laadtijden en SEO\n— Tailwind CSS voor een schaalbaar design system\n— Framer Motion voor vloeiende animaties',
            },
        ],
        gallery: [
            { src: '/work/claricity/hero.jpg', caption: 'Hero & merkpositionering' },
            { src: '/work/claricity/features.jpg', caption: 'Feature sectie' },
            { src: '/work/claricity/workflow.jpg', caption: 'AI-workflow visualisatie' },
            { src: '/work/claricity/pricing.jpg', caption: 'Pricing & CTA' },
            { src: '/work/claricity/mobile.jpg', caption: 'Mobiele ervaring' },
        ],
    },
    {
        slug: 'voltmatch',
        num: '02',
        title: 'Voltmatch',
        subtitle: 'Product concept met branding, website en AI-lanceringsvideo.',
        tag: 'Branding · Product Concept · Web Design · AI Video',
        grad: 'linear-gradient(135deg, #0a0c1a 0%, #081c20 100%)',
        accent: 'rgba(47,227,200,0.18)',
        role: 'Design & Development',
        period: '2025 – 2026',
        year: '2026',
        stack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'AI Video'],
        summary:
            'Voltmatch is een eigen productconcept waarin wordt onderzocht hoe AI en automatisering kunnen worden toegepast binnen digitale diensten. Naast de website wordt een lanceringsvideo geproduceerd waarbij AI-tools worden ingezet om het concept visueel te introduceren.',
        outcome: 'Branding, website en AI-video van concept tot live',
        liveUrl: 'https://voltmatch.vercel.app/',
        coverImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80&auto=format&fit=crop',
        coverIcon: '/voltmatch-icon.svg',
        coverIconWidth: 220,
        sections: [
            {
                heading: 'Concept',
                body: 'Voltmatch was een eigen productconcept waarin ik onderzocht hoe AI en automatisering kunnen worden toegepast binnen digitale diensten. Voor dit project ontwikkelde ik de volledige branding en visuele identiteit, gevolgd door het ontwerp en de ontwikkeling van de website.',
            },
            {
                heading: 'AI Video',
                body: 'Naast de website produceerde ik een lanceringsvideo waarin AI-tools werden gebruikt om het concept visueel te introduceren. Het project fungeerde als een experiment in het combineren van branding, productdenken en AI-gedreven contentproductie.',
            },
            {
                heading: 'Aanpak',
                body: '— Volledig eigen concept, branding en identity\n— Responsive website ontworpen en gebouwd\n— Lanceringsvideo geproduceerd met AI-tools\n— Van eerste idee tot werkend eindproduct',
            },
            {
                heading: 'Tech',
                body: '— Next.js + Tailwind CSS voor de website\n— TypeScript voor type-veiligheid\n— AI-tools voor videoproductie en contentgeneratie',
            },
        ],
        gallery: [
            { src: '/work/voltmatch/homepage.png', caption: 'Homepage' },
            { src: '/work/voltmatch/map-view.png', caption: 'Product view' },
            { src: '/work/voltmatch/charger-detail.png', caption: 'Detail pagina' },
            { src: '/work/voltmatch/host-page.png', caption: 'Host portaal' },
            { src: '/work/voltmatch/mission.png', caption: 'Merkverhaal' },
        ],
    },
    {
        slug: 'emotion-recognition',
        num: '03',
        title: 'Emotion Recognition Tool',
        subtitle: 'Realtime gezichtsanalyse via AI in de browser.',
        tag: 'AI Experiment · Computer Vision · Frontend · Interactive Web',
        grad: 'linear-gradient(145deg, #050505 0%, #111111 100%)',
        accent: 'rgba(168, 85, 247, 0.4)',
        role: 'Design & Development',
        period: '2025 – 2026',
        year: '2026',
        stack: ['Next.js', 'TypeScript', 'Computer Vision AI'],
        summary:
            'Een experimentele webtool die via de camera gezichtsuitdrukkingen analyseert en emoties in realtime probeert te herkennen. Gebouwd als technische verkenning van hoe AI-modellen kunnen worden toegepast binnen interactieve webinterfaces.',
        outcome: 'Werkende realtime emotieherkenning in de browser',
        liveUrl: 'https://ai-web-pearl-seven.vercel.app/',
        coverImage: '/work/emotion-recognition/cover.webp',
        sections: [
            {
                heading: 'Concept',
                body: 'Een experimentele webtool die via de camera gezichtsuitdrukkingen analyseert en emoties in realtime probeert te herkennen. Het project diende als technische verkenning van hoe AI-modellen kunnen worden toegepast binnen interactieve webinterfaces.',
            },
            {
                heading: 'Aanpak',
                body: 'Ik ontwierp en bouwde de tool zelf, met focus op een eenvoudige interface die realtime feedback geeft op basis van de gedetecteerde emotie. De nadruk lag op het toegankelijk maken van een complexe AI-technologie via een minimale, directe UI.',
            },
            {
                heading: 'Technisch',
                body: '— Realtime camera-input verwerkt in de browser\n— AI-model voor gezichtsexpressie-analyse\n— Minimale interface gericht op directe feedback\n— Volledig client-side zonder backend',
            },
        ],
        gallery: [
            { src: '/work/emotion-recognition/interface.png', caption: 'Realtime interface' },
        ],
    },
    {
        slug: 'sanquin',
        num: '04',
        title: 'Sanquin Campaign Concept',
        subtitle: 'Digitale campagne om jonge plasmadonoren te bereiken.',
        tag: 'Campaign Strategy · Digital Marketing · Content Strategy · UX Research',
        grad: 'linear-gradient(145deg, #0d0809 0%, #180a0a 100%)',
        accent: 'rgba(200, 40, 40, 0.18)',
        role: 'Concept & Design',
        period: '2025 – 2026',
        year: '2026',
        stack: ['Campaign Strategy', 'Digital Marketing', 'Content Strategy', 'UX Research'],
        summary:
            'Voor dit project is een digitale campagne voor Sanquin ontwikkeld met als doel het aantal jonge plasmadonoren te vergroten. Doelgroeponderzoek laat zien dat veel jongvolwassenen doneren als tijdrovend of ingewikkeld ervaren. Dit misverstand komt ook terug in de communicatie van Sanquin zelf.',
        coverIcon: '/sanquin-icon.svg',
        coverIconWidth: 'cover',
        sections: [
            {
                heading: 'Aanleiding',
                body: 'Voor dit project ontwikkelde ik een digitale campagne voor Sanquin gericht op het vergroten van het aantal jonge plasmadonoren. Op basis van doelgroepanalyse en onderzoek bleek dat veel jongvolwassenen denken dat doneren tijdrovend of lastig is. Dat soort drempels sluit aan bij Sanquins eigen communicatie over misverstanden rond bloed- en plasmadonatie.',
            },
            {
                heading: 'Aanpak',
                body: 'Vanuit dit inzicht ontwikkelde ik een campagneconcept dat laat zien hoe doneren eenvoudiger en toegankelijker onderdeel kan worden van het dagelijkse leven. Het project omvatte onder andere een video-concept, social campagnes, SEO-content, SEA-advertenties en een contentstrategie gebaseerd op de volledige customer journey.',
            },
            {
                heading: 'Scope',
                body: '— Video-concept voor awareness\n— Social media campagnes\n— SEO-content en SEA-advertenties\n— Contentstrategie langs de volledige customer journey\n— Doelgroepanalyse en UX-onderzoek',
            },
        ],
        gallery: [],
    },
    {
        slug: 'coids',
        num: '05',
        title: 'COIDS — Van Waag tot Wallen',
        subtitle: 'True-crime tourconcept door Amsterdam voor mbo-studenten.',
        tag: 'Concept Development · Storytelling · Campaign Strategy · Audience Research',
        grad: 'linear-gradient(145deg, #090909 0%, #131313 100%)',
        accent: 'rgba(255, 255, 255, 0.06)',
        role: 'Concept & Strategie',
        period: '2025 – 2026',
        year: '2026',
        stack: ['Concept Development', 'Storytelling', 'Campaign Strategy', 'Audience Research'],
        summary:
            'Voor dit project is een concept ontwikkeld voor een true crime tour door Amsterdam, gericht op mbo-studenten tussen de 16 en 20 jaar. Historisch onderzoek, doelgroepinzichten en storytelling vormen de basis voor een toegankelijke ervaring die het verleden en heden van de stad met elkaar verbindt.',
        coverBg: '#000000',
        coverIcon: '/coids-icon.svg',
        coverIconWidth: 250,
        sections: [
            {
                heading: 'Concept',
                body: 'Voor dit project ontwikkelde ik een concept voor een true-crime tour door Amsterdam, gericht op mbo-studenten tussen de 16 en 20 jaar. Het idee ontstond binnen de context van Amsterdam 750 en vertaalde historisch onderzoek, doelgroepinzichten en storytelling naar een toegankelijke ervaring die verleden en heden van de stad met elkaar verbindt.',
            },
            {
                heading: 'Uitwerking',
                body: 'De uitwerking bestond uit het tourconcept zelf, de inhoudelijke opbouw van de route en een marketingcommunicatieplan met focus op social media, websiteverkeer en conversie. Daarbij lag de nadruk op het ontwikkelen van een sterk narratief, een passende visuele richting en een concept dat zowel creatief als praktisch uitvoerbaar is.',
            },
            {
                heading: 'Scope',
                body: '— Tourconcept en routeopbouw\n— Inhoudelijk narratief en storytelling\n— Marketingcommunicatieplan\n— Social media en websitestrategie\n— Doelgroeponderzoek (mbo, 16–20 jaar)',
            },
        ],
        gallery: [],
    },
    {
        slug: 'sadie-jane-lennon',
        num: '06',
        title: 'Sadie Jane Lennon',
        subtitle: 'Fictieve artist identity opgebouwd vanuit AI-gedreven visuele storytelling.',
        tag: 'AI Workflow · Prompt Engineering · Visual Storytelling · Creative Direction',
        grad: 'linear-gradient(145deg, #080608 0%, #120d14 100%)',
        accent: 'rgba(180, 120, 220, 0.15)',
        role: 'Creative Direction & AI Workflow',
        period: '2025 – 2026',
        year: '2026',
        stack: ['AI Workflow', 'Prompt Engineering', 'Visual Storytelling', 'Creative Direction'],
        coverImage: '/work/sadie-jane-lennon/cover.webp',
        summary:
            'Voor dit project is een fictieve artist identity rond Sadie Jane Lennon ontwikkeld, opgebouwd vanuit character design, visuele storytelling en een consistente creatieve richting. Het project onderzoekt hoe generatieve AI kan worden ingezet om een samenhangende visuele wereld rond een artiest te creëren.',
        sections: [
            {
                heading: 'Concept',
                body: 'Voor dit project ontwikkelde ik een fictieve artist identity rond Sadie Jane Lennon, opgebouwd vanuit character design, visuele storytelling en een consistente creatieve richting. Het project onderzocht hoe een coherente visuele wereld rond een artiest kan worden ontwikkeld met behulp van generatieve AI.',
            },
            {
                heading: 'Aanpak',
                body: 'De focus lag op het opzetten van een prompting framework en een set visuele richtlijnen waarmee consistente beelden en stijlen gegenereerd konden worden. Door verschillende AI-tools te combineren ontstond een reproduceerbare workflow voor het creëren van artistieke visuals binnen één duidelijke esthetische richting.',
            },
            {
                heading: 'Scope',
                body: '— Character design en visuele identiteit\n— Prompting framework en stijlrichtlijnen\n— AI-workflow voor consistente beeldgeneratie\n— Visuele storytelling en creatieve richting',
            },
        ],
        gallery: [],
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}
