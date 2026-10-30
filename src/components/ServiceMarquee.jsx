import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

// Decorative, scroll-reactive ticker of the studio's services.
// Speeds up and skews with scroll velocity, flips direction with scroll direction.
const ITEMS = ["Creative Wedding Films", "Event Coverage", "Commercial Productions", "Music Videos"];

export default function ServiceMarquee() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let x = 0;
        let dir = 1;
        let boost = 0;
        let visible = false; // only animate while on screen (saves CPU/battery)
        const setX = gsap.quickSetter(track.current, "xPercent");
        const skew = gsap.quickTo(track.current, "skewX", { duration: 0.6, ease: "power3" });

        const tick = (_, dt) => {
          if (!visible) return;
          x -= (0.0022 * dir + boost) * dt;
          x = gsap.utils.wrap(-50, 0, x);
          setX(x);
          boost *= 0.9;
        };
        gsap.ticker.add(tick);

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (visible = self.isActive),
          onUpdate: (self) => {
            const v = self.getVelocity();
            dir = self.direction;
            boost = gsap.utils.clamp(-0.03, 0.03, v / 120000);
            skew(gsap.utils.clamp(-8, 8, v / -300));
          },
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });

        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: root }
  );

  const row = (k) => (
    <div key={k} className="flex shrink-0 items-center">
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center">
          <span className="font-belleza whitespace-nowrap cursor-default text-5xl text-white/20 transition-colors duration-500 hover:text-white sm:text-6xl md:text-8xl">
            {t}
          </span>
          <span className="mx-6 text-xl text-white/25 md:mx-12 md:text-3xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="relative select-none overflow-hidden border-y border-white/10 py-8 md:py-12"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-40" />
      <div ref={track} className="flex w-max will-change-transform">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
