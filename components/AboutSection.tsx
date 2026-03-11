'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: 'Creative Business', label: 'HvA Amsterdam' },
    { number: '7+', label: 'Eigen projecten' },
    { number: 'Focus', label: 'AI · Design · Digital products' },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current) return;

        const children = contentRef.current.querySelectorAll('.about-animate');

        gsap.fromTo(
            children,
            { opacity: 0, y: 28 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.09,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    once: true,
                },
            }
        );
    }, { scope: sectionRef });

    return (
        <section
            className="section about"
            id="about"
            aria-label="About the designer"
            ref={sectionRef}
            style={{ paddingBlock: 'clamp(5rem, 10vh, 8rem)' }}
        >
            <div className="container" ref={contentRef}>

                {/* Label */}
                <p
                    className="label about-animate"
                    style={{ letterSpacing: '0.3em', opacity: 0.5, marginBottom: 'var(--space-6)' }}
                >
                    About
                </p>

                {/* Headline — full width, left-aligned */}
                <h2
                    className="display--xl about-animate"
                    style={{
                        fontSize: 'clamp(2rem, 5.5vw, 4.25rem)',
                        lineHeight: 1.02,
                        letterSpacing: '-0.03em',
                        marginBottom: 'clamp(3rem, 6vw, 5rem)',
                    }}
                >
                    Design, technologie en AI
                    <span style={{
                        display: 'block',
                        fontStyle: 'italic',
                        color: 'var(--text-tertiary)',
                        fontWeight: 400,
                    }}>
                        komen samen in de digitale producten die ik ontwerp en bouw.
                    </span>
                </h2>

                {/* Two-column body: text left, stats right */}
                <div
                    className="about-animate about-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'clamp(3rem, 8vw, 7rem)',
                        alignItems: 'start',
                    }}
                >
                    {/* Left — bio copy + capabilities */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                        <p style={{ fontSize: 'var(--fs-md)', lineHeight: 1.65, color: 'var(--text-primary)', fontWeight: 450 }}>
                            Ik ontwerp en bouw digitale producten zoals websites, tools en automatiseringen. Mijn interesse ligt vooral in hoe design, technologie en content samenkomen binnen moderne digitale ervaringen.
                        </p>
                        <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                            Veel van mijn projecten beginnen als eigen ideeën of experimenten. Vanuit daar werk ik ze verder uit van eerste concept en visuele richting tot een werkend prototype of product.
                        </p>
                        <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                            Tijdens mijn studie Creative Business aan de HvA ontwikkel ik een brede basis in conceptontwikkeling, content en digitale media. Tegelijk verdiep ik me steeds meer in de technische kant van digitale producten.
                        </p>
                        <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                            Ideeën werk ik vaak eerst visueel uit, waarna ik ze zelf verder ontwikkel naar prototypes of websites. Daardoor denk ik niet alleen na over hoe iets eruitziet, maar ook over hoe het daadwerkelijk gebouwd en gebruikt wordt.
                        </p>
                        <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                            Veel van mijn werk ligt op het snijvlak van ontwerp en implementatie, waar ideeën niet alleen worden bedacht maar ook daadwerkelijk worden gebouwd.
                        </p>
                        <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                            AI speelt daarin een belangrijke rol. Niet als vervanging van creativiteit, maar als hulpmiddel om ideeën sneller te verkennen, workflows te verbeteren en digitale producten efficiënter te ontwikkelen.
                        </p>
                        {/* Capabilities */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: 'var(--space-2)' }}>
                            {['Design', 'Content & Videoproductie', 'Frontend Development', 'Digitale Producten', 'Websites', 'AI Tools & Generative Systems'].map((cap) => (
                                <span
                                    key={cap}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border)',
                                        fontSize: '0.75rem',
                                        fontWeight: 550,
                                        letterSpacing: '0.02em',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {cap}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingTop: 'var(--space-1)' }}>
                        {stats.map(({ number, label }, i) => (
                            <div
                                key={label}
                                style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: 'var(--space-4)',
                                    paddingBottom: i < stats.length - 1 ? 'var(--space-6)' : 0,
                                    borderBottom: i < stats.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                }}
                            >
                                <span style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: 600,
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1,
                                    color: 'var(--text-primary)',
                                    minWidth: '3.5ch',
                                }}>
                                    {number}
                                </span>
                                <span style={{
                                    fontSize: 'var(--fs-sm)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--text-tertiary)',
                                    fontWeight: 550,
                                }}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile responsive override */}
                <style>{`
                    @media (max-width: 768px) {
                        .about-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>

            </div>
        </section>
    );
}
