import { gsap, ScrollTrigger, SplitText, useGSAP, EASE } from "../lib/gsap";

/*
  Declarative scroll animations. Add a data attribute in JSX, the hook does the rest.

  data-fx="words"       heading - words rise out of a mask
  data-fx="words3d"     heading - words flip up in 3D, one after another
  data-fx="read"        paragraph - words light up as you scroll (scrubbed)
  data-fx="up"          fade + rise (batched + staggered)
  data-fx="card3d"      3D flip-up from below (batched + staggered)
  data-fx="card-side"   3D swing-in from the right (horizontal sliders)
  data-fx="reveal-x"    wipes in from the left (clip-path, batched)
  data-fx="zoom"        scales up out of depth (batched)
  data-fx="clip"        cinematic frame opening (scrubbed clip-path)
  data-fx="parallax"    image drifts inside its frame (data-speed="10")
  data-fx="line"        horizontal line draws in
  data-fx="line-y"      vertical line draws in
  data-fx="count"       "150+" counts up from 0
  data-tilt="8"         3D tilt that follows the mouse (desktop only)

  Pass `dependencies` when the list of elements can change (e.g. search
  results) - new elements are animated, already-animated ones are skipped.
  Everything is skipped for users with prefers-reduced-motion.
  Nested scopes are safe: an element is only ever animated by one hook.
*/
const seen = new WeakSet();

export default function useScrollFx(scope, dependencies = []) {

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const local = [];
        const cleanups = [];
        const pick = (sel) =>
          gsap.utils.toArray(root.querySelectorAll(sel)).filter((el) => {
            if (seen.has(el)) return false;
            seen.add(el);
            local.push(el);
            return true;
          });

        // ---- Headings: masked word reveal
        pick('[data-fx="words"]').forEach((el) => {
          const split = SplitText.create(el, { type: "words", mask: "words" });
          split.masks?.forEach((m) => {
            m.style.paddingBottom = "0.14em";
            m.style.marginBottom = "-0.14em";
          });
          gsap.from(split.words, {
            yPercent: 120,
            rotate: 3,
            duration: 1.4,
            ease: EASE,
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // ---- Headings: 3D word flip (rotateX from below, like cards turning over)
        pick('[data-fx="words3d"]').forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.set(el, { perspective: 900 });
          gsap.from(split.words, {
            rotationX: -100,
            yPercent: 60,
            z: -120,
            opacity: 0,
            transformOrigin: "50% 100% -40px",
            duration: 1.5,
            ease: EASE,
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // ---- Paragraph: words light up while scrolling
        pick('[data-fx="read"]').forEach((el) => {
          // aria "none": a <p> may not carry aria-label; the text stays readable as-is
          const split = SplitText.create(el, { type: "words", aria: "none" });
          gsap.fromTo(
            split.words,
            { opacity: 0.15 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 60%", scrub: 0.6 },
            }
          );
        });

        // ---- Batched groups
        const batch = (els, from, to, start = "top 90%") => {
          if (!els.length) return;
          gsap.set(els, from);
          ScrollTrigger.batch(els, {
            start,
            once: true,
            onEnter: (b) => gsap.to(b, { ...to, stagger: 0.12 }),
          });
        };

        batch(
          pick('[data-fx="up"]'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: EASE }
        );

        batch(
          pick('[data-fx="card3d"]'),
          { opacity: 0, y: 110, rotationX: 24, scale: 0.94, transformPerspective: 1200, transformOrigin: "50% 0%" },
          { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.6, ease: EASE },
          "top 94%"
        );

        batch(
          pick('[data-fx="card-side"]'),
          { opacity: 0, x: 140, rotationY: -32, transformPerspective: 1200, transformOrigin: "0% 50%" },
          { opacity: 1, x: 0, rotationY: 0, duration: 1.6, ease: EASE },
          "top 92%"
        );

        batch(
          pick('[data-fx="reveal-x"]'),
          { clipPath: "inset(0% 100% 0% 0%)", x: -40, opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: 1, duration: 1.3, ease: "power4.out" },
          "top 92%"
        );

        batch(
          pick('[data-fx="zoom"]'),
          { opacity: 0, scale: 0.86, z: -200, transformPerspective: 1200 },
          { opacity: 1, scale: 1, z: 0, duration: 1.6, ease: EASE },
          "top 92%"
        );

        // ---- Cinematic frame opening
        pick('[data-fx="clip"]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(14% 10% 14% 10% round 32px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "top 40%", scrub: 0.8 },
            }
          );
        });

        // ---- Parallax image inside an overflow-hidden frame
        pick('[data-fx="parallax"]').forEach((el) => {
          const s = parseFloat(el.dataset.speed || "8");
          gsap.set(el, { scale: 1 + (s * 2.4) / 100 });
          gsap.fromTo(
            el,
            { yPercent: -s },
            {
              yPercent: s,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // ---- Lines
        pick('[data-fx="line"]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "0% 50%",
            duration: 1.8,
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });
        pick('[data-fx="line-y"]').forEach((el) => {
          gsap.from(el, {
            scaleY: 0,
            transformOrigin: "50% 0%",
            duration: 1.6,
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        // ---- Count up ("150+" -> 0..150 + "+")
        pick('[data-fx="count"]').forEach((el) => {
          const original = el.textContent;
          const m = original.match(/^(\d+)(.*)$/);
          if (!m) return;
          const target = parseInt(m[1], 10);
          const suffix = m[2];
          const obj = { v: 0 };
          el.textContent = `0${suffix}`;
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => (el.textContent = `${Math.round(obj.v)}${suffix}`),
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
          cleanups.push(() => (el.textContent = original));
        });

        // ---- Mouse-follow 3D tilt (real pointer devices only)
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          pick("[data-tilt]").forEach((el) => {
            const strength = parseFloat(el.dataset.tilt || "8");
            gsap.set(el, { transformPerspective: 900 });
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3" });
            const move = (e) => {
              const r = el.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width;
              const py = (e.clientY - r.top) / r.height;
              ry((px - 0.5) * strength);
              rx(-(py - 0.5) * strength);
              // for an optional .tilt-glare layer inside the card
              el.style.setProperty("--mx", `${px * 100}%`);
              el.style.setProperty("--my", `${py * 100}%`);
            };
            const leave = () => {
              rx(0);
              ry(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });
        }

        return () => {
          cleanups.forEach((fn) => fn());
          local.forEach((el) => seen.delete(el));
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies }
  );
}
