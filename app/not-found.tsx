'use client';
import Link from 'next/link';
import { useMagnetic } from '@/hooks/useMagnetic';

export default function NotFound() {
    const magRef = useMagnetic(0.3) as React.RefObject<HTMLAnchorElement>;

    return (
        <main className="section" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div className="container">
                <span className="label" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>Error 404</span>
                <h1 className="display display--xl" style={{ marginBottom: 'var(--space-8)' }}>
                    Lost in <br />
                    <em style={{ color: 'var(--accent)' }}>Perspective.</em>
                </h1>
                <p className="fade-up" style={{
                    maxWidth: '40ch',
                    margin: '0 auto var(--space-12)',
                    color: 'var(--muted)',
                    opacity: 1,
                    transform: 'none'
                }}>
                    The page you are looking for has been moved or doesn&apos;t exist.
                    Let&apos;s get you back to the showcase.
                </p>
                <Link href="/" className="btn" ref={magRef}>
                    <span>Return home</span>
                    <span>→</span>
                </Link>
            </div>
        </main>
    );
}
