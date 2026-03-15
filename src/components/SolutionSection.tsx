import { useScrollReveal } from '../hooks/useScrollReveal';

const features = [
  {
    emoji: '🔐',
    title: 'Мы проводим KYC за вас',
    text: 'Удалённая идентификация через нас как ваших представителей по договору. Лицензированные провайдеры из реестра Минцифры РФ. Клиент не едет к вам — всё дистанционно.',
  },
  {
    emoji: '⏱',
    title: 'Быстро: 2 минуты на KYC',
    text: 'Клиент проходит идентификацию в Telegram за 2 минуты. Данные поступают к вам в течение 5 минут.',
  },
  {
    emoji: '📋',
    title: 'Полное соответствие 115-ФЗ',
    text: 'Все данные KYC передаются вам. Готовые данные для вашей системы учёта. Нулевая нагрузка на ваших операторов.',
  },
  {
    emoji: '🛡',
    title: 'До 15 000 ₽ — KYC не нужен',
    text: 'По закону идентификация не требуется при обмене до 15 000 ₽. Клиент просто приходит к терминалу с кодом.',
  },
];

export default function SolutionSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="solution" className="section" style={{ position: 'relative', background: 'white', overflow: 'hidden' }}>
      <div className="section-inner reveal" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">KYC</div>
        <h2 className="section-title" style={{ maxWidth: 640 }}>
          KYC на нашей стороне.{' '}
          <span style={{ color: '#6B7280' }}>Вы не тратите ни минуты.</span>
        </h2>

        {/* Problem callout */}
        <div
          style={{
            background: '#FDF0EF',
            border: '1px solid #FECACA',
            borderRadius: 10,
            padding: '1rem 1.25rem',
            marginBottom: '3rem',
            maxWidth: 640,
          }}
        >
          <p style={{ color: '#7F1D1D', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            <strong>Проблема:</strong> Идентификация мелкого клиента занимает столько же времени, сколько крупного. При чеке 15–25К это нерентабельно. Поэтому мелким клиентам отказывают.
          </p>
        </div>

        <div className="grid-cols-2-responsive">
          {features.map((feat, i) => (
            <div key={i} className="card" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: '#F1F3F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontSize: '1.25rem',
                }}
              >
                {feat.emoji}
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: '#1A1F36',
                  lineHeight: 1.3,
                }}
              >
                {feat.title}
              </h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                {feat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
