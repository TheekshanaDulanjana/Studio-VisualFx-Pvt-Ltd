import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import HeroLVideo from "../assets/HeroLVideo.MP4";
import HeroLFallback from "../assets/HeroLFallback.jpg";
import HeroPVideo from "../assets/HeroPVideo.MP4";
import HeroPFallback from "../assets/HeroPFallback.jpg.jpg";

import LandingAbout from "../components/LandingAbout";
import ProductionCategories from "../components/ProductionCategories";

// Render only the hero variant that matches the viewport so the other
// (large) video is never downloaded.
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [videoLoaded, setVideoLoaded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const heroVideo = isDesktop ? HeroLVideo : HeroPVideo;
  const heroFallback = isDesktop ? HeroLFallback : HeroPFallback;

  // reset the fade when the breakpoint swaps the video
  useEffect(() => {
    setVideoLoaded(false);
  }, [heroVideo]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/#contact");
    }
  };

  return (
    <div className="overflow-x-hidden">
      <section
        className="
          relative isolate
          flex min-h-screen w-screen
          items-end justify-start
          overflow-hidden
          px-6 pb-20
          md:px-16
        "
      >
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
          onCanPlayThrough={() => setVideoLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <motion.div
          className="relative z-20 flex w-full max-w-3xl flex-col items-start text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 className="font-belleza text-3xl leading-tight text-white sm:text-5xl md:text-6xl">
            Studio VisualFX (Pvt) Ltd.
          </motion.h1>

          <motion.p className="mt-4 max-w-2xl font-roboto text-base font-light text-white/90">
            Studio VisualFX is a Matara-based video production studio creating
            cinematic wedding films, event coverage, music videos and commercial
            productions for clients across Sri Lanka. With a passion for
            storytelling, we bring your vision to life.
          </motion.p>

          {/* Buttons */}
          <div className="relative z-[999] mt-8 flex flex-nowrap gap-2 sm:gap-4">
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
        </motion.div>
      </section>

      <LandingAbout />
      <ProductionCategories />
    </div>
  );
};

export default Home;