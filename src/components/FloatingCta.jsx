import { useEffect, useRef } from "react";
import { defaultMessage, track, waLink } from "../lib/whatsapp";
import Icon from "./Icon";

// Botão flutuante do WhatsApp.
// Aparece depois do topo e some enquanto o formulário de agendamento está na tela.
export default function FloatingCta() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const hero = document.getElementById("topo");
    const booking = document.getElementById("agendar");

    const update = () => {
      const vh = window.innerHeight;
      const pastHero = hero.getBoundingClientRect().bottom < vh * 0.6;
      const b = booking.getBoundingClientRect();
      const onBooking = b.top < vh * 0.8 && b.bottom > vh * 0.2;
      el.classList.toggle("is-visible", pastHero && !onBooking);
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
    <a
      ref={ref}
      href={waLink(defaultMessage)}
      target="_blank"
      rel="noopener"
      className="fab"
      aria-label="Falar pelo WhatsApp"
      onClick={() => track("clique_whatsapp", { origem: "flutuante" })}
    >
      <Icon name="whatsapp" size={28} />
      <span className="fab__tip" aria-hidden="true">Falar pelo WhatsApp</span>
    </a>
  );
}
