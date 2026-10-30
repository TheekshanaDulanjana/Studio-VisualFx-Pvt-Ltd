import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import useScrollFx from "../hooks/useScrollFx";

export default function LandingAbout() {
  const navigate = useNavigate();
  const scope = useRef(null);
  const stage = useRef(null);
  const ghost = useRef(null);
  useScrollFx(scope);

  const handleExploreClick = () => {
    navigate("/about");
  };

  // Video data
  const videos = [
    { id: "v2BLa9HXxeA", couple: "Nimmi & Brinoj", thumbnail: "https://img.youtube.com/vi/v2BLa9HXxeA/maxresdefault.jpg" },
    { id: "kkNuwRHeYR4", couple: "Raveesha & Sahan", thumbnail: "https://img.youtube.com/vi/kkNuwRHeYR4/hqdefault.jpg" },
    { id: "KaQCh7E6mg8", couple: "Jules & Cheshan", thumbnail: "https://img.youtube.com/vi/KaQCh7E6mg8/maxresdefault.jpg" },
  ];

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  // 3D "fan" of film cards that folds flat as you scroll into it
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 768px)",
        },
        (ctx) => {
          if (!ctx.conditions.motion) return;
          const cards = gsap.utils.toArray(".fan-card", stage.current);

          if (ctx.conditions.wide) {
            const from = [
              { rotationY: 38, rotationX: 8, x: 120, z: -260, opacity: 0.2 },
              { rotationX: 32, y: 120, z: -180, opacity: 0.2 },
              { rotationY: -38, rotationX: 8, x: -120, z: -260, opacity: 0.2 },
            ];
            cards.forEach((card, i) => {
              gsap.fromTo(
                card,
                from[i],
                {
                  rotationY: 0,
                  rotationX: 0,
                  x: 0,
                  y: 0,
                  z: 0,
                  opacity: 1,
                  ease: "power2.out",
                  scrollTrigger: { trigger: stage.current, start: "top 95%", end: "top 40%", scrub: 1 },
                }
              );
            });
          } else {
            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { rotationX: 40, y: 80, z: -150, opacity: 0 },
                {
                  rotationX: 0,
                  y: 0,
                  z: 0,
                  opacity: 1,
                  ease: "power2.out",
                  scrollTrigger: { trigger: card, start: "top 98%", end: "top 60%", scrub: 1 },
                }
              );
            });
          }

          gsap.fromTo(
            ghost.current,
            { xPercent: 15 },
            {
              xPercent: -25,
              ease: "none",
              scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      );
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden py-16 md:py-28 px-6 sm:px-6 lg:px-8 font-[Alata]"
    >
      {/* drifting backdrop word */}
      <div
        ref={ghost}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-8 select-none whitespace-nowrap font-belleza text-[20vw] leading-none text-white/[0.03]"
      >
        Visual Stories
      </div>

      <div className="relative max-w-[1600px] mx-auto flex flex-col justify-center">
        {/* Header Section */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span data-fx="line" className="h-px w-12 sm:w-20 bg-white" />
            <p
              data-fx="up"
              className="text-white text-xs font-roboto sm:text-sm uppercase tracking-[0.3em]"
            >
              The eyes behind stories!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <h2
                data-fx="words3d"
                className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-belleza text-white max-w-3xl"
              >
                Crafting Timeless Visual Stories Through Passion, Vision, and{" "}
                <span className="italic text-white/60">Authentic Creativity!</span>
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end items-start">
              <div className="relative pl-6">
                <span data-fx="line-y" aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px bg-white/40" />
                <p
                  data-fx="read"
                  className="text-gray-200 font-roboto text-sm leading-relaxed text-justify"
                >
                  At Studio VisualFX (Pvt) Ltd, we are driven by a deep passion for storytelling through visuals.
                  Every project we take on is a blend of creativity, technical expertise, and attention to
                  detail ensuring each moment is captured with authenticity and purpose. From intimate
                  celebrations to large-scale productions, we transform ideas into compelling visual
                  experiences that leave a lasting impression.
                </p>
              </div>

              <div data-fx="up" className="mt-8 pl-6">
                <button
                  onClick={handleExploreClick}
                  className="group flex items-center gap-3 bg-white text-black pl-5 pr-1.5 py-1.5 rounded-full
                             hover:bg-black hover:text-white border border-transparent hover:border-white
                             transition-all duration-500 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <span className="font-roboto text-sm">Explore more</span>
                  <span className="flex items-center justify-center w-9 h-9 bg-black rounded-full group-hover:bg-white transition-colors duration-500">
                    <FaArrowRight className="text-white text-xs group-hover:text-black transition-all duration-500 group-hover:-rotate-45" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D film stage */}
        <div
          ref={stage}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 [perspective:1600px] [transform-style:preserve-3d]"
        >
          {videos.map((video, i) => (
            <div key={video.id} className={`fan-card will-change-transform ${i === 1 ? "md:-translate-y-6" : ""}`}>
              <div
                data-tilt="12"
                role="link"
                tabIndex={0}
                aria-label={`Watch ${video.couple} wedding film on YouTube`}
                onClick={() => openVideo(video.id)}
                onKeyDown={(e) => e.key === "Enter" && openVideo(video.id)}
                className="group relative aspect-video rounded-[18px] overflow-hidden bg-zinc-900 cursor-pointer
                           shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/15
                           transition-shadow duration-700 hover:ring-white/50 hover:shadow-[0_40px_80px_-20px_rgba(255,255,255,0.15)]"
              >
                <img
                  src={video.thumbnail}
                  alt={`${video.couple} wedding film by Studio VisualFX`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-[scale,filter] duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="tilt-glare" />

                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
                    <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white transition-colors duration-500 group-hover:border-l-black" />
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                  <div>
                    <p className="font-roboto text-[10px] uppercase tracking-[0.3em] text-white/60">Wedding Film</p>
                    <p className="font-belleza text-lg text-white sm:text-xl">{video.couple}</p>
                  </div>
                  <span className="font-roboto text-xs tracking-[0.3em] text-white/50">0{i + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
