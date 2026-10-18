import { useEffect, useRef } from "react";
import { onAnchorClick } from "../lib/scroll";
import Logo from "./Logo";
import Icon from "./Icon";

const links = [
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Antes e depois", href: "#antes-depois" },
  { label: "Dúvidas", href: "#duvidas" },
];

export default function Nav() {
  const ref = useRef(null);

  // Fica branca depois que sai do topo (lê o scroll direto: funciona até em saltos e recarregamentos)
  useEffect(() => {
    const update = () => ref.current.classList.toggle("is-scrolled", window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header ref={ref} className="nav">
      <a href="#topo" onClick={onAnchorClick} aria-label="Climard Ar Condicionado, início">
        <Logo />
      </a>
      <nav className="nav__links" aria-label="Principal">
        {links.map((l) => <a key={l.href} href={l.href} onClick={onAnchorClick}>{l.label}</a>)}
      </nav>
      <a href="#agendar" className="btn btn--primary btn--sm" onClick={onAnchorClick}>
        <Icon name="calendar" size={16} /> <span>Agendar<span className="hide-sm"> visita</span></span>
      </a>
    </header>
  );
}
