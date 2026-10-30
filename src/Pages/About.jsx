import React, { useEffect, useRef } from 'react';
import useScrollFx from '../hooks/useScrollFx';
import Profile from '../components/Profile';
import { scrollToTop } from '../lib/scroll';
import { STATS } from '../data/studio';

export default function About() {

  useEffect(() => {
    scrollToTop({ immediate: true });
  }, []);

  const scope = useRef(null);
  useScrollFx(scope);

  return (
    <div ref={scope} className="pt-24">
      
      {/* Hero Section */}
      <section
        className="py-4 md:py-16 px-6 md:px-12 lg:px-6"
      >
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="max-w-[1600px]">
            
            <h1
              data-fx="words"
              className="text-3xl text-white md:text-6xl leading-12 sm:leading-18 tracking-tight mb-6 font-belleza"
            >
              Crafting Timeless Visual Journeys Through Passion, Vision, and Cinematic Creativity
            </h1>

            <p
              data-fx="up"
              className="text-sm text-white text-justify leading-relaxed font-roboto"
            >
              With over 7 years of experience in visual storytelling, Studio VisualFX (Pvt) Ltd.
              has transformed countless moments into cinematic memories that inspire, engage, 
              and captivate. Having successfully completed 150+ projects, we pride ourselves 
              on blending creativity, innovation, and technical precision to deliver productions
              that are visually stunning and emotionally resonant.
              <br /><br />
              From intimate weddings to grand events, music videos, and commercial productions,
              every project is approached with professional standards to ensure perfection at 
              every step. Our dedicated team works closely with clients to understand their 
              vision, translating ideas into compelling visual narratives that leave a lasting
              impression. We bring your stories to life, capturing every moment with emotion,
              beauty, and authenticity.
              <br /><br />
              At Studio VisualFX, we create experiences that elevate every story into a timeless
              visual journey. Whether it is a personal celebration, a brand campaign, or a
              creative project, we bring your ideas to life with precision, artistry, and
              unmatched cinematic quality. Join us and let us create visual stories that
              inspire, move, and stay with you forever.
            </p>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-12 md:py-16 px-6 md:px-12 lg:px-6"
      >
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {STATS.map((stat, i) => (
              
              <div
                key={i}
                data-fx="up"
                className="relative pl-4 transition-transform duration-500 hover:translate-x-1.5"
              >
                <span data-fx="line-y" aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-white" />
                <div data-fx="count" className="text-3xl md:text-5xl font-belleza text-white tabular-nums">{stat.value}</div>
                <div className="text-[10px] tracking-widest text-white uppercase font-roboto">
                  {stat.label}
                </div>
              </div>

            ))}

          </div>
        </div>
      </section>

      <Profile />

    </div>
  );
}