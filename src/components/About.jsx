import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { business } from "../data";
import Icon from "./Icon";

const points = [
  "Medições feitas à sua frente",
  "Nenhum serviço desnecessário",
  "Local limpo ao final do serviço",
];

export default function About() {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(".about__content > *", {
      y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out",
      scrollTrigger: { trigger: ".about__content", start: "top 80%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="section about light" id="quem-somos">
      <div className="about__media">
        <div className="about__slot" data-slot data-rot="0" />
        <div className="about__badge">
          <Icon name="shield" size={18} />
          <div><b>{business.technician}</b><small>Responsável técnico</small></div>
        </div>
      </div>
      <div className="about__content">
        <span className="eyebrow">Quem vai até a sua casa</span>
        <h2 className="h2">Técnico especialista, <em>não um curioso.</em></h2>
        <p className="lead">
          Na {business.name}, cada atendimento começa com um diagnóstico completo, para que você
          entenda exatamente de que o aparelho precisa.
        </p>
        <ul className="checklist">
          {points.map((p) => <li key={p}><span><Icon name="check" size={14} stroke={2.4} /></span>{p}</li>)}
        </ul>
      </div>
    </section>
  );
}
