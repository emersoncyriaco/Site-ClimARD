import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

const messages = [
  <>Ar fraco, barulho, <em className="hot">água pingando</em>…</>,
  <>Diagnóstico com <em>ferramentas de precisão.</em></>,
  <>E o seu ambiente <em>gelando de novo.</em></>,
];

// Seção travada: a temperatura cai de 32° para 18° conforme o scroll
export default function TempDrop() {
  const ref = useRef(null);
  const numRef = useRef(null);

  useGSAP(() => {
    const temp = { v: 32 };
    const msgs = gsap.utils.toArray(".drop__msg");
    gsap.set(msgs.slice(1), { autoAlpha: 0, y: 30 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: ref.current, start: "top top", end: "+=220%", pin: true, scrub: 0.6, anticipatePin: 1 },
    });

    tl.to(temp, { v: 18, duration: 3, onUpdate: () => (numRef.current.textContent = Math.round(temp.v)) }, 0)
      .to(".drop__glow--hot", { opacity: 0, duration: 3 }, 0)
      .to(".drop__glow--cold", { opacity: 1, duration: 3 }, 0)
      .fromTo(".drop__temp", { color: "#ff7a45" }, { color: "#ffffff", duration: 3 }, 0)
      .fromTo(".drop__temp sup", { color: "#ff7a45" }, { color: "#3d8bff", duration: 3 }, 0)
      .fromTo(".drop__bar span", { scaleY: 1, backgroundColor: "#ff7a45" }, { scaleY: 0.25, backgroundColor: "#1f5fff", duration: 3 }, 0)
      .to(".drop__frost", { opacity: 1, duration: 1.2 }, 1.8)
      .to(msgs[0], { autoAlpha: 0, y: -30, duration: 0.4 }, 0.8)
      .to(msgs[1], { autoAlpha: 1, y: 0, duration: 0.4 }, 1)
      .to(msgs[1], { autoAlpha: 0, y: -30, duration: 0.4 }, 1.8)
      .to(msgs[2], { autoAlpha: 1, y: 0, duration: 0.4 }, 2);
  }, { scope: ref });

  return (
    <section ref={ref} className="drop dark" aria-label="Do calor ao frio">
      <div className="drop__glow drop__glow--hot" />
      <div className="drop__glow drop__glow--cold" />
      <div className="drop__frost" />

      <div className="drop__inner">
        <div className="drop__gauge">
          <div className="drop__bar"><span /></div>
          <div className="drop__temp" aria-live="off">
            <span ref={numRef}>32</span><sup>°C</sup>
          </div>
        </div>
        <div className="drop__msgs">
          {messages.map((m, i) => <p className="drop__msg" key={i}>{m}</p>)}
        </div>
      </div>
    </section>
  );
}
