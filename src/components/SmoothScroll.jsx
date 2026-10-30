import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

// Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger and Lenis
// stay perfectly in sync (no double requestAnimationFrame loops, no jitter
// on pinned / scrubbed sections).
//
// `syncTouch` stays false: Lenis only smooths wheel input and leaves native
// touch scrolling/momentum alone on mobile.
const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      infinite: false,
      autoRaf: false,
    });

    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Route changes / lazy images change the page height. Lenis and
    // ScrollTrigger both need to re-measure or triggers fire at the wrong spot.
    let t;
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      clearTimeout(t);
      t = setTimeout(() => {
        // child components create their triggers before parents (React
        // effect order) - re-sort by page position before refreshing pins
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 200);
    });
    resizeObserver.observe(document.body);

    return () => {
      clearTimeout(t);
      resizeObserver.disconnect();
      gsap.ticker.remove(tick);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
