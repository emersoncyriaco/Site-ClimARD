import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { onAnchorClick } from "../lib/scroll";
import { waLink, defaultMessage, track } from "../lib/whatsapp";
import { media } from "../data";
import AirFlow from "./AirFlow";
import Swoosh from "./Swoosh";
import Media from "./Media";
import Icon from "./Icon";

export default function Hero() {
  const ref = useRef(null);

  useGSAP(() => {
    // Entrada
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".hero__eyebrow", { y: 20, opacity: 0, duration: 0.8 })
      .from(".hero__title .line > span", { yPercent: 110, duration: 1.2, stagger: 0.1 }, "-=0.5")
      .from(".hero__lead, .hero__ctas, .hero__trust", { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.8")
      .from(".badge-card", { y: 30, opacity: 0, duration: 1, stagger: 0.15 }, "-=0.6")
      .from(".swoosh path", { xPercent: 30, opacity: 0, duration: 1.8, stagger: 0.15, ease: "power3.out" }, 0);

    // Selos flutuando de leve
    gsap.utils.toArray(".badge-card").forEach((card, i) =>
      gsap.to(card, { y: i % 2 ? 8 : -8, duration: 3 + i * 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" })
    );

    // Ao rolar: conteúdo sobe devagar e os arcos deslizam
    gsap.to(".hero__content", {
      yPercent: -12, opacity: 0.3, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero .swoosh", {
      yPercent: 18, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="hero dark" id="topo">
      <div className="hero__bg" aria-hidden="true">
        <Media type="video" src={media.heroVideo} className="hero__video" fallback={null} />
        <AirFlow />
        <Swoosh />
      </div>

      <div className="hero__content">
        <span className="hero__eyebrow"><span className="pulse" /> Conserto · Manutenção · Higienização</span>
        <h1 className="hero__title">
          <span className="line"><span>Seu ar <em>gelando</em></span></span>
          <span className="line"><span>como novo.</span></span>
        </h1>
        <p className="hero__lead">
          Assistência técnica em ar-condicionado com diagnóstico de precisão: medimos capacitor,
          pressão do gás e corrente elétrica antes de mexer em qualquer peça.
        </p>
        <div className="hero__ctas">
          <a href="#agendar" className="btn btn--primary btn--lg" onClick={onAnchorClick}>
            <Icon name="calendar" /> Agendar visita
          </a>
          <a href={waLink(defaultMessage)} target="_blank" rel="noopener" className="btn btn--ghost btn--lg" onClick={() => track("clique_whatsapp", { origem: "hero" })}>
            <Icon name="chat" /> Chamar no WhatsApp
          </a>
        </div>
        <ul className="hero__trust">
          <li><Icon name="check" size={16} /> Orçamento antes do serviço</li>
          <li><Icon name="check" size={16} /> Todas as marcas</li>
          <li><Icon name="check" size={16} /> Garantia no serviço</li>
        </ul>
      </div>

      <div className="hero__visual">
        <div className="hero__slot" data-slot />
        <div className="badge-card badge-card--a">
          <span className="badge-card__icon"><Icon name="shield" size={20} /></span>
          <div><b>Garantia</b><small>em todos os serviços</small></div>
        </div>
        <div className="badge-card badge-card--b">
          <span className="badge-card__icon"><Icon name="gauge" size={20} /></span>
          <div><b>Diagnóstico</b><small>com medição profissional</small></div>
        </div>
      </div>
    </section>
  );
}
