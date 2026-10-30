import { ScrollTrigger } from "./gsap";

// One place for programmatic scrolling. Goes through Lenis so smooth-scroll,
// pinned sections and ScrollTrigger never fight a native smooth scroll.

const lenis = () => (typeof window !== "undefined" ? window.lenis : null);

export function scrollToTop({ immediate = false } = {}) {
  const l = lenis();
  if (l) l.scrollTo(0, { immediate, force: true, duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

export function scrollToSection(id, { immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const l = lenis();
  if (l) l.scrollTo(el, { immediate, force: true, duration: 1.6 });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  return true;
}

// After a route change the target section may not exist yet and pinned
// sections still need measuring - wait for both, then scroll.
export function scrollToSectionWhenReady(id, { timeout = 4000 } = {}) {
  const start = performance.now();
  let raf;
  let settleTimer;
  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      settleTimer = setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        scrollToSection(id);
      }, 350);
      return;
    }
    if (performance.now() - start < timeout) raf = requestAnimationFrame(attempt);
  };
  attempt();
  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(settleTimer);
  };
}
