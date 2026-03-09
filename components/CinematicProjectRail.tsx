'use client';

import { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/projects';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicProjectRail() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Filter projects that have cover images or use fallback
    const displayProjects = useMemo(() => {
        return projects.slice(0, 5); // Take first 5 for the cinematic rail
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !sliderRef.current) return;

        const slider = sliderRef.current;
        const sections = gsap.utils.toArray('.rail-panel');
        
        // Pin the container and translate the slider horizontally
        const scrollTween = gsap.to(slider, {
            x: () => -(slider.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                end: () => "+=" + (slider.scrollWidth - (window.innerWidth * 0.15)), // Account for partial width panels
                invalidateOnRefresh: true,
            }
        });

        // Entrance animations for each panel
        sections.forEach((section: any) => {
            const content = section.querySelector('.rail-panel__content');
            const bgWrapper = section.querySelector('.rail-panel__bg-wrapper');
            
            // Entrance: Opacity 0->1, translateY 60px->0, Scale 0.96->1
            gsap.fromTo(content,
                { 
                    opacity: 0, 
                    y: 60,
                    scale: 0.96
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6, // Exactly 600ms per spec
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: scrollTween,
                        start: "left 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // Subtle parallax for background
            const bg = section.querySelector('.rail-panel__bg');
            gsap.fromTo(bg, 
                { x: "-5%" },
                { 
                    x: "5%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: scrollTween,
                        scrub: true,
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="rail-container">
            <div ref={sliderRef} className="rail-slider">
                {displayProjects.map((project, index) => (
                    <section key={project.slug} className="rail-panel">
                        <div className="rail-panel__inner">
                            <div className="rail-panel__bg-wrapper">
                                <div 
                                    className="rail-panel__bg"
                                    style={{ 
                                        backgroundImage: `url(${project.coverImage || '/gallery/hero-fallback.jpg'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="rail-panel__overlay" />
                                </div>
                            </div>
                            
                            <div className="rail-panel__content">
                                <div className="rail-panel__info">
                                    <span className="rail-panel__number">{project.num}</span>
                                    <p className="rail-panel__tag">{project.tag}</p>
                                </div>
                                
                                <h2 className="rail-panel__title display display--xl">
                                    {project.title}
                                </h2>
                                
                                <div className="rail-panel__meta">
                                    <div className="rail-panel__meta-item">
                                        <span className="label">Role</span>
                                        <span>{project.role}</span>
                                    </div>
                                    <div className="rail-panel__meta-item">
                                        <span className="label">Year</span>
                                        <span>{project.year}</span>
                                    </div>
                                </div>

                                <Link href={`/work/${project.slug}`} className="rail-panel__link">
                                    <span>Explore Project</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

