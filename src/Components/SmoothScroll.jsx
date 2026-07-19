import { useEffect } from 'react';
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    let destroyed = false;

    function raf(time) {
      if (destroyed) return; // stop the loop once destroyed
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Remeasure whenever the page content resizes (route changes swap in
    // content of a different height, and Lenis needs to know that or it
    // clamps scrollTo(0) against the OLD page's dimensions)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      destroyed = true;
      resizeObserver.disconnect();
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;