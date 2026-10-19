import { useLayoutEffect } from "react";
import { ScrollTrigger, useGSAP } from "./lib/gsap";
import { initSmoothScroll } from "./lib/scroll";

import Nav from "./components/Nav";
import Traveler from "./components/Traveler";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import About from "./components/About";
import TempDrop from "./components/TempDrop";
import Tech from "./components/Tech";
import BeforeAfter from "./components/BeforeAfter";
// import Gallery from "./components/Gallery"; // desativada até chegarem as fotos (ver <Gallery /> abaixo)
import Testimonials from "./components/Testimonials";
import Booking from "./components/Booking";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import FloatingCta from "./components/FloatingCta";

export default function App() {
  useLayoutEffect(() => initSmoothScroll(), []);

  // Fontes e imagens mudam o layout: recalcula as posições das animações
  useGSAP(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  });

  return (
    <>
      <Nav />
      <Traveler />
      <main>
        <Hero />
        <Brands />
        <About />
        <TempDrop />
        <Tech />
        <BeforeAfter />
        {/* Galeria "Na prática": volta quando as fotos de media.gallery (data.js) estiverem em public/media/.
            Para reativar, descomente esta linha e o import lá em cima. */}
        {/* <Gallery /> */}
        <Testimonials />
        <Booking />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
