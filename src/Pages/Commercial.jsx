import React from "react";
import FallbackImg from "../assets/HeroLFallback.jpg";

const Commercial = () => {
  return (
    <div className="overflow-x-hidden">
      <section className="relative flex items-center justify-center w-full min-h-screen">

        {/* Background Image */}
        <img
          src={FallbackImg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-6 md:px-8 lg:px-0 max-w-3xl flex flex-col items-start text-left text-white">
          <p className="text-xs sm:text-sm md:text-sm uppercase tracking-widest font-roboto">
            Commercial Projects
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-belleza leading-tight">
            Studio VisualFX (Pvt) Ltd.
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-base leading-relaxed">
            Stay tuned for our upcoming commercial projects that will showcase
            our expertise in crafting compelling <br className="hidden md:block" /> 
            visual narratives for brands and businesses. We are excited to share
            our creative journey with you as we bring stories to life through the
            art of filmmaking.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Commercial;