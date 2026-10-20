import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { media } from "../data";
import Media from "./Media";

const box = (el) => {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + window.scrollX,
    y: r.top + window.scrollY,
    width: r.width,
    height: r.height,
    rotation: Number(el.dataset.rot) || 0,
  };
};

const fromBox = (el) => ({
  x: () => box(el).x,
  y: () => box(el).y,
  width: () => box(el).width,
  height: () => box(el).height,
  rotation: () => box(el).rotation,
});

// Foto do técnico que "viaja" do topo até a seção "Quem vai até sua casa"
export default function Traveler() {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    const slots = gsap.utils.toArray("[data-slot]");
    if (!slots.length) return;

    const placeAtStart = () => gsap.set(el, box(slots[0]));
    placeAtStart();

    const triggers = slots.slice(1).map((slot, i) =>
      gsap.fromTo(el, fromBox(slots[i]), {
        ...fromBox(slot),
        ease: "power1.inOut",
        immediateRender: false,
        scrollTrigger: { trigger: slot, start: "top bottom", end: "center center", scrub: 0.8, invalidateOnRefresh: true },
      }).scrollTrigger
    );

    const onRefresh = () => { if (triggers[0]?.progress === 0) placeAtStart(); };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    gsap.from(".traveler__inner", { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15, duration: 1.4, ease: "expo.out", delay: 0.3 });
    gsap.to(".traveler__media", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
    });

    return () => ScrollTrigger.removeEventListener("refresh", onRefresh);
  });

  return (
    <div ref={ref} className="traveler" aria-hidden="true">
      <div className="traveler__inner">
        <Media
          src={media.technician}
          alt="Técnico de ar-condicionado da Clima RD com o manifold de medição"
          className="traveler__media"
          loading="eager"
          fetchPriority="high"
          fallback={
            <div className="traveler__media traveler__ph">
              <img src={media.logo} alt="" width="96" height="96" />
              <span>tecnico.webp</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
