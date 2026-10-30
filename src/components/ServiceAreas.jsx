import React, { useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { gsap, useGSAP } from "../lib/gsap";
import useScrollFx from "../hooks/useScrollFx";

// Local-SEO section: real, crawlable text about where the studio works.
const AREAS = [
  {
    title: "Matara",
    tag: "Home Studio",
    text: "Wedding videography and photography in Matara and across the Southern Province - our home base.",
  },
  {
    title: "Colombo",
    tag: "Weddings & Events",
    text: "Cinematic wedding films, corporate events and brand shoots for couples and businesses in Colombo.",
  },
  {
    title: "Island-wide",
    tag: "All of Sri Lanka",
    text: "From the southern coast to the hill country, our team travels anywhere in Sri Lanka for your celebration.",
  },
  {
    title: "Destination Weddings",
    tag: "Couples from Overseas",
    text: "Planning your wedding in Sri Lanka from abroad? We have filmed for couples travelling from as far as Australia.",
  },
];

export default function ServiceAreas() {
  const scope = useRef(null);
  const bigText = useRef(null);
  useScrollFx(scope);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          bigText.current,
          { xPercent: 10 },
          {
            xPercent: -30,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-labelledby="areas-title"
      className="relative overflow-hidden px-6 py-16 md:py-24"
    >
      {/* giant drifting backdrop word */}
      <div
        ref={bigText}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap font-belleza text-[22vw] leading-none text-white/[0.035] md:top-2"
      >
        Sri Lanka
      </div>

      <div className="relative mx-auto max-w-[1600px]">
        <p data-fx="up" className="mb-3 font-roboto text-xs uppercase tracking-[0.3em] text-white/60">
          Where We Film
        </p>
        <h2
          id="areas-title"
          data-fx="words"
          className="mb-6 max-w-4xl font-belleza text-3xl leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          Wedding Videography in Matara, Colombo &amp; Across Sri Lanka
        </h2>
        <p data-fx="up" className="mb-12 max-w-3xl font-roboto text-sm leading-relaxed text-gray-300">
          Studio VisualFX is a Matara-based wedding videographer and photographer led by director
          Sasanka Dulanjana. We film weddings, pre-wedding shoots, events, music videos and
          commercials for clients in Matara, Colombo and all over the island - capturing traditional
          Poruwa ceremonies, intimate celebrations and large-scale productions with the same cinematic care.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area) => (
            <article
              key={area.title}
              data-fx="card3d"
              data-tilt="8"
              className="group relative overflow-hidden rounded-[16px] border border-white/15 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/50 hover:bg-white/[0.07]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                  <FaMapMarkerAlt className="text-sm" />
                </span>
                <span className="font-roboto text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {area.tag}
                </span>
              </div>
              <h3 className="mb-2 font-belleza text-2xl text-white">{area.title}</h3>
              <p className="font-roboto text-xs leading-relaxed text-gray-300">{area.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
