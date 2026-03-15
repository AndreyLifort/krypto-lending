import { useScrollReveal } from '../hooks/useScrollReveal';
import DotGridBackground from './DotGridBackground';
import CtaButton from './CtaButton';

const features = [
  {
    emoji: '🛡',
    title: 'Криптомат = ваша удалённая касса',
    text: 'Терминал — это как маленькая офлайн-точка в другом районе города. Только вместо живого оператора — автомат, который принимает наличные по вашим правилам.',
  },
  {
    emoji: '💰',
    title: 'Депозит 50 000 ₽ — до начала работы',
    text: 'Мы размещаем у вас депозит от 50 000 ₽. Клиент вносит наличные — вы отправляете крипту из средств депозита. Пополняем в тот же день.',
  },
  {
    emoji: '🔒',
    title: 'Оборудование, аренда, инкассация — наше',
    text: 'Терминалы оформлены на нашу компанию. Аренда, инкассация, охрана, техобслуживание — наши расходы. С каждым обменником заключается договор с фиксацией всех условий.',
  },
  {
    emoji: '📍',
    title: 'География без вложений',
    text: 'Терминалы в новых районах и городах — ваши удалённые кассы. Принимайте клиентов там, где у вас нет физического присутствия. Без аренды, без персонала.',
  },
];

export default function AuthoritySection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="authority" className="section" style={{ position: 'relative', background: '#EBEEF3', overflow: 'hidden' }}>
      <DotGridBackground
        spacing={20}
        minRadius={0.4}
        maxRadius={2.5}
        baseOpacity={0.12}
        speed={0.7}
      />
      <div className="section-inner reveal" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">Инфраструктура</div>
        <h2 className="section-title" style={{ maxWidth: 500 }}>
          Что на нас
        </h2>

        <div className="grid-cols-2-responsive" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
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

        <div style={{ textAlign: 'center' }}>
          <CtaButton blockNumber={8} text="Обсудить подключение →" />
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '0.75rem' }}>
            Ответим в Telegram в течение 2 часов
          </p>
        </div>
      </div>
    </section>
  );
}
