import { useScrollReveal } from '../hooks/useScrollReveal';
import CtaButton from './CtaButton';

type Actor = 'you' | 'we' | 'client';

const steps: {
  num: string;
  actor: Actor;
  actorLabel: string;
  time: string;
  title: string;
  text: string;
}[] = [
  {
    num: '1',
    actor: 'you',
    actorLabel: 'Вы',
    time: '2 мин',
    title: 'Клиент пришёл с мелким чеком — вы даёте код и направляете к нам',
    text: 'Не отказывайте. Дайте клиенту код бронирования и направьте к нам в Telegram. До 15 000 ₽ — KYC по закону не требуется, клиент идёт к терминалу сразу. От 15 000 ₽ — клиент сначала проходит KYC через нас.',
  },
  {
    num: '2',
    actor: 'we',
    actorLabel: 'Мы',
    time: '2 мин',
    title: 'Мы проводим KYC',
    text: 'Клиент проходит удалённую идентификацию через наш Telegram-бот. Лицензированные KYC-провайдеры из реестра Минцифры. Полное соответствие 115-ФЗ.',
  },
  {
    num: '3',
    actor: 'we',
    actorLabel: 'Мы',
    time: '5 мин',
    title: 'Передаём данные вам',
    text: 'Данные идентификации поступают к вам. Клиент идёт к терминалу.',
  },
  {
    num: '4',
    actor: 'client',
    actorLabel: 'Клиент',
    time: '4 мин',
    title: 'Клиент вносит наличные',
    text: 'Клиент подходит к терминалу, вводит код бронирования, вносит деньги. Вы видите зачисление в реальном времени.',
  },
  {
    num: '5',
    actor: 'you',
    actorLabel: 'Вы',
    time: '15–20 мин',
    title: 'Вы отправляете крипту',
    text: 'Переводите клиенту крипту по вашему курсу из средств нашего депозита. Ваша комиссия зафиксирована.',
  },
];

const actorStyles: Record<Actor, { bg: string; color: string; border: string; dotBg: string; dotColor: string }> = {
  you: {
    bg: '#EEF2FF',
    color: '#1B2B4B',
    border: '#C7D2FE',
    dotBg: '#1B2B4B',
    dotColor: 'white',
  },
  we: {
    bg: '#EFF6FF',
    color: '#1D4ED8',
    border: '#BFDBFE',
    dotBg: '#3B6CF0',
    dotColor: 'white',
  },
  client: {
    bg: '#F9FAFB',
    color: '#374151',
    border: '#E5E7EB',
    dotBg: '#6B7280',
    dotColor: 'white',
  },
};

export default function StepsSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="steps" className="section" style={{ background: '#EBEEF3' }}>
      <div className="section-inner reveal" ref={ref}>
        <div className="section-label">Процесс</div>
        <h2 className="section-title" style={{ maxWidth: 680 }}>
          Путь клиента: от мелкого чека до крипты на кошельке
        </h2>
        <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
          Мы разворачиваем сеть криптоматов, которые принимают наличные от ваших клиентов.
          Вы устанавливаете курс обмена. Ваша комиссия — в каждой операции. Без вложений.
          Без операторов. Риск невозврата средств закрыт депозитом.
        </p>

        {/* Actor legend */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {([['you', 'Вы'], ['we', 'Мы'], ['client', 'Клиент']] as [Actor, string][]).map(([actor, label]) => {
            const s = actorStyles[actor];
            return (
              <div
                key={actor}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 20,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: s.color,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: s.dotBg,
                    flexShrink: 0,
                  }}
                />
                {label}
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {steps.map((step, i) => {
            const s = actorStyles[step.actor];
            const isLast = i === steps.length - 1;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '0',
                  position: 'relative',
                }}
              >
                {/* Left: dot + line */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 48,
                    paddingTop: '0.1rem',
                  }}
                >
                  {/* Circle with step number */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: s.dotBg,
                      color: s.dotColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    {step.num}
                  </div>
                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 24,
                        background: 'linear-gradient(to bottom, #D0D4DB, #E2E5EA)',
                        marginTop: 4,
                        marginBottom: 4,
                      }}
                    />
                  )}
                </div>

                {/* Right: card content */}
                <div
                  style={{
                    flex: 1,
                    marginLeft: '1rem',
                    marginBottom: isLast ? 0 : '1rem',
                    background: 'white',
                    border: `1px solid ${s.border}`,
                    borderRadius: 12,
                    padding: '1.25rem 1.25rem 1.25rem',
                    paddingTop: '1rem',
                  }}
                >
                  {/* Actor badge + time */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.6rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: s.color,
                        background: s.bg,
                        border: `1px solid ${s.border}`,
                        padding: '0.15rem 0.55rem',
                        borderRadius: 10,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {step.actorLabel}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        color: '#9CA3AF',
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ fontSize: '0.8rem' }}>⏱</span>
                      {step.time}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#1A1F36',
                      lineHeight: 1.35,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: '#6B7280',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary banner */}
        <div
          style={{
            marginTop: '2rem',
            background: '#1B2B4B',
            borderRadius: 12,
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
              Итого от первого контакта до крипты
            </div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              ~30 минут
            </div>
          </div>
          <div
            style={{
              width: 1,
              height: 40,
              background: 'rgba(255,255,255,0.15)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
              Ваше личное время
            </div>
            <div style={{ color: '#6B9AFF', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              около 3 минут
            </div>
          </div>
          <div
            style={{
              width: 1,
              height: 40,
              background: 'rgba(255,255,255,0.15)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
              Ваши вложения
            </div>
            <div style={{ color: '#6B9AFF', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              0 ₽
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <CtaButton blockNumber={3} text="Обсудить подключение →" />
        </div>
      </div>
    </section>
  );
}
