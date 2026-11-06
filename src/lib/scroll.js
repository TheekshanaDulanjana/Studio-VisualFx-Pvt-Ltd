import { ScrollTrigger } from "./gsap";

// One place for programmatic scrolling. Goes through Lenis so smooth-scroll,
// pinned sections and ScrollTrigger never fight a native smooth scroll.

const lenis = () => (typeof window !== "undefined" ? window.lenis : null);

export function scrollToTop({ immediate = false } = {}) {
  const l = lenis();
  if (l) l.scrollTo(0, { immediate, force: true, duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

export function scrollToSection(id, { immediate = false, settle = 2 } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const l = lenis();
  if (l) {
    l.scrollTo(el, {
      immediate,
      force: true,
      duration: 1.6,
      // late-loading images/fonts can move the section a little while we
      // travel - correct the final position if needed
      onComplete: () => {
        if (settle > 0 && Math.abs(el.getBoundingClientRect().top) > 8) {
          scrollToSection(id, { settle: settle - 1 });
        }
      },
    });
  } else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  return true;
}

// After a route change the target section may not exist yet and pinned
// sections still need measuring - wait for both, then scroll.
export function scrollToSectionWhenReady(id, { timeout = 8000 } = {}) {
  const start = performance.now();
  let raf;
  let settleTimer;
  const attempt = () => {
    const el = document.getElementById(id);
    // wait until the sections that render after load are all in place
    const pending = document.querySelector("[data-deferred-pending]");
    if (el && !pending) {
      settleTimer = setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        scrollToSection(id);
      }, 350);
      return;
    }
    if (performance.now() - start < timeout) raf = requestAnimationFrame(attempt);
    else if (el) scrollToSection(id);
  };
  attempt();
  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(settleTimer);
  };
}
