"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
    id: number;
    title: string;
    url: string;
    colors: [string, string];
}

interface GalleryProps {
    sectionRef: React.RefObject<HTMLElement>;
}

const galleryImages: GalleryImage[] = [
    { id: 1, title: "The Witness", url: "/gallery/g10.webp", colors: ["rgba(160, 60, 20, 0.15)", "rgba(80, 30, 10, 0.05)"] },
    { id: 2, title: "Still Life with Heron", url: "/gallery/g2.webp", colors: ["rgba(130, 130, 100, 0.12)", "rgba(65, 65, 50, 0.04)"] },
    { id: 3, title: "Inferno", url: "/gallery/g5.webp", colors: ["rgba(200, 100, 20, 0.18)", "rgba(100, 50, 10, 0.06)"] },
    { id: 4, title: "Quiet Surrender", url: "/gallery/g6.webp", colors: ["rgba(180, 130, 140, 0.15)", "rgba(90, 65, 70, 0.05)"] },
    { id: 5, title: "Trace", url: "/gallery/g9.webp", colors: ["rgba(40, 35, 30, 0.12)", "rgba(20, 18, 15, 0.04)"] },
    { id: 6, title: "The Ritual", url: "/gallery/g1.webp", colors: ["rgba(140, 40, 30, 0.15)", "rgba(70, 20, 15, 0.05)"] },
    { id: 7, title: "Crimson Horizon", url: "/gallery/g7.webp", colors: ["rgba(180, 40, 20, 0.15)", "rgba(90, 20, 10, 0.05)"] },
    { id: 8, title: "Fracture", url: "/gallery/g3.webp", colors: ["rgba(60, 35, 25, 0.15)", "rgba(30, 18, 12, 0.05)"] },
    { id: 9, title: "Night Watch", url: "/gallery/g8.webp", colors: ["rgba(30, 80, 30, 0.12)", "rgba(15, 40, 15, 0.04)"] },
    { id: 10, title: "The Passage", url: "/gallery/g4.webp", colors: ["rgba(40, 80, 70, 0.15)", "rgba(20, 40, 35, 0.05)"] },
];

const DEFAULT_COLORS: [string, string] = ["rgba(100, 100, 110, 0.05)", "rgba(50, 50, 55, 0.02)"];

