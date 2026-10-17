import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// No celular a barra de endereço muda a altura da tela ao rolar:
// ignorar esse resize evita "pulos" nas animações
ScrollTrigger.config({ ignoreMobileResize: true });

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;

export { gsap, ScrollTrigger, useGSAP };
