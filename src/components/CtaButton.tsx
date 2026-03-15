const TELEGRAM_URL = 'https://t.me/lifort';

interface CtaButtonProps {
  blockNumber: number;
  text?: string;
  className?: string;
}

async function trackClick(blockNumber: number) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blockNumber,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || null,
      }),
    });
  } catch {
    // Silently fail — tracking is non-critical
  }
}

function TelegramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export default function CtaButton({
  blockNumber,
  text = 'Обсудить подключение',
  className = '',
}: CtaButtonProps) {
  const handleClick = () => {
    trackClick(blockNumber);
  };

  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className || undefined}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        background: '#039BE5',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.95rem',
        padding: '0.75rem 1.5rem',
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background 0.2s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = '#0288D1';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = '#039BE5';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <TelegramIcon />
      {text}
    </a>
  );
}