export default function Gallery({ sectionRef }: GalleryProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mouseMoveRaf = useRef<number | null>(null);

    // Update mood colors
    const updateMoodColors = useCallback((colors: [string, string]) => {
        const root = document.documentElement;
        root.style.setProperty("--mood-1", colors[0]);
        root.style.setProperty("--mood-2", colors[1]);
    }, []);

    // Initialize with neutral colors
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--mood-1", DEFAULT_COLORS[0]);
        root.style.setProperty("--mood-2", DEFAULT_COLORS[1]);
    }, []);

    // Pause float animations when gallery is off-screen
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const state = entry.isIntersecting ? 'running' : 'paused';
                container.querySelectorAll<HTMLElement>('.float-v, .float-h, .float-b, .float-r').forEach((el) => {
                    el.style.animationPlayState = state;
                });
            },
            { threshold: 0.05 }
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Scroll reveal
    useGSAP(
        () => {
            if (!containerRef.current) return;

            const items = containerRef.current.querySelectorAll(".gallery-item");
            if (items.length === 0) return;

            // Fallback: if sectionRef is not ready, make items visible immediately
            if (!sectionRef.current) {
                items.forEach(item => {
                    (item as HTMLElement).style.opacity = '1';
                });
                return;
            }

            // Clean, stable entrance reveal
            items.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: index * 0.08,
                        ease: "power2.out",
                        clearProps: "all", // Crucial: removes inline transforms after reveal for stability
                        scrollTrigger: {
                            trigger: sectionRef.current!,
                            start: "top 75%",
                            once: true,
                        },
                    }
                );
            });

            // Scroll-Linked Depth Shift
            // Row-based logic for structured base
            items.forEach((item, index) => {
                const shiftSpeeds = [-10, 5, -8, 12, -15, 8, -6, 14];
                const shift = shiftSpeeds[index % shiftSpeeds.length];

                gsap.to(item, {
                    y: `+=${shift}`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current!,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                    },
                });
            });
        },
        { scope: containerRef, dependencies: [sectionRef] }
    );

    // Spotlight focus - dim surrounding images
    const handleSpotlight = (index: number, entering: boolean) => {
        if (!containerRef.current) return;
        const items = containerRef.current.querySelectorAll(".gallery-item__inner");

        items.forEach((item, i) => {
            if (entering && i !== index) {
                gsap.to(item, { opacity: 0.5, duration: 0.3, ease: "power2.out" });
            } else if (!entering) {
                gsap.to(item, { opacity: 1, duration: 0.3, ease: "power2.out" });
            }
        });
    };

    // Premium Bounded 3D Mouse Tracking — rAF throttled to prevent layout thrash
    const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        if (window.matchMedia("(max-width: 639px)").matches) return;
        // Safari: skip 3D tilt tracking — adds pointer latency on every move event
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) return;
        if (mouseMoveRaf.current !== null) return; // Already a frame pending

        const clientX = e.clientX;
        const clientY = e.clientY;

        mouseMoveRaf.current = requestAnimationFrame(() => {
            mouseMoveRaf.current = null;
            const item = itemRefs.current[index];
            if (!item) return;

            const interactionLayer = item.querySelector(".gallery-item__interaction");
            const img = item.querySelector(".gallery-item__image");
            if (!interactionLayer || !img) return;

            const rect = interactionLayer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const xPercent = (clientX - centerX) / (rect.width / 2);
            const yPercent = (clientY - centerY) / (rect.height / 2);

            const maxRotate = 4;
            const maxShiftX = 6;
            const maxShiftY = 6;

            gsap.to(interactionLayer, {
                rotateX: yPercent * -maxRotate,
                rotateY: xPercent * maxRotate,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });

            gsap.to(img, {
                x: xPercent * -maxShiftX,
                y: yPercent * -maxShiftY,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });
        });
    };

    // Hover interactions - cinematic focus and zoom
    const handleHover = (index: number, entering: boolean) => {
        const item = itemRefs.current[index];
        if (!item) return;

        const interactionLayer = item.querySelector(".gallery-item__interaction") as HTMLDivElement;
        const img = item.querySelector(".gallery-item__image") as HTMLImageElement;
        const overlay = item.querySelector(".gallery-item__overlay") as HTMLDivElement;
        const viewText = item.querySelector(".gallery-item__view") as HTMLDivElement;

        if (entering) {
            if (interactionLayer) gsap.to(interactionLayer, { y: -8, scale: 1.02, duration: 0.6, ease: "power3.out", overwrite: "auto" });
            if (img) gsap.to(img, { scale: 1.05, duration: 0.8, ease: "power3.out", overwrite: "auto" });
            if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4, overwrite: "auto" });
            if (viewText) gsap.to(viewText, { opacity: 1, y: 0, duration: 0.4, delay: 0.1, overwrite: "auto" });
        } else {
            if (interactionLayer) gsap.to(interactionLayer, { y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
            if (img) gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
            if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4, overwrite: "auto" });
            if (viewText) gsap.to(viewText, { opacity: 0, y: 10, duration: 0.4, overwrite: "auto" });
        }
    };

    const handleSelect = (image: GalleryImage) => {
        setSelectedId(image.id);
        updateMoodColors(image.colors);
        setLightbox(image);
    };

    const closeLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    // Prevent scroll when lightbox is open
    useEffect(() => {
        if (lightbox) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [lightbox]);

    // ESC to close lightbox
    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [lightbox, closeLightbox]);

    // Floating ambient classes mapping randomly to items
    const floatingClasses = ["float-v", "float-h", "float-b", "float-r", "float-h", "float-v", "float-r", "float-b"];
    const floatingDelays = ["-14s", "-12s", "-4s", "-8s", "-2s", "-16s", "-6s", "-10s"];

    return (
        <>
            <div className="gallery-grid" ref={containerRef}>
                {galleryImages.map((image, i) => (
                    <div
                        key={image.id}
                        ref={(el) => {
                            itemRefs.current[i] = el;
                        }}
                        className={`gallery-item ${selectedId === image.id ? " gallery-item--active" : ""}`}
                    >
                        <div
                            className={`gallery-item__motion ${floatingClasses[i % floatingClasses.length]}`}
                            style={{ animationDelay: floatingDelays[i % floatingDelays.length], perspective: "1200px" }}
                        >
                            <div className="gallery-item__interaction"
                                onMouseMove={(e) => handleMouseMove(i, e)}
                                onMouseEnter={() => { handleHover(i, true); handleSpotlight(i, true); }}
                                onMouseLeave={() => { handleHover(i, false); handleSpotlight(i, false); }}
                                onClick={() => handleSelect(image)}
                            >
                                <div className="gallery-item__media">
                                    <Image
                                        src={image.url}
                                        alt={image.title}
                                        className="gallery-item__image"
                                        fill
                                        loading="lazy"
                                        quality={100}
                                        sizes="(max-width: 639px) 100vw, (max-width: 1024px) 50vw, 800px"
                                    />
                                </div>
                                <div className="gallery-item__overlay">
                                    <div className="gallery-item__content">
                                        <span className="gallery-item__label">Experiment 0{image.id}</span>
                                        <h3 className="gallery-item__title">{image.title}</h3>
                                        <div className="gallery-item__view" style={{ opacity: 0, transform: "translateY(10px)" }}>
                                            <span>Expand</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {lightbox && (
                <div
                    className="gallery-lightbox"
                    role="dialog"
                    aria-modal="true"
                    onClick={closeLightbox}
                >
                    <div className="gallery-lightbox__backdrop" />
                    <button
                        className="gallery-lightbox__close"
                        onClick={closeLightbox}
                        aria-label="Close"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <div className="gallery-lightbox__inner" onClick={(e) => e.stopPropagation()}>
                        <div className="gallery-lightbox__image-wrap">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={lightbox.url} alt={lightbox.title} className="gallery-lightbox__image" />
                        </div>
                        <div className="gallery-lightbox__info">
                            <p className="gallery-lightbox__title">{lightbox.title}</p>
                            <span className="gallery-lightbox__meta">Visual Experiment &copy; 2025</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
