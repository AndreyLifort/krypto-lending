import { useScrollReveal } from '../hooks/useScrollReveal';
import DotGridBackground from './DotGridBackground';

export default function MarketProofSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="section"
      style={{
        position: 'relative',
        background: '#0C1425',
        overflow: 'hidden',
      }}
    >
      <DotGridBackground
        dotColor="107, 154, 255"
        dotColorNeutral="60, 80, 140"
        spacing={20}
        minRadius={0.4}
        maxRadius={2.5}
        baseOpacity={0.15}
        speed={0.5}
      />
      <div className="section-inner reveal" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="section-label"
          style={{
            background: 'rgba(59, 108, 240, 0.12)',
            borderColor: 'rgba(59, 108, 240, 0.3)',
            color: '#6B9AFF',
          }}
        >
          Рынок
        </div>

        <h2
          style={{
            color: 'white',
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            maxWidth: 700,
            letterSpacing: '-0.03em',
          }}
        >
          Более 5 000 криптоматов в США.{' '}
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>
            Модель работает.
          </span>
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            maxWidth: 640,
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}
          >
            В США крипто-терминалы — индустрия с миллиардными оборотами. Комиссия 10–18%, полный AML-контур. В России этот рынок пуст: существующие терминалы работали без KYC — нелегально. Мы строим инфраструктуру, которая соответствует закону с первого дня.
          </p>
        </div>
      </div>
    </section>
  );
}
