'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { brand } from '@/lib/brand';
import MagneticEffect from './ui/MagneticEffect';
import BackgroundPaths from './ui/background-paths';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const ctaContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%',
                once: true,
            },
            defaults: { ease: 'power3.out' },
        });

        if (headlineRef.current) {
            tl.from(headlineRef.current, { opacity: 0, y: 32, duration: 0.8 });
        }

        if (ctaContainerRef.current) {
            tl.from(ctaContainerRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.2');
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="section contact dark-section" id="contact" aria-label="Get in touch" style={{ paddingBlock: 'clamp(5rem, 10vh, 8rem)', borderBottom: 'none', position: 'relative', overflow: 'hidden' }}>
            {/* Background paths layer */}
            <BackgroundPaths />

            {/* Content layer — positioned above paths */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div className="contact__content" style={{ textAlign: 'center', background: 'transparent', boxShadow: 'none', paddingBlock: 0 }}>
                        <h2 ref={headlineRef} className="display--xl" style={{ color: 'var(--text-dark-primary)', lineHeight: '1.2', marginBottom: 'var(--space-8)' }}>
                            Have a project{' '}
                            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dark-tertiary)' }}>in mind?</span>
                        </h2>

                        {/* Email display */}
                        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-dark-secondary)', marginBottom: 'var(--space-10)', letterSpacing: '0.02em' }}>
                            Currently available for freelance and contract work.
                        </p>

                        <div ref={ctaContainerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
                            <MagneticEffect strength={0.3}>
                                <a href={`https://mail.google.com/mail/?view=cm&to=${brand.email}`} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ padding: 'var(--space-5) var(--space-10)', fontSize: 'var(--fs-lg)', transition: 'all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)' }}>
                                    Get in Touch
                                </a>
                            </MagneticEffect>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
