import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { media } from "../data";
import Media from "./Media";

// Galeria com scroll lateral (seção trava e os vídeos passam na horizontal)
export default function Gallery() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const horizontal = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
      },
    });

    gsap.utils.toArray(".shot").forEach((shot) =>
      gsap.fromTo(shot, { rotate: 4, y: 40 }, {
        rotate: -2, y: -20, ease: "none",
        scrollTrigger: { trigger: shot, containerAnimation: horizontal, start: "left right", end: "right left", scrub: true },
      })
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="gallery dark" id="trabalhos">
      <div className="gallery__head">
        <div>
          <span className="eyebrow">Na prática</span>
          <h2 className="h2">Serviço real, <em>do jeito certo.</em></h2>
        </div>
        <div className="progress-line"><span ref={barRef} /></div>
      </div>

      <div ref={trackRef} className="gallery__track">
        {media.gallery.map((item, i) => (
          <figure className="shot" key={item.src}>
            <div className="shot__frame">
              <Media
                type={item.type}
                src={item.src}
                poster={item.poster}
                alt={item.caption}
                className="shot__media"
                autoPlayInView={item.type === "video"}
              />
              <span className="shot__index">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
        <div className="gallery__end" aria-hidden="true" />
      </div>
    </section>
  );
}
