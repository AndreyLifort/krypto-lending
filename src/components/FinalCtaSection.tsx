import { useScrollReveal } from '../hooks/useScrollReveal';
import CtaButton from './CtaButton';

export default function FinalCtaSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="section"
      style={{
        background: 'white',
      }}
    >
      <div className="section-inner reveal" ref={ref} style={{ textAlign: 'center' }}>
        <h2
          style={{
            color: '#1A1F36',
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1rem',
            maxWidth: 600,
            margin: '0 auto 1rem',
            letterSpacing: '-0.03em',
          }}
        >
          Готовы начать?
        </h2>

        <p
          style={{
            color: '#6B7280',
            fontSize: '1.05rem',
            marginBottom: '2.5rem',
            maxWidth: 500,
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Напишите нам в Telegram — обсудим условия за 15 минут. Без обязательств.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <CtaButton
            blockNumber={9}
            text="Обсудить подключение →"
          />
        </div>

        <div
          className="grid-cols-responsive"
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
          {[
            {
              title: 'Ответим быстро',
              text: 'В течение 2 часов в Telegram',
            },
            {
              title: 'Расскажем условия',
              text: 'Ответим на вопросы подробно',
            },
            {
              title: 'Без обязательств',
              text: 'Ничего подписывать не нужно',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="card"
              style={{
                textAlign: 'left',
                padding: '1.5rem',
              }}
            >
              <h4
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#1A1F36',
                  marginBottom: '0.25rem',
                }}
              >
                {item.title}
              </h4>
              <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
