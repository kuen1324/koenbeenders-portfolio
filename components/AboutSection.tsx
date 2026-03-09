'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: '7+', label: 'Years' },
    { number: '50+', label: 'Projects' },
    { number: '12', label: 'Industries' },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current) return;

        const children = contentRef.current.querySelectorAll('h2, .text-base, :scope > div:last-child');

        gsap.fromTo(
            children,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
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
        <section className="section about" id="about" aria-label="About the designer" ref={sectionRef} style={{ paddingBlock: 'clamp(8rem, 15vh, 15rem)' }}>
            <div className="container">
                <div ref={contentRef} style={{ maxWidth: '800px', marginInline: 'auto', textAlign: 'center' }}>
                    
                    <h2 className="display--xl" style={{ lineHeight: '1.2', marginBottom: 'var(--space-8)' }}>
                        Most portfolios show work.<br/>
                        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-tertiary)', fontWeight: 400 }}>This one shows thinking.</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '600px', marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
                        <p className="text-base" style={{ fontSize: 'var(--fs-md)', color: 'var(--text-primary)' }}>
                            I&apos;m Koen Beenders, a creative developer and strategic designer based in Amsterdam.
                            I build digital exhibitions at the intersection of complex engineering and premium aesthetics.
                        </p>
                        <p className="text-base" style={{ fontSize: 'var(--fs-base)' }}>
                            With nearly a decade of experience across startups and global studios, I approach every project
                            as a complete system — ensuring the underlying architecture is as elegant as the interface.
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-12)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-8)' }}>
                        {stats.map(({ number, label }) => (
                            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-xl)', fontWeight: 600, color: 'var(--text-primary)' }}>{number}</span>
                                <span style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', fontWeight: 600 }}>{label}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
