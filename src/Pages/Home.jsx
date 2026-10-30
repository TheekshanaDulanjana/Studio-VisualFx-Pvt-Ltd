import React, { useState, useEffect, useRef, useSyncExternalStore, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import HeroLVideo from "../assets/HeroLVideo.MP4";
import HeroLFallback from "../assets/optimized/HeroLFallback.webp";
import HeroPVideo from "../assets/HeroPVideo.MP4";
import HeroPFallback from "../assets/optimized/HeroPFallback.webp";

import { gsap, SplitText, useGSAP, EASE } from "../lib/gsap";
import ServiceMarquee from "../components/ServiceMarquee";
import { scrollToSection, scrollToSectionWhenReady } from "../lib/scroll";
import { onEntered } from "../lib/entrance";
import LandingAbout from "../components/LandingAbout";
import ProductionCategories from "../components/ProductionCategories";
import StatsBand from "../components/StatsBand";
import FeaturedFilms from "../components/FeaturedFilms";
import Process from "../components/Process";
import ServiceAreas from "../components/ServiceAreas";

// Render only the hero variant that matches the viewport so the other
// (large) video is never downloaded.
const useMediaQuery = (query) => {
  const subscribe = useCallback(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // which video file has finished loading (resets automatically when the breakpoint swaps it)
  const [loadedVideo, setLoadedVideo] = useState(null);

  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const mediaInnerRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const heroVideo = isDesktop ? HeroLVideo : HeroPVideo;
  const heroFallback = isDesktop ? HeroLFallback : HeroPFallback;

  const videoLoaded = loadedVideo === heroVideo;

  // /#faq, /#contact … (from other pages or shared links)
  useEffect(() => {
    if (!location.hash) return;
    return scrollToSectionWhenReady(location.hash.replace("#", ""));
  }, [location.hash, location.key]);

  const scrollToContact = () => {
    if (!scrollToSection("contact")) navigate("/#contact");
  };

  // Hero: cinematic intro + 3D "screen pull-back" while scrolling
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (ctx) => {
          const { motion: canAnimate, desktop } = ctx.conditions;
          if (!canAnimate) return;

          const split = SplitText.create(titleRef.current, { type: "words,chars", mask: "words" });
          split.masks?.forEach((m) => {
            m.style.paddingBottom = "0.12em";
            m.style.marginBottom = "-0.12em";
          });

          // intro is held until the visitor taps "Entrance" on the welcome screen
          const intro = gsap
            .timeline({ defaults: { ease: EASE }, paused: true })
            .from(mediaInnerRef.current, { scale: 1.25, duration: 2.8 }, 0)
            .from(split.chars, { yPercent: 120, duration: 1.4, stagger: 0.025 }, 0.3)
            // y only (no opacity) so the text paints immediately - keeps LCP fast
            .from("[data-hero='fade']", { y: 30, duration: 1.1, stagger: 0.12 }, 0.2)
            .from(hintRef.current, { opacity: 0, duration: 1.2 }, 1.4);
          const stopWaiting = onEntered(() => intro.play());

          if (desktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: "top top",
                  end: "+=85%",
                  scrub: 1,
                  pin: true,
                  refreshPriority: 10, // first pin on the page - measure it before the rest
                },
              })
              .to(
                mediaRef.current,
                {
                  scale: 0.82,
                  rotationX: 14,
                  borderRadius: 28,
                  transformPerspective: 1600,
                  transformOrigin: "50% 100%",
                  ease: "none",
                },
                0
              )
              .to(contentRef.current, { yPercent: -45, opacity: 0, ease: "none" }, 0)
              .to(hintRef.current, { opacity: 0, ease: "none", duration: 0.2 }, 0);
          } else {
            gsap.to(mediaInnerRef.current, {
              yPercent: 18,
              ease: "none",
              scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
            });
            gsap.to(contentRef.current, {
              y: -60,
              opacity: 0,
              ease: "none",
              scrollTrigger: { trigger: heroRef.current, start: "top top", end: "70% top", scrub: true },
            });
          }

          return () => stopWaiting();
        }
      );
      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    // overflow-x-clip (not hidden) so sticky columns inside still work
    <div className="overflow-x-clip">
      <section
        ref={heroRef}
        className="
          relative isolate
          flex min-h-screen w-screen
          items-end justify-start
          overflow-hidden
          px-6 pb-20
          md:px-16
        "
      >
        {/* Media frame - scaled / tilted in 3D on scroll */}
        <div
          ref={mediaRef}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
        <div ref={mediaInnerRef} className="absolute inset-0 will-change-transform">
        {/* Fallback image (decorative background -> empty alt) */}
        <motion.img
          key={heroFallback}
          src={heroFallback}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 1 }}
        />

        {/* Hero video */}
        <motion.video
          key={heroVideo}
          src={heroVideo}
          poster={heroFallback}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          onCanPlayThrough={() => setLoadedVideo(heroVideo)}
          onLoadedData={() => setLoadedVideo(heroVideo)}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />

        </div>

        {/* Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-20 flex w-full max-w-3xl flex-col items-start text-left"
        >
          <p
            data-hero="fade"
            className="mb-4 flex items-center gap-3 font-roboto text-[10px] uppercase tracking-[0.3em] text-white/80 sm:text-xs"
          >
            <span aria-hidden="true" className="h-px w-8 bg-white/70" />
            Wedding Videographer · Sri Lanka
          </p>
          <h1
            ref={titleRef}
            className="font-belleza text-3xl leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Studio VisualFX (Pvt) Ltd.
          </h1>

          <p data-hero="fade" className="mt-4 max-w-2xl font-roboto text-base font-light text-white/90">
            Studio VisualFX is a Matara-based video production studio creating
            cinematic wedding films, event coverage, music videos and commercial
            productions for clients across Sri Lanka. With a passion for
            storytelling, we bring your vision to life.
          </p>

          {/* Buttons */}
          <div data-hero="fade" className="relative z-[999] mt-8 flex flex-nowrap gap-2 sm:gap-4">
            {/* Real link (crawlable) instead of a button + navigate() */}
            <Link
              to="/film-gallery"
              className="
                relative z-[999]
                inline-flex items-center justify-center
                touch-manipulation min-h-[48px] cursor-pointer whitespace-nowrap
                rounded-full bg-white px-4 py-3
                text-xs font-semibold text-black
                transition duration-300
                hover:bg-black hover:text-white
                sm:px-8 sm:text-sm
              "
            >
              View Portfolio
            </Link>

            <button
              type="button"
              onClick={scrollToContact}
              className="
                relative z-[999]
                touch-manipulation min-h-[48px] cursor-pointer whitespace-nowrap
                rounded-full border border-white px-4 py-3
                text-xs font-semibold text-white
                transition duration-300
                hover:bg-white hover:text-black
                sm:px-8 sm:text-sm
              "
            >
              Book Your Session
            </button>
          </div>
        </div>

        {/* Scroll hint (decorative) */}
        <div
          ref={hintRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 right-6 z-20 hidden flex-col items-center gap-3 md:right-16 md:flex"
        >
          <span className="font-roboto text-[10px] uppercase tracking-[0.35em] text-white/70 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative h-14 w-px overflow-hidden bg-white/20">
            <span className="animate-scroll-hint absolute inset-0 bg-white" />
          </span>
        </div>
      </section>

      <ServiceMarquee />
      <LandingAbout />
      <StatsBand />
      <ProductionCategories />
      <FeaturedFilms />
      <Process />
      <ServiceAreas />
    </div>
  );
};

export default Home;