import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroLVideo from "../assets/HeroLVideo.MP4";
import HeroLFallback from "../assets/HeroLFallback.jpg";
import HeroPVideo from "../assets/HeroPVideo.MP4"; // Portrait Video
import HeroPFallback from "../assets/HeroPFallback.jpg.jpg"; // Portrait Image
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
    <div className="overflow-x-hidden ">
      <section className=" relative flex w-screen min-h-screen items-center justify-center px-6">

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

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 w-full max-w-3xl flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-belleza  text-white leading-tight mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Studio VisualFX (Pvt) Ltd.
          </motion.h1>

          <motion.p
            className="text-white font-roboto  text-sm sm:text-base md:text-lg mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Studio VisualFX is dedicated to producing high-end cinematic visuals that elevate every moment. With a passion for storytelling and attention to detail, we bring your vision to life in the most elegant and impactful way.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <button
              onClick={() => navigate("/film-gallery")}
              className="w-40 h-10 bg-white text-sm text-black font-roboto rounded-full hover:bg-black cursor-pointer hover:text-white transition"
            >
              View Portfolio
            </button>

            <button
              onClick={scrollToContact}
              className="w-40 h-10 border border-white text-sm text-white font-roboto rounded-full hover:bg-white cursor-pointer hover:text-black transition"
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