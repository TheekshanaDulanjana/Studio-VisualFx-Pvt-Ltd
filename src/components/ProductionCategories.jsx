import React, { useRef } from "react";
import wedding from "../assets/optimized/wedding.webp";
import event from "../assets/optimized/event.webp";
import commercial from "../assets/optimized/commercial.webp";
import music from "../assets/optimized/music.webp";
import { gsap, useGSAP } from "../lib/gsap";
import useScrollFx from "../hooks/useScrollFx";

const CATEGORIES = [
  {
    img: wedding,
    title: "Creative Wedding Films",
    desc: "We turn your special day into a cinematic love story. Every emotion, smile, and moment is beautifully captured and crafted into a timeless wedding film you’ll cherish forever.",
  },
  {
    img: event,
    title: "Event Coverage",
    desc: "We professionally capture every moment of your events from corporate functions to special celebrations, ensuring every highlight is preserved with clarity and creativity.",
  },
  {
    img: commercial,
    title: "Commercial Productions",
    desc: "We create impactful visual content that elevates your brand. From advertisements to promotional videos, our productions are designed to attract, engage, and convert your audience.",
  },
  {
    img: music,
    title: "Music Videos",
    desc: "From concept to final cut, we bring your music to life with visually stunning storytelling. Our creative direction ensures your sound is matched with powerful, engaging visuals",
  },
];

// Services as a 3D card stack: each card sticks, and as the next one slides
// over it, it tips back into depth and dims.
export default function ProductionCategories() {
  const scope = useRef(null);
  const stack = useRef(null);
  useScrollFx(scope);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(".stack-card", stack.current);
        cards.forEach((card, i) => {
          const inner = card.querySelector(".stack-inner");

          // entering: rises out of depth
          gsap.fromTo(
            inner,
            { rotationX: 18, scale: 0.92, transformPerspective: 1600, transformOrigin: "50% 100%" },
            {
              rotationX: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "top 30%", scrub: true },
            }
          );

          // covered by the next card: tips back + dims
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(inner, {
            rotationX: -14,
            scale: 0.88,
            yPercent: -4,
            filter: "brightness(0.35)",
            transformOrigin: "50% 0%",
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 15%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} className="text-white py-16 md:py-24 px-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span data-fx="line" className="h-px w-12 sm:w-20 bg-white" />
              <p data-fx="up" className="font-roboto text-xs sm:text-sm uppercase tracking-[0.3em]">
                What We Do
              </p>
            </div>
            <h2
              data-fx="words3d"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.08] font-belleza"
            >
              Bringing Your Moments to Life Through Cinematic Vision
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p
              data-fx="up"
              className="text-gray-300 font-roboto text-sm text-justify leading-relaxed"
            >
              At Studio VisualFX (Pvt) Ltd., we offer a range of
              creative visual production services designed to capture,
              create, and elevate your story. With a perfect blend of
              innovation, technology, and artistic vision, we deliver
              high-quality productions tailored to every unique moment
              and purpose.
            </p>
          </div>
        </div>

        {/* 3D sticky stack */}
        <div ref={stack} className="relative">
          {CATEGORIES.map((item, index) => (
            <div
              key={item.title}
              className="stack-card sticky mb-8 last:mb-0 md:mb-12"
              style={{ top: `calc(14vh + ${index * 18}px)` }}
            >
              <div
                className="stack-inner group relative h-[62vh] min-h-[380px] max-h-[640px] overflow-hidden rounded-[22px] outline outline-white/20 bg-zinc-950 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] will-change-transform"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    data-fx="parallax"
                    data-speed="8"
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-[scale] duration-1000 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Sheen */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent" />

                {/* Index */}
                <div className="absolute top-5 right-6 md:top-8 md:right-10 flex items-baseline gap-2 font-roboto text-white/60">
                  <span className="font-belleza text-5xl md:text-7xl text-white/90 leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs tracking-[0.3em]">/ 04</span>
                </div>

                {/* Copy */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-12 max-w-2xl">
                  <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 font-roboto text-[10px] uppercase tracking-[0.3em] backdrop-blur-md">
                    Service
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-belleza transition-transform duration-700 group-hover:-translate-y-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 font-roboto leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
