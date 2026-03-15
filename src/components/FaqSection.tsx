import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import DotGridBackground from './DotGridBackground';

const faqs = [
  {
    q: 'Сколько времени занимает подключение?',
    a: 'Подписываем договор, размещаем депозит, настраиваем терминал. 1–3 дня от договора до первой операции.',
  },
  {
    q: 'Что будет, если терминал сломается или клиент пожалуется?',
    a: 'Техобслуживание — наша зона. Если терминал глючит — мы решаем. Если клиенту не пришла крипта — он обращается к вам, как при обычной операции.',
  },
  {
    q: 'Как часто пополняется депозит?',
    a: 'По мере расходования — в тот же день. Баланс не опускается ниже суммы операции. Каждое пополнение — допсоглашение.',
  },
  {
    q: 'Будет ли клиент готов заплатить повышенную комиссию?',
    a: 'В США криптоматы работают с комиссией 10–18%. Клиент платит за сервис: обмен наличных на крипту за 30 минут, без регистрации на бирже, без P2P-рисков. Аудитория терминала — не трейдер, а человек, которому крипта нужна здесь и сейчас.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section" style={{ position: 'relative', background: '#EBEEF3', overflow: 'hidden' }}>
      <DotGridBackground
        spacing={22}
        minRadius={0.4}
        maxRadius={2}
        baseOpacity={0.1}
        speed={0.6}
      />
      <div className="section-inner reveal" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 720 }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Частые вопросы</h2>
        </div>

        <div style={{ maxWidth: 720 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid #D0D4DB',
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#1A1F36',
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  color="#9CA3AF"
                  style={{
                    flexShrink: 0,
                    transition: 'transform 0.25s ease',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>

              <div
                style={{
                  maxHeight: openIndex === i ? 300 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}
              >
                <p
                  style={{
                    padding: '0 0 1.25rem',
                    color: '#6B7280',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
