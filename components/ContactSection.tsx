'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { brand } from '@/lib/brand';
import MagneticEffect from './ui/MagneticEffect';

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
        <section ref={sectionRef} className="section contact dark-section" id="contact" aria-label="Get in touch" style={{ paddingBlock: 'clamp(8rem, 15vh, 15rem)', borderBottom: 'none' }}>
            <div className="container">
                <div className="contact__content" style={{ textAlign: 'center', background: 'transparent', boxShadow: 'none', paddingBlock: 0 }}>
                    <h2 ref={headlineRef} className="display--xl" style={{ color: 'var(--text-dark-primary)', lineHeight: '1.2', marginBottom: 'var(--space-12)' }}>
                        Let&apos;s build something <br />
                        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dark-tertiary)' }}>remarkable.</span>
                    </h2>

                    <div ref={ctaContainerRef} style={{ display: 'flex', justifyContent: 'center' }}>
                        <MagneticEffect strength={0.3}>
                            <a href={`mailto:${brand.email}`} className="btn btn--primary" style={{ padding: 'var(--space-5) var(--space-10)', fontSize: 'var(--fs-lg)', transition: 'all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)' }}>
                                Start a Conversation
                            </a>
                        </MagneticEffect>
                    </div>
                </div>
            </div>
        </section>
    );
}
