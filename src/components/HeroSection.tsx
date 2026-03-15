import CtaButton from './CtaButton';
import DotGridBackground from './DotGridBackground';

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        background: '#EBEEF3',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '7rem 1.25rem 5rem',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          gap: '3rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Dot zone */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-140px',
            right: '-140px',
            bottom: '-120px',
            pointerEvents: 'none',
            zIndex: 0,
            maskImage: 'radial-gradient(ellipse 55% 52% at 50% 48%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 52% at 50% 48%, black 30%, transparent 80%)',
          }}
        >
          <DotGridBackground
            dotColor="155, 165, 190"
            spacing={16}
            minRadius={0.9}
            maxRadius={1.2}
            baseOpacity={0.5}
            speed={0.25}
          />
        </div>

        {/* Left: text */}
        <div style={{ flex: '1 1 520px', minWidth: 0, position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            Партнёрская программа
          </div>

          <h1
            style={{
              color: '#1A1F36',
              fontSize: 'clamp(1.9rem, 5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              letterSpacing: '-0.035em',
              maxWidth: 650,
            }}
          >
            До 420 000 ₽/год дополнительного дохода —{' '}
            <span style={{ color: '#6B7280' }}>
              без аренды, без людей, без вложений
            </span>
          </h1>

          <p
            style={{
              color: '#6B7280',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 540,
            }}
          >
            Мы принимаем наличные от ваших клиентов через сеть криптоматов.
            Вы ставите свой курс. KYC — на нашей стороне. Ваши вложения: 0 ₽.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <CtaButton blockNumber={1} text="Обсудить подключение →" />
            <a href="#steps" className="cta-btn-outline">
              Как это работает
            </a>
          </div>

          <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
            Ответим в Telegram в течение 2 часов
          </p>
        </div>

        {/* Right: calculation card */}
        <div
          style={{
            flex: '0 1 380px',
            position: 'relative',
            zIndex: 1,
            background: 'white',
            border: '1px solid #E2E5EA',
            borderRadius: 14,
            padding: '2rem 1.75rem',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3
            style={{
              color: '#1A1F36',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: 'rgba(59, 108, 240, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
            }}>💰</span>
            Расчёт дохода
          </h3>

          {[
            { label: 'Средний чек', value: '25 000 ₽' },
            { label: 'Операций в месяц', value: '~20' },
            { label: 'Ваша прибыль с одной сделки', value: '1 750 ₽*' },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.7rem 0',
                borderBottom: '1px solid #F1F3F5',
              }}
            >
              <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>{row.label}</span>
              <span style={{ color: '#1A1F36', fontWeight: 600, fontSize: '0.9rem' }}>{row.value}</span>
            </div>
          ))}

          <div
            style={{
              marginTop: '1.25rem',
              padding: '1.25rem',
              background: '#F8F9FA',
              borderRadius: 10,
              textAlign: 'center',
              border: '1px solid #E2E5EA',
            }}
          >
            <div style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
              Доход с одного терминала
            </div>
            <div style={{ color: '#3B6CF0', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              35 000 ₽/мес
            </div>
            <div style={{ color: '#3B6CF0', fontSize: '1.05rem', fontWeight: 600, marginTop: '0.15rem' }}>
              420 000 ₽/год
            </div>
          </div>

          <p
            style={{
              marginTop: '1rem',
              color: '#9CA3AF',
              fontSize: '0.8rem',
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            * При среднем чеке 25 000 ₽. Ваши вложения: <strong style={{ color: '#1A1F36' }}>0 ₽</strong>. Риск невозврата закрыт нашим депозитом.
          </p>
        </div>
      </div>
    </section>
  );
}
