import { useLayoutEffect } from "react";
import { ScrollTrigger, useGSAP } from "./lib/gsap";
import { initSmoothScroll } from "./lib/scroll";
import { BookingProvider } from "./lib/booking";

import Nav from "./components/Nav";
import Traveler from "./components/Traveler";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import About from "./components/About";
import TempDrop from "./components/TempDrop";
import Problems from "./components/Problems";
import Services from "./components/Services";
import Tech from "./components/Tech";
import BeforeAfter from "./components/BeforeAfter";
import Gallery from "./components/Gallery";
import HowItWorks from "./components/HowItWorks";
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
    <BookingProvider>
      <Nav />
      <Traveler />
      <main>
        <Hero />
        <Brands />
        <About />
        <TempDrop />
        <Problems />
        <Services />
        <Tech />
        <BeforeAfter />
        <Gallery />
        <HowItWorks />
        <Testimonials />
        <Booking />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </BookingProvider>
  );
}
