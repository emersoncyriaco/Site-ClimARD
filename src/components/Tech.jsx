import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { media, tools } from "../data";
import Media from "./Media";
import Icon from "./Icon";
import Swoosh from "./Swoosh";

export default function Tech() {
  const ref = useRef(null);

  useGSAP(() => {
    // Foto revela de baixo para cima e faz parallax
    gsap.from(".tech__frame", {
      clipPath: "inset(100% 0% 0% 0% round 20px)", duration: 1.6, ease: "expo.out",
      scrollTrigger: { trigger: ".tech__frame", start: "top 80%" },
    });
    gsap.fromTo(".tech__img", { yPercent: -8 }, {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: ".tech__frame", start: "top bottom", end: "bottom top", scrub: true },
    });

    // Itens entram um a um, com a linha azul crescendo
    gsap.utils.toArray(".equip__item").forEach((item) => {
      gsap.timeline({ scrollTrigger: { trigger: item, start: "top 88%" } })
        .from(item, { x: 40, opacity: 0, duration: 1, ease: "expo.out" })
        .from(item.querySelector(".equip__line"), { scaleY: 0, duration: 0.8, ease: "power3.out" }, 0.2);
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="section tech dark" id="diagnostico">
      <Swoosh className="swoosh--section" />
      <div className="tech__layout">
        <div className="tech__media">
          <div className="tech__frame">
            <Media src={media.tools} alt="Técnico medindo o ar-condicionado" className="tech__img" />
          </div>
          <div className="tech__stat">
            <b>4</b>
            <span>medições em<br />cada diagnóstico</span>
          </div>
        </div>

        <div>
          <div className="section__head">
            <span className="eyebrow">Diagnóstico de precisão</span>
            <h2 className="h2">Nada de chute. <em>Medição.</em></h2>
            <p className="lead">
              Equipamentos profissionais mostram o que está errado antes de trocar qualquer peça.
              Você economiza e o conserto dura.
            </p>
          </div>
          <ol className="equip">
            {tools.map((t, i) => (
              <li className="equip__item" key={t.name}>
                <span className="equip__line" />
                <span className="equip__icon"><Icon name={t.icon} size={22} /></span>
                <div>
                  <h3><small>0{i + 1}</small>{t.name}</h3>
                  <p>{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
