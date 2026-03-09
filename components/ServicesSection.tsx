'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScrollReveal } from '@/hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const services = [
    { num: '01', title: 'Creative Development', tag: 'Next.js · React · TypeScript' },
    { num: '02', title: 'Motion & Interaction', tag: 'GSAP · Lenis · Framer' },
    { num: '03', title: 'Visual Design', tag: 'Identity · Design Systems' },
    { num: '04', title: 'UX Strategy', tag: 'Research · Flows · Prototypes' },
];

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useScrollReveal('is-revealed', { threshold: 0.2 }) as React.RefObject<HTMLDivElement>;

    useGSAP(() => {
        gsap.fromTo(
            '.service-item',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
            }
        );
    }, []);

    return (
        <section className="section services section-border" id="services" ref={sectionRef} aria-label="Services and Expertise">
            <div className="container">
                <div className="services__inner">
                    {/* Sticky left label */}
                    <div className="services__sticky" ref={headlineRef}>
                        <p className="label" style={{ marginBottom: 'var(--space-4)' }} aria-hidden="true">Expertise</p>
                        <h2 className="display display--lg word-reveal">
                            {['My', 'Expertise'].map((w, i) => (
                                <span key={i} className="word"><span>{w}&nbsp;</span></span>
                            ))}
                        </h2>
                    </div>

                    {/* Right: service list */}
                    <ul className="services__list" role="list">
                        {services.map((s) => (
                            <li key={s.num} className="service-item" role="listitem">
                                <span className="service-item__num" aria-hidden="true">{s.num}</span>
                                <span className="service-item__title">{s.title}</span>
                                <span className="service-item__tag">{s.tag}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
