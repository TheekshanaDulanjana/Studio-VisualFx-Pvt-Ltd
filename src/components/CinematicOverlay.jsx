import React, { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

// Site-wide finishing layer: thin scroll-progress line + subtle film grain.
export default function CinematicOverlay() {
  const bar = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      }
    );
  });

  return (
    <>
      <div
        ref={bar}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-[2px] w-full origin-left bg-white/80"
      />
      <div aria-hidden="true" className="film-grain" />
    </>
  );
}
