import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const objections = [
  {
    q: '«Зачем мне это, если я и так зарабатываю на крупняке?»',
    a: 'Мелкий чек — не вместо, а в дополнение. Нулевая нагрузка на команду: вы тратите ~3 минуты на операцию. KYC, приём наличных, инкассация — наше. 40 клиентов — до 420 000 ₽/год дополнительного дохода.',
  },
  {
    q: '«К терминалам ходят сомнительные личности»',
    a: 'От 15 000 ₽ — полный удалённый KYC. Без идентификации клиент не проведёт операцию. До 15 000 ₽ — суммы минимальные, идентификация не требуется по закону. Каждая операция фиксируется.',
  },
  {
    q: '«Какие юридические риски я беру?»',
    a: 'Те же, что и сейчас. AML-скрининг и отправка крипты — ваша зона, как при любой операции. KYC — наша зона. Оборудование — наше. Всё фиксируется договором.',
  },
  {
    q: '«А если вы исчезнете / кинете?»',
    a: 'Мы размещаем у вас депозит от 50 000 ₽ до начала работы. Вы работаете нашими деньгами. Каждое пополнение — допсоглашение. Финансовый риск невозврата — на нас.',
  },
  {
    q: '«90% заявок — жертвы мошенников. Полиция придёт туда, где человек отдал наличные»',
    a: 'Логика та же, что и с банком: человек снял наличку, передал мошенникам — банк не виноват. Мы закрываем этот риск на нескольких уровнях:\n\n• KYC проходится заранее, а не в момент операции — есть время на проверку.\n• Клиент подтверждает, что пополняет собственный кошелёк.\n• Через терминал идут мелкие суммы (25–50К) — мошенникам нет смысла гнать жертву в криптомат по 30–50К.\n• Каждая операция задокументирована: KYC, договор оферты с клиентом, фиксация операции.',
  },
  {
    q: '«Терминалы могут арестовать, повесить статью за незаконные финоперации»',
    a: 'Именно поэтому мы строим инфраструктуру, которая соответствует закону с первого дня — в отличие от существующих терминалов, работавших без KYC. Полный KYC, фиксация каждой операции, договор оферты с клиентом, соответствие 115-ФЗ — это наш контур защиты. Терминалы оформлены на нашу компанию. Вы не фигурируете как владелец оборудования.',
  },
  {
    q: '«Как проверить цели покупки крипты и заключить договор с клиентом?»',
    a: 'На этапе KYC клиент подтверждает, что пополняет собственный кошелёк и подписывает рамочный договор на обмен. Это тот же процесс, который обменники должны проводить сейчас — только мы делаем это дистанционно и передаём вам готовые документы.',
  },
];

export default function ComparisonSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="section-inner reveal" ref={ref}>
        <div className="section-label">Возражения</div>
        <h2 className="section-title" style={{ maxWidth: 600, marginBottom: '3rem' }}>
          Вопросы, которые возникают у обменников
        </h2>

        <div style={{ maxWidth: 760 }}>
          {objections.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid #D0D4DB',
                borderTop: i === 0 ? '1px solid #D0D4DB' : 'none',
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#1A1F36',
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  color="#9CA3AF"
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    transition: 'transform 0.25s ease',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>

              <div
                style={{
                  maxHeight: openIndex === i ? 600 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease',
                }}
              >
                <div style={{ padding: '0 0 1.25rem' }}>
                  {item.a.split('\n\n').map((para, pi) => (
                    <p
                      key={pi}
                      style={{
                        color: '#4B5563',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        marginBottom: pi < item.a.split('\n\n').length - 1 ? '0.75rem' : 0,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
