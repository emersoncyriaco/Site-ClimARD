import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { onAnchorClick } from "../lib/scroll";
import { defaultMessage, track, waLink } from "../lib/whatsapp";
import Icon from "./Icon";

// Botão flutuante (desktop) + barra fixa de ação (mobile).
// Aparece depois do topo e some enquanto o formulário de agendamento está na tela.
export default function FloatingCta() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const hero = document.getElementById("topo");
    const booking = document.getElementById("agendar");
    gsap.set(el, { yPercent: 150 });
    let visible = false;

    const update = () => {
      const vh = window.innerHeight;
      const pastHero = hero.getBoundingClientRect().bottom < vh * 0.6;
      const b = booking.getBoundingClientRect();
      const onBooking = b.top < vh * 0.8 && b.bottom > vh * 0.2;
      const show = pastHero && !onBooking;
      if (show === visible) return;
      visible = show;
      gsap.to(el, { yPercent: show ? 0 : 150, duration: 0.5, ease: "expo.out", overwrite: true });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="floating">
      <a href="#agendar" className="btn btn--primary floating__book" onClick={onAnchorClick}>
        <Icon name="calendar" size={18} /> Agendar visita
      </a>
      <a
        href={waLink(defaultMessage)}
        target="_blank"
        rel="noopener"
        className="btn btn--whats floating__whats"
        aria-label="Falar pelo WhatsApp"
        onClick={() => track("clique_whatsapp", { origem: "flutuante" })}
      >
        <Icon name="chat" size={20} /> <span className="floating__label">WhatsApp</span>
      </a>
    </div>
  );
}
