import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Проблема', href: '#agitate' },
  { label: 'Решение', href: '#solution' },
  { label: 'Как это работает', href: '#steps' },
  { label: 'Почему мы', href: '#authority' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(235, 238, 243, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            color: '#1A1F36',
            fontWeight: 700,
            fontSize: '1.2rem',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          криптоматы
        </a>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: '#4B5563',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1F36')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = '#4B5563')
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://t.me/lifort"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1B2B4B',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            Связаться →
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: '#1A1F36',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '0.6rem 0',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
