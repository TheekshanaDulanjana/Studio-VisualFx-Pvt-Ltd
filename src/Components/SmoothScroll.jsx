import { useEffect } from "react";
import Lenis from "lenis";

// NOTE ON THE CONFIG BELOW
// -------------------------
// `smooth: true`, `direction: 'vertical'`, and `gestureDirection: 'vertical'`
// are options from the old Lenis v0.x API. The version on npm today (v1.x)
// doesn't read them — they're silently ignored, so the instance you get at
// runtime isn't the one the config appears to describe. That mismatch is
// part of why behavior has felt inconsistent across devices/browsers.
//
// `syncTouch` is left at its default (false) intentionally: that makes
// Lenis only smooth wheel input and leaves native touch scrolling/momentum
// alone on mobile, which is what you want — see the Lenis maintainer's
// note that by default Lenis does not take over touch scrolling.
const Smoothscroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      infinite: false,
    });

    window.lenis = lenis;

    let destroyed = false;

    function raf(time) {
      if (destroyed) return;
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

export default Smoothscroll;