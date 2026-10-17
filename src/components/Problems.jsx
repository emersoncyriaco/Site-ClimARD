import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useBooking } from "../lib/booking";
import { problems } from "../data";
import Icon from "./Icon";

// Mapeia o título do card para a opção equivalente no agendamento
const toBookingProblem = {
  "Não está gelando": "Não gela",
  "Pingando água": "Pingando água",
  "Barulho estranho": "Barulho",
  "Cheiro ruim": "Cheiro ruim",
  "Liga e desliga sozinho": "Liga e desliga",
  "Conta de luz alta": "Conta de luz alta",
};

export default function Problems() {
  const ref = useRef(null);
  const { requestBooking } = useBooking();

  useGSAP(() => {
    gsap.from(".problem", {
      y: 60, opacity: 0, duration: 1, stagger: 0.07, ease: "expo.out",
      scrollTrigger: { trigger: ".problems__grid", start: "top 85%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="section problems alt" id="problemas">
      <div className="section__head">
        <span className="eyebrow">Reconhece algum desses?</span>
        <h2 className="h2">Seu ar está dando <em>sinal.</em></h2>
        <p className="lead">Toque no problema e agende a visita com ele já informado.</p>
      </div>

      <div className="problems__grid">
        {problems.map((p) => (
          <button
            key={p.title}
            className="problem card"
            onClick={() => requestBooking({ service: p.service, problem: toBookingProblem[p.title] })}
          >
            <span className="problem__icon"><Icon name={p.icon} size={22} /></span>
            <h3>{p.title}</h3>
            <p>{p.hint}</p>
            <span className="problem__cta">Agendar visita <Icon name="arrow" size={16} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}
