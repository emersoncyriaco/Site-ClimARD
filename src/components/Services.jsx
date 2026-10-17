import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useBooking } from "../lib/booking";
import { services } from "../data";
import Icon from "./Icon";

export default function Services() {
  const ref = useRef(null);
  const { requestBooking } = useBooking();

  useGSAP(() => {
    gsap.utils.toArray(".service").forEach((card, i) =>
      gsap.from(card, {
        y: 80, opacity: 0, rotateX: -12, duration: 1.2, delay: (i % 2) * 0.1, ease: "expo.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      })
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="section services light" id="servicos">
      <div className="section__head">
        <span className="eyebrow">Serviços</span>
        <h2 className="h2">O que a Clima RD <em>resolve.</em></h2>
      </div>

      <div className="services__grid">
        {services.map((s, i) => (
          <article key={s.id} className="service card">
            <div className="service__top">
              <span className="service__icon"><Icon name={s.icon} size={24} /></span>
              <span className="service__num">0{i + 1}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <ul>
              {s.includes.map((item) => <li key={item}><Icon name="check" size={14} stroke={2.4} />{item}</li>)}
            </ul>
            <button className="btn btn--outline" onClick={() => requestBooking({ service: s.id })}>
              Agendar {s.title.split(" ")[0].toLowerCase()} <Icon name="arrow" size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
