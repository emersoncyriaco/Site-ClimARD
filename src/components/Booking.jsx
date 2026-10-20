import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { buildBookingMessage, track, waLink } from "../lib/whatsapp";
import { booking, business } from "../data";
import Icon from "./Icon";

const STEPS = ["Serviço", "Aparelho", "Data", "Seus dados"];

const initial = {
  service: "",
  problems: [],
  type: "",
  btus: "Não sei",
  qty: 1,
  date: null,
  period: "",
  name: "",
  address: "",
  notes: "",
};

// Próximos dias de atendimento (inclui hoje)
function nextDays(count = 14) {
  const out = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; out.length < count && i < 31; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (business.workingDays.includes(d.getDay())) out.push({ date: d, offset: i });
  }
  return out;
}

const weekday = (d) => new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(d).replace(".", "");
const dayMonth = (d) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(d);
const sameDay = (a, b) => a && b && a.getTime() === b.getTime();

function Chip({ active, children, onClick, className = "" }) {
  return (
    <button type="button" className={`chip ${active ? "is-active" : ""} ${className}`} onClick={onClick} aria-pressed={active}>
      {children}
    </button>
  );
}

export default function Booking() {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial);
  const [sent, setSent] = useState(false);
  const days = useMemo(() => nextDays(), []);

  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  const toggleProblem = (p) =>
    set({ problems: data.problems.includes(p) ? data.problems.filter((x) => x !== p) : [...data.problems, p] });

  const serviceLabel = booking.services.find((s) => s.id === data.service)?.label ?? "";
  const showProblems = data.service === "conserto" || data.service === "diagnostico" || data.problems.length > 0;

  const valid = [
    !!data.service,
    !!data.type,
    !!data.date && !!data.period,
    data.name.trim().length > 1 && data.address.trim().length > 2,
  ];

  const message = step === 4 ? buildBookingMessage(data, serviceLabel) : "";

  // Transição entre passos
  useGSAP(() => {
    gsap.fromTo(".bk-step", { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
  }, { scope: cardRef, dependencies: [step], revertOnUpdate: true });

  // Entrada da seção
  useGSAP(() => {
    gsap.from(".booking__pitch > *", {
      y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
    gsap.from(cardRef.current, {
      y: 80, opacity: 0, duration: 1.2, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
  }, { scope: ref });

  const next = () => valid[step] && setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));
  const send = () => {
    track("agendamento_enviado", { servico: serviceLabel });
    setSent(true);
  };
  const restart = () => { setData(initial); setStep(0); setSent(false); };

  return (
    <section ref={ref} className="section booking light" id="agendar">
      <div className="booking__pitch">
        <span className="eyebrow">Agendamento on-line</span>
        <h2 className="h2">Agende sua visita técnica <em>agora.</em></h2>
        <p className="lead">Escolha o serviço, o dia e o período. A solicitação chega diretamente ao WhatsApp do técnico.</p>
        <ul className="checklist">
          <li><span><Icon name="check" size={14} stroke={2.4} /></span>Sem cadastro e sem senha</li>
          <li><span><Icon name="check" size={14} stroke={2.4} /></span>Tudo em menos de um minuto</li>
          <li><span><Icon name="check" size={14} stroke={2.4} /></span>Diagnóstico, serviço e teste final no horário combinado</li>
        </ul>
        <div className="booking__info">
          <span><Icon name="clock" size={16} /> {business.hours}</span>
          <span><Icon name="pin" size={16} /> {business.region}</span>
        </div>
      </div>

      <div ref={cardRef} className="bk card">
        {/* Progresso */}
        <div className="bk__progress" aria-label={`Passo ${Math.min(step + 1, 4)} de 4`}>
          {STEPS.map((s, i) => (
            <div key={s} className={`bk__dot ${i < step ? "is-done" : ""} ${i === step ? "is-current" : ""}`}>
              <span>{i < step ? <Icon name="check" size={12} stroke={3} /> : i + 1}</span>
              <small>{s}</small>
            </div>
          ))}
          <div className="bk__bar"><span style={{ transform: `scaleX(${Math.min(step, 3) / 3})` }} /></div>
        </div>

        <div className="bk-step" key={step}>
          {step === 0 && (
            <>
              <h3 className="bk__title">Do que você precisa?</h3>
              <div className="bk__options">
                {booking.services.map((s) => (
                  <Chip key={s.id} active={data.service === s.id} onClick={() => set({ service: s.id })} className="chip--block">
                    {s.label}
                  </Chip>
                ))}
              </div>
              {showProblems && (
                <>
                  <h4 className="bk__subtitle">O que está acontecendo? <small>(opcional)</small></h4>
                  <div className="bk__chips">
                    {booking.problems.map((p) => (
                      <Chip key={p} active={data.problems.includes(p)} onClick={() => toggleProblem(p)}>{p}</Chip>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="bk__title">Qual é o aparelho?</h3>
              <div className="bk__chips">
                {booking.types.map((t) => <Chip key={t} active={data.type === t} onClick={() => set({ type: t })}>{t}</Chip>)}
              </div>
              <h4 className="bk__subtitle">Potência (BTU)</h4>
              <div className="bk__chips">
                {booking.btus.map((b) => <Chip key={b} active={data.btus === b} onClick={() => set({ btus: b })}>{b}</Chip>)}
              </div>
              <h4 className="bk__subtitle">Quantos aparelhos?</h4>
              <div className="stepper">
                <button type="button" onClick={() => set({ qty: Math.max(1, data.qty - 1) })} aria-label="Diminuir"><Icon name="minus" size={18} /></button>
                <output aria-live="polite">{data.qty}</output>
                <button type="button" onClick={() => set({ qty: Math.min(20, data.qty + 1) })} aria-label="Aumentar"><Icon name="plus" size={18} /></button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="bk__title">Qual é o melhor dia?</h3>
              <div className="bk__days" role="listbox" aria-label="Dias disponíveis">
                {days.map(({ date, offset }) => (
                  <button
                    type="button"
                    key={date.toISOString()}
                    role="option"
                    aria-selected={sameDay(data.date, date)}
                    className={`day ${sameDay(data.date, date) ? "is-active" : ""}`}
                    onClick={() => set({ date })}
                  >
                    <small>{offset === 0 ? "Hoje" : offset === 1 ? "Amanhã" : weekday(date)}</small>
                    <b>{dayMonth(date)}</b>
                  </button>
                ))}
              </div>
              <h4 className="bk__subtitle">Período</h4>
              <div className="bk__options bk__options--2">
                {business.periods.map((p) => (
                  <Chip key={p} active={data.period === p} onClick={() => set({ period: p })} className="chip--block">{p}</Chip>
                ))}
              </div>
              <p className="bk__note">O técnico confirmará o horário exato pelo WhatsApp.</p>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="bk__title">Para quem é a visita?</h3>
              <label className="field">
                <span>Seu nome</span>
                <input value={data.name} onChange={(e) => set({ name: e.target.value })} placeholder="Como podemos chamar você?" autoComplete="name" />
              </label>
              <label className="field">
                <span>Endereço ou bairro</span>
                <input value={data.address} onChange={(e) => set({ address: e.target.value })} placeholder="Rua, número e bairro" autoComplete="street-address" />
              </label>
              <label className="field">
                <span>Observação <small>(opcional)</small></span>
                <textarea rows={2} value={data.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Ex.: o aparelho fica no 2º andar, e o portão é azul." />
              </label>
            </>
          )}

          {step === 4 && !sent && (
            <>
              <h3 className="bk__title">Confira e confirme</h3>
              <div className="ticket">
                <div><small>Serviço</small><b>{serviceLabel}</b></div>
                {data.problems.length > 0 && <div><small>Problema</small><b>{data.problems.join(", ")}</b></div>}
                <div><small>Aparelho</small><b>{data.type} · {data.btus === "Não sei" ? "potência não informada" : `${data.btus} BTU`} · {data.qty}x</b></div>
                <div><small>Quando</small><b>{weekday(data.date)} {dayMonth(data.date)} · {data.period}</b></div>
                <div><small>Nome</small><b>{data.name}</b></div>
                <div><small>Local</small><b>{data.address}</b></div>
              </div>
              <a className="btn btn--whats btn--lg btn--block btn--shiny" href={waLink(message)} target="_blank" rel="noopener" onClick={send}>
                <Icon name="chat" /> Confirmar pelo WhatsApp
              </a>
              <p className="bk__note">O WhatsApp será aberto com a mensagem pronta. Basta tocar em “Enviar”.</p>
            </>
          )}

          {step === 4 && sent && (
            <div className="bk__done">
              <span className="bk__done-icon"><Icon name="check" size={34} stroke={2.4} /></span>
              <h3 className="bk__title">Quase lá!</h3>
              <p>Toque em <b>“Enviar”</b> no WhatsApp. O técnico confirmará o horário com você nessa conversa.</p>
              <div className="bk__done-actions">
                <a className="btn btn--whats" href={waLink(message)} target="_blank" rel="noopener">Abrir o WhatsApp novamente</a>
                <button type="button" className="btn btn--ghost" onClick={restart}>Novo agendamento</button>
              </div>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="bk__nav">
            {step > 0 ? (
              <button type="button" className="btn btn--ghost" onClick={back}><Icon name="back" size={16} /> Voltar</button>
            ) : <span />}
            <button type="button" className="btn btn--primary" onClick={next} disabled={!valid[step]}>
              {step === 3 ? "Revisar agendamento" : "Continuar"} <Icon name="arrow" size={16} />
            </button>
          </div>
        )}
        {step === 4 && !sent && (
          <div className="bk__nav">
            <button type="button" className="btn btn--ghost" onClick={back}><Icon name="back" size={16} /> Editar</button>
            <span />
          </div>
        )}
      </div>
    </section>
  );
}
