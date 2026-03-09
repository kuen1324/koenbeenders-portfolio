'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function VideoSection() {
    const sectionRef = useScrollReveal('is-revealed', { threshold: 0.2 }) as React.RefObject<HTMLElement>;
    const contentRef = useScrollReveal('is-revealed', { threshold: 0.2 }) as React.RefObject<HTMLDivElement>;

    return (
        <section className="video-section" id="video" ref={sectionRef} aria-label="Design philosophy">
            {/* Ambient animated gradient background */}
            <div className="video-section__bg" aria-hidden="true">
                <div className="video-section__gradient" />
            </div>

            {/* Content — contentRef drives fade-up/word-reveal cascade */}
            <div className="video-section__content container" ref={contentRef}>
                <p className="label fade-up">Philosophy</p>
                <h2 className="display display--lg video-section__heading word-reveal">
                    {['Design', 'that', 'moves', 'at', 'the', 'speed', 'of', 'thought.'].map((w, i) => (
                        <span key={i} className="word"><span>{w}&nbsp;</span></span>
                    ))}
                </h2>
                <p className="fade-up video-section__body">
                    Every pixel has purpose. Every animation has meaning.
                    I build websites that feel as good as they look.
                </p>
            </div>
        </section>
    );
}
