import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { gsap, ScrollTrigger, useGSAP, EASE } from "../lib/gsap";
import useScrollFx from "../hooks/useScrollFx";
import { FILMS, getVideoId } from "../data/studio";

// Pinned horizontal film reel (desktop) / swipeable reel (mobile).
const FEATURED = FILMS.slice(0, 6);

export default function FeaturedFilms() {
  const section = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);
  useScrollFx(section);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current;
          const distance = () => el.scrollWidth - window.innerWidth;

          const tween = gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
            },
          });

          // each card swings in from depth as it travels across the screen
          gsap.utils.toArray(".film-card", el).forEach((card) => {
            gsap.fromTo(
              card,
              { rotationY: -28, scale: 0.88, opacity: 0.4, transformPerspective: 1400, transformOrigin: "0% 50%" },
              {
                rotationY: 0,
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tween,
                  start: "left 100%",
                  end: "left 45%",
                  scrub: true,
                },
              }
            );
            const img = card.querySelector("img");
            gsap.fromTo(
              img,
              { xPercent: -8, scale: 1.2 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          });

          return () => ScrollTrigger.refresh();
        }
      );

      // mobile / tablet: simple staggered entrance
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".film-card", {
          x: 80,
          opacity: 0,
          duration: 1.3,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: track.current, start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      aria-labelledby="featured-films-title"
      className="relative overflow-hidden py-14 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="mx-auto mb-8 flex w-full max-w-[1600px] flex-col gap-4 px-6 md:flex-row md:items-end md:justify-between lg:mb-10">
        <div>
          <p data-fx="up" className="mb-3 font-roboto text-xs uppercase tracking-[0.3em] text-white/60">
            Selected Work
          </p>
          <h2
            id="featured-films-title"
            data-fx="words"
            className="font-belleza text-3xl leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Featured Wedding Films
          </h2>
        </div>
        <div data-fx="up">
          <Link
            to="/film-gallery"
            className="group inline-flex items-center gap-3 rounded-full border border-white/40 px-5 py-2.5 font-roboto text-sm text-white transition-colors duration-500 hover:bg-white hover:text-black"
          >
            View all films
            <FaArrowRight className="text-xs transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        <div
          ref={track}
          className="flex w-max snap-x snap-mandatory gap-5 px-6 will-change-transform lg:snap-none lg:gap-8 lg:pl-[max(1.5rem,calc((100vw-1600px)/2+1.5rem))] lg:pr-[10vw]"
        >
          {FEATURED.map((film, i) => {
            const id = getVideoId(film.link);
            return (
              <a
                key={id}
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${film.coupleName} wedding film on YouTube`}
                className="film-card group relative block w-[82vw] shrink-0 snap-center sm:w-[60vw] lg:w-[44vw] xl:w-[38vw]"
              >
                <div className="relative aspect-video overflow-hidden rounded-[16px] bg-zinc-900 outline outline-white/15">
                  <img
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                    }}
                    alt={`${film.coupleName} wedding film by Studio VisualFX`}
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="720"
                    className="h-full w-full object-cover transition-[scale,filter] duration-1000 ease-out group-hover:scale-105 lg:grayscale-[35%] lg:group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
                      <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white transition-colors duration-500 group-hover:border-l-black" />
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-belleza text-xl text-white sm:text-2xl">{film.coupleName}</h3>
                  <span className="font-roboto text-xs tracking-[0.3em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </a>
            );
          })}

          {/* End card */}
          <Link
            to="/film-gallery"
            className="film-card group relative flex aspect-video w-[60vw] shrink-0 snap-center flex-col items-center justify-center gap-4 rounded-[16px] border border-dashed border-white/25 text-white transition-colors duration-500 hover:border-white hover:bg-white/5 sm:w-[40vw] lg:w-[26vw]"
          >
            <span className="font-belleza text-2xl sm:text-3xl">All Wedding Films</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-[-45deg]">
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>

      {/* progress (desktop) */}
      <div className="mx-auto mt-10 hidden w-full max-w-[1600px] px-6 lg:block">
        <div className="h-px w-full bg-white/15">
          <div ref={progress} className="h-px w-full origin-left scale-x-0 bg-white" />
        </div>
      </div>
    </section>
  );
}
