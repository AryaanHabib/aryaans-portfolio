import { useEffect, useRef, useState } from 'react';
import { Link, useRouter } from '../router.jsx';
import { person } from '../content/site.js';

const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

// Set RESUME_URL to a verified, current PDF in /public to show the Resume link.
const RESUME_URL = null;

export function Header() {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();
  const buttonRef = useRef(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const links = (
    <>
      {nav.map((n) => (
        <li key={n.href}>
          <Link href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
        </li>
      ))}
      {RESUME_URL && (
        <li className="nav-resume">
          <a href={RESUME_URL}>Resume <span className="sr-only">(PDF)</span></a>
        </li>
      )}
    </>
  );

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="wordmark">
          {person.name}
        </Link>
        <nav aria-label="Primary" className="nav-desktop">
          <ul>{links}</ul>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <nav id="mobile-nav" aria-label="Primary" className="nav-mobile" hidden={!open}>
        <ul className="wrap">{links}</ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="contact" aria-labelledby="contact-title">
      <div className="wrap footer-grid">
        <div className="footer-lead">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="footer-title">
            If you’re hiring for an early-career software role, I’d like to hear about it.
          </h2>
          <p className="footer-email">
            <a href={`mailto:${person.email}`}>{person.email}</a>
          </p>
        </div>
        <ul className="footer-links">
          <li><span className="mono-label">LinkedIn</span><a href={person.linkedin} rel="noopener noreferrer">aryaan-habib</a></li>
          <li><span className="mono-label">GitHub</span><a href={person.github} rel="noopener noreferrer">AryaanHabib</a></li>
          <li><span className="mono-label">Based in</span><span>{person.location}</span></li>
        </ul>
      </div>
      <div className="wrap footer-base">
        <span>© 2026 Aryaan Habib</span>
        <span>Built with React and Vite. No tracking.</span>
      </div>
    </footer>
  );
}
