import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { onAnchorClick } from "../lib/scroll";
import { defaultMessage, track, waLink } from "../lib/whatsapp";
import AirFlow from "./AirFlow";
import Swoosh from "./Swoosh";
import Icon from "./Icon";

export default function FinalCta() {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(".final__inner > *", {
      y: 50, opacity: 0, duration: 1.1, stagger: 0.1, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
    gsap.fromTo(".final .swoosh", { yPercent: 30 }, {
      yPercent: 0, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="final">
      <AirFlow />
      <Swoosh />
      <div className="final__inner">
        <span className="eyebrow">O calor não espera</span>
        <h2 className="final__title">Seu ar gelando ainda esta semana.</h2>
        <div className="hero__ctas">
          <a href="#agendar" className="btn btn--white btn--lg btn--shiny" onClick={onAnchorClick}>
            <Icon name="calendar" /> Agendar visita
          </a>
          <a href={waLink(defaultMessage)} target="_blank" rel="noopener" className="btn btn--ghost btn--lg btn--shiny" onClick={() => track("clique_whatsapp", { origem: "final" })}>
            <Icon name="chat" /> Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
