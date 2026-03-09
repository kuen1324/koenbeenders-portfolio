import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getProjectBySlug, projects } from '@/lib/projects';
import Navbar from '@/components/Navbar';

/* ── Metadata ────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const project = getProjectBySlug(params.slug);
    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} — Koen Beenders`,
        description: project.summary,
        openGraph: {
            title: project.title,
            description: project.summary,
            images: ['/placeholder.jpg'],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.summary,
            images: ['/placeholder.jpg'],
        },
    };
}

/* ── Static params ─────────────────────────────────────────────────────── */
export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

/* ── Gallery placeholder SVG ─────────────────────────────────────────────
   Inline SVG placeholder shown when src is empty.
   When you drop real images into public/work/voltmatch/, just fill in `src`.
──────────────────────────────────────────────────────────────────────────── */
function GalleryPlaceholder({ caption }: { caption: string }) {
    return (
        <figure className="case__gallery-item">
            <div className="case__gallery-placeholder" aria-label={caption}>
                <svg
                    viewBox="0 0 640 360"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: '100%' }}
                >
                    <rect width="640" height="360" fill="var(--bg-card)" />
                    <rect x="1" y="1" width="638" height="358" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
                    {/* Screen chrome */}
                    <rect x="48" y="48" width="544" height="264" rx="6" fill="var(--bg-up)" />
                    {/* Fake content lines */}
                    <rect x="72" y="80" width="180" height="10" rx="3" fill="var(--faint)" />
                    <rect x="72" y="100" width="120" height="8" rx="3" fill="var(--faint)" opacity="0.5" />
                    <rect x="72" y="134" width="480" height="140" rx="4" fill="var(--accent-bg)" />
                    {/* Icon center */}
                    <circle cx="320" cy="204" r="28" fill="var(--border-acc)" />
                    <path d="M310 204 L322 192 L334 204 L322 216Z" fill="var(--accent)" opacity="0.6" />
                </svg>
            </div>
            <figcaption className="case__gallery-caption">{caption}</figcaption>
        </figure>
    );
}

function GalleryImage({ src, caption }: { src: string; caption: string }) {
    if (!src) return <GalleryPlaceholder caption={caption} />;
    return (
        <figure className="case__gallery-item">
            <Image
                src={src}
                alt={caption}
                className="case__gallery-img"
                width={1400}
                height={800}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                sizes="(max-width: 960px) 100vw, (max-width: 1440px) 50vw, 700px"
            />
            <figcaption className="case__gallery-caption">{caption}</figcaption>
        </figure>
    );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug);
    if (!project) notFound();

    return (
        <>
            <Navbar />
            <main className="case">
                {/* ── Back nav ── */}
                <nav className="case__back container">
                    <Link href="/#work" className="case__back-link">
                        <span>←</span> <span>Back to work</span>
                    </Link>
                </nav>

                {/* ── Hero ── */}
                <header className="case__hero container">
                    <p className="label">{project.num} — {project.tag}</p>
                    <h1 className="display display--xl">{project.title}</h1>
                    <p className="case__subtitle">{project.subtitle}</p>

                    <div className="case__meta">
                        <div className="case__meta-item">
                            <span className="case__meta-label">Role</span>
                            <span className="case__meta-value">{project.role}</span>
                        </div>
                        <div className="case__meta-item">
                            <span className="case__meta-label">Period</span>
                            <span className="case__meta-value">{project.period}</span>
                        </div>
                        <div className="case__meta-item">
                            <span className="case__meta-label">Stack</span>
                            <span className="case__meta-value">{project.stack.join(' · ')}</span>
                        </div>
                    </div>

                    <div className="case__ctas">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                            >
                                <span>Live demo</span>
                                <span>↗</span>
                            </a>
                        )}
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--ghost"
                            >
                                <span>Repository</span>
                                <span>↗</span>
                            </a>
                        )}
                    </div>
                </header>

                {/* ── Summary ── */}
                <section className="case__summary container">
                    <p className="case__summary-text">{project.summary}</p>
                </section>

                {/* ── Gallery ── */}
                {project.gallery.length > 0 && (
                    <section className="case__gallery-section container">
                        <p className="label" style={{ marginBottom: '2rem' }}>Screenshots &amp; Gallery</p>
                        <div className="case__gallery-grid">
                            {project.gallery.map((img, i) => (
                                <GalleryImage key={i} src={img.src} caption={img.caption} />
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Case sections ── */}
                <div className="case__sections container">
                    {project.sections.length > 0 ? project.sections.map((section, i) => (
                        <section key={i} className="case__section">
                            <h2 className="case__section-heading">{section.heading}</h2>
                            <div className="case__section-body">
                                {section.body.split('\n').map((line, j) => {
                                    const trimmed = line.trim();
                                    if (!trimmed) return null;
                                    const isBullet = trimmed.startsWith('—');
                                    return (
                                        <p key={j} className={isBullet ? 'case__section-bullet' : ''}>
                                            {trimmed}
                                        </p>
                                    );
                                })}
                            </div>
                        </section>
                    )) : (
                        <div className="case__coming-soon">
                            <span className="label">In progress</span>
                            <p>Full case study coming soon.</p>
                        </div>
                    )}
                </div>

                {/* ── Footer CTA ── */}
                <div className="case__footer container">
                    <Link href="/#work" className="btn btn--ghost">
                        <span>← All projects</span>
                    </Link>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn">
                            <span>View live</span>
                            <span>↗</span>
                        </a>
                    )}
                </div>
            </main>
        </>
    );
}
