import { useScrollReveal } from '../hooks/useScrollReveal';

const cards = [
  {
    emoji: '💸',
    title: 'Доход с каждой сделки — без участия оператора',
    text: 'Оператор тратит на мелкий чек столько же, сколько на крупный. Через терминал — ваш доход без нагрузки на команду.',
  },
  {
    emoji: '⏰',
    title: 'KYC — удалённо, без визита в обменник',
    text: 'Мы проводим идентификацию клиента удалённо — через нас, без визита в обменник. Данные KYC передаём вам. Вы не тратите ни минуты.',
  },
  {
    emoji: '📈',
    title: '6 визитов в год = 10 500 ₽ чистой прибыли с одного клиента',
    text: 'Каждый клиент, которому вы сегодня отказываете — это 10 500 ₽ годовой прибыли, которая уходит к конкурентам или просто никому.',
  },
];

export default function AgitateSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="agitate" className="section" style={{ background: 'white' }}>
      <div className="section-inner reveal" ref={ref}>
        <div className="section-label">Проблема</div>
        <h2 className="section-title" style={{ maxWidth: 700 }}>
          Мелкий чек — не убыток, а регулярный доход, который проходит мимо
        </h2>

        <p className="section-subtitle" style={{ marginBottom: '0.5rem' }}>
          В среднем клиент с мелким чеком совершает 6 операций в год. Это 10 500 ₽ чистой прибыли
          обменнику с одного клиента. 40 таких клиентов — 420 000 ₽/год дополнительного дохода
          с одного терминала.
        </p>
        <p style={{ color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '3rem' }}>
          * При среднем чеке 25 000 ₽ за один обмен.
        </p>

        <div className="grid-cols-responsive" style={{ marginBottom: '3rem' }}>
          {cards.map((card, i) => (
            <div key={i} className="card">
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
                {card.emoji}
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
                {card.title}
              </h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.65 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            color: '#4B5563',
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.6,
            fontStyle: 'italic',
            borderLeft: '3px solid #3B6CF0',
            paddingLeft: '1.25rem',
          }}
        >
          Мы нашли способ превратить каждого «невыгодного» клиента в источник регулярного дохода — без нагрузки на вашу команду. Вот как это работает.
        </p>
      </div>
    </section>
  );
}
