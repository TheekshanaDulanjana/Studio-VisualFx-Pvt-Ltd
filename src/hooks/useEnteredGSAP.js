import { useGSAP } from "../lib/gsap";
import { hasEntered, onEntered } from "../lib/entrance";

// Same as useGSAP, but the animation setup waits until the visitor has passed
// the welcome screen. Nothing is visible behind the welcome screen anyway, so
// deferring all the SplitText / ScrollTrigger work keeps the first load light
// and fast (better Core Web Vitals / PageSpeed).
export default function useEnteredGSAP(setup, config) {
  useGSAP((context, contextSafe) => {
    if (hasEntered()) return setup(context, contextSafe);

    let cleanup;
    const run = contextSafe(() => {
      cleanup = setup(context, contextSafe);
    });
    const off = onEntered(run);
    return () => {
      off();
      if (typeof cleanup === "function") cleanup();
    };
  }, config);
}
