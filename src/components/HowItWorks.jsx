import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { steps } from "../data";
import Icon from "./Icon";

const icons = ["calendar", "whatsapp", "home-cool"];

export default function HowItWorks() {
  const ref = useRef(null);

  useGSAP(() => {
    // Linha que "liga" os passos conforme o scroll
    gsap.fromTo(".how__line span", { scaleX: 0 }, {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: ".how__steps", start: "top 75%", end: "bottom 60%", scrub: true },
    });
    gsap.from(".how__step", {
      y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: "expo.out",
      scrollTrigger: { trigger: ".how__steps", start: "top 80%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="section how alt">
      <div className="section__head section__head--center">
        <span className="eyebrow">Como funciona</span>
        <h2 className="h2">Agendar é <em>simples.</em></h2>
      </div>
      <div className="how__steps">
        <div className="how__line" aria-hidden="true"><span /></div>
        {steps.map((s, i) => (
          <div className="how__step" key={s.title}>
            <span className="how__icon"><Icon name={icons[i]} size={26} /><i>{i + 1}</i></span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
