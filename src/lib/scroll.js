import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

let lenis = null;
const NAV_OFFSET = -72;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollTo(href) {
  const target = href.length > 1 ? document.querySelector(href) : document.body;
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.4 });
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET, behavior: "smooth" });
}

export const onAnchorClick = (e) => {
  const href = e.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;
  e.preventDefault();
  scrollTo(href);
};
