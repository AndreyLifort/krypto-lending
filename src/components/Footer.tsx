export default function Footer() {
  return (
    <footer
      style={{
        background: '#F0F2F5',
        padding: '3rem 1.25rem 2rem',
        borderTop: '1px solid #E2E5EA',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        {/* Logo & copyright */}
        <div style={{ flex: '1 1 240px' }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#1A1F36',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            криптоматы
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '0.8rem', lineHeight: 1.5 }}>
            Партнёрская программа для обменников.
            <br />
            © {new Date().getFullYear()}
          </p>
        </div>

        {/* Links columns */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1F36', marginBottom: '0.75rem', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
              Разделы
            </h4>
            {[
              { label: 'Проблема', href: '#agitate' },
              { label: 'Решение', href: '#solution' },
              { label: 'Как это работает', href: '#steps' },
              { label: 'Почему мы', href: '#authority' },
              { label: 'FAQ', href: '#faq' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  color: '#6B7280',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  padding: '0.2rem 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1F36')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1F36', marginBottom: '0.75rem', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
              Контакты
            </h4>
            <a
              href="https://t.me/lifort"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                color: '#6B7280',
                fontSize: '0.85rem',
                textDecoration: 'none',
                padding: '0.2rem 0',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1F36')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
