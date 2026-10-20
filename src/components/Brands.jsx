import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { brands } from "../data";

// Faixa infinita de marcas que acelera com o scroll (parada para quem pediu menos movimento no sistema)
export default function Brands() {
  const trackRef = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const loop = gsap.to(trackRef.current, { xPercent: -50, repeat: -1, duration: 40, ease: "none" });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
        gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
      },
    });
  });

  const list = [...brands, ...brands];

  return (
    <div className="brands alt">
      <p className="brands__label">Atendemos todas as marcas</p>
      <p className="sr-only">Marcas atendidas: {brands.join(", ")}.</p>
      <div className="brands__viewport">
        <div ref={trackRef} className="brands__track" aria-hidden="true">
          {list.map((b, i) => (
            <Fragment key={i}>
              <span>{b}</span>
              <i className="brands__dot" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
