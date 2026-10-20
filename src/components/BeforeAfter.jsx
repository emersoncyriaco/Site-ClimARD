import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { media } from "../data";
import Media from "./Media";
import Icon from "./Icon";

// Enquanto não há fotos, mostra aletas de serpentina desenhadas em CSS
const FinsFallback = ({ dirty }) => <div className={`fins ${dirty ? "fins--dirty" : "fins--clean"}`} />;

export default function BeforeAfter() {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromPointer = (clientX) => {
    const r = frameRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  // Ao aparecer, a barra "dança" para mostrar que dá para arrastar
  useGSAP(() => {
    const p = { v: 50 };
    gsap.timeline({ scrollTrigger: { trigger: frameRef.current, start: "top 70%" } })
      .to(p, { v: 22, duration: 0.8, ease: "power2.inOut", onUpdate: () => setPos(p.v) })
      .to(p, { v: 78, duration: 1, ease: "power2.inOut", onUpdate: () => setPos(p.v) })
      .to(p, { v: 50, duration: 0.8, ease: "power2.inOut", onUpdate: () => setPos(p.v) });

    gsap.from(frameRef.current, {
      clipPath: "inset(12% 12% 12% 12% round 20px)", duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: frameRef.current, start: "top 85%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="section ba alt" id="antes-depois">
      <div className="section__head">
        <span className="eyebrow">Antes × depois</span>
        <h2 className="h2">A diferença que você <em>respira.</em></h2>
        <p className="lead">Arraste para comparar. Sem higienização, o aparelho acumula sujeira e gasta mais energia.</p>
      </div>

      <div
        ref={frameRef}
        className="ba__frame"
        style={{ "--pos": `${pos}%` }}
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); setFromPointer(e.clientX); }}
        onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="ba__layer">
          <Media src={media.after} alt="Turbina e bandeja do ar-condicionado limpas, depois da higienização" className="ba__img" fallback={<FinsFallback />} />
          <span className="ba__tag ba__tag--after">Depois</span>
        </div>
        <div className="ba__layer ba__layer--before">
          <Media src={media.before} alt="Turbina e bandeja do ar-condicionado sujas, antes da higienização" className="ba__img" fallback={<FinsFallback dirty />} />
          <span className="ba__tag ba__tag--before">Antes</span>
        </div>
        <div className="ba__handle" aria-hidden="true">
          <span><Icon name="drag" size={20} stroke={2} /></span>
        </div>
        <input
          className="sr-only"
          type="range"
          min="0"
          max="100"
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparar antes e depois"
        />
      </div>
    </section>
  );
}
