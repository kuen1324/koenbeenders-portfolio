import { brand } from '@/lib/brand';
import MagneticEffect from './ui/MagneticEffect';

export default function Footer() {
    const socialEntries = Object.entries(brand.socials) as [string, string][];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" role="contentinfo" aria-label="Footer" style={{ borderTopLeftRadius: '4rem', borderTopRightRadius: '4rem', overflow: 'hidden', background: 'var(--surface-alt)' }}>
            <div className="container" style={{ paddingTop: 'var(--space-16)' }}>
                <div className="footer__content">
                    {/* Left column: branding & tagline */}
                    <div className="footer__col footer__col--brand">
                        <h3 className="footer__brand" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{brand.name}</h3>
                        <p className="footer__tagline" style={{ color: 'var(--text-secondary)' }}>Strategic design director building digital products that matter.</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'var(--space-4)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                            <span className="pulse-dot-anim" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                            System Operational
                        </div>
                    </div>

                    {/* Center column: navigation */}
                    <div className="footer__col footer__col--nav">
                        <p className="footer__col-label">Navigation</p>
                        <nav aria-label="Footer navigation">
                            <ul className="footer__links" role="list">
                                {['Work', 'About', 'Contact'].map((l) => (
                                    <li key={l}>
                                        <MagneticEffect strength={0.2}>
                                            <a href={`#${l.toLowerCase()}`} className="footer__link">
                                                {l}
                                            </a>
                                        </MagneticEffect>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Right column: socials & CTA */}
                    <div className="footer__col footer__col--social">
                        <p className="footer__col-label">Connect</p>
                        <div className="footer__socials">
                            {socialEntries.map(([name, url]) => (
                                <MagneticEffect key={name} strength={0.2}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer__social-link"
                                        aria-label={`${brand.name} on ${name}`}
                                    >
                                        {name}
                                    </a>
                                </MagneticEffect>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer__divider"></div>

                {/* Bottom: copyright & legal */}
                <div className="footer__bottom">
                    <p className="footer__copy">
                        © {currentYear} {brand.name}. All rights reserved.
                    </p>
                    <div className="footer__legal">
                        <a href="#" className="footer__legal-link">Privacy</a>
                        <a href="#" className="footer__legal-link">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
