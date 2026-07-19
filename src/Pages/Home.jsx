import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroLVideo from "../assets/HeroLVideo.MP4";
import HeroLFallback from "../assets/HeroLFallback.jpg";
import HeroPVideo from "../assets/HeroPVideo.MP4";
import HeroPFallback from "../assets/HeroPFallback.jpg.jpg";
import LandingAbout from "../Components/LandingAbout";
import ProductionCategories from "../Components/ProductionCategories";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex w-screen min-h-screen items-end justify-start px-6 pb-20 md:px-16">

        {/* Desktop Fallback Image */}
        <motion.img
          src={HeroLFallback}
          alt="Hero Fallback"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 1 }}
        />

        {/* Mobile/Tablet Fallback Image */}
        <motion.img
          src={HeroPFallback}
          alt="Hero Fallback Portrait"
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 1 }}
        />

        {/* Desktop Background Video */}
        <motion.video
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          src={HeroLVideo}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />

        {/* Mobile/Tablet Background Video */}
        <motion.video
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
          src={HeroPVideo}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />

        {/* Dot Pattern Noise Layer */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "3px 3px"
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 w-full max-w-3xl flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl font-belleza text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Studio VisualFX  (Pvt) Ltd.
          </motion.h1>

          <motion.p
            className="text-white/90 font-roboto font-light text-base  mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Studio VisualFX is dedicated to producing high-end cinematic visuals that elevate every moment. With a passion for storytelling, we bring your vision to life.
          </motion.p>

          <motion.div
            className="flex flex-nowrap gap-2 sm:gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <button
              onClick={() => navigate("/film-gallery")}
              className="px-4 sm:px-8 py-3 bg-white cursor-pointer hover:border hover:border-white text-xs sm:text-sm text-black font-semibold rounded-full hover:bg-black hover:text-white transition duration-300 whitespace-nowrap"
            >
              View Portfolio
            </button>

            <button
              onClick={scrollToContact}
              className="px-4 sm:px-8 py-3 border cursor-pointer hover:border hover:border-black border-white text-xs sm:text-sm text-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300 whitespace-nowrap"
            >
              Book Your Session
            </button>
          </motion.div>
        </motion.div>
      </section>

      <LandingAbout />
      <ProductionCategories />
    </div>
  );
};

export default Home;