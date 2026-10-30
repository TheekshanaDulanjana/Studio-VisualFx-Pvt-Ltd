import React, { useRef } from 'react';
import useScrollFx from '../hooks/useScrollFx';
import sasanka from '../assets/optimized/sasanka.webp';
import { SiAdobepremierepro, SiDavinciresolve, SiAdobeaftereffects, SiAdobeaudition } from 'react-icons/si';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const ServiceSection = () => {
  const tools = [
    { name: 'Adobe Premiere Pro', icon: <SiAdobepremierepro className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: 'DaVinci Resolve', icon: <SiDavinciresolve className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: 'Adobe After Effects', icon: <SiAdobeaftereffects className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: 'Adobe Audition', icon: <SiAdobeaudition className="w-8 h-8 md:w-10 md:h-10" /> },
  ];

  const scope = useRef(null);
  useScrollFx(scope);

  return (
    <section
      ref={scope}
      className="text-white py-12 md:py-12 px-6 md:px-12 lg:px-6 overflow-hidden"
    >
      {/* Container to center and limit width */}
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Top Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 lg:mb-24">
          
          {/* Left Side: Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left order-2 lg:order-1 w-full">
            <h2 data-fx="words" className="text-4xl sm:text-5xl md:text-6xl font-belleza leading-tight">
              Visionary Director And <br className="hidden sm:block" /> Creative Storyteller
            </h2>
            <p data-fx="up" className="text-white font-roboto leading-relaxed max-w-full lg:max-w-xl mx-auto lg:mx-0 text-sm md:text-sm text-justify lg:text-justify">
              Mr. Sasanka Dulanjana is the driving creative force behind Studio VisualFX (Pvt) Ltd., 
              bringing over 10 years of experience in visual storytelling to every project. With 
              a keen eye for detail and a passion for cinematic excellence, he transforms ideas 
              into compelling visual narratives that captivate and inspire.
              <br /><br />
              As a director and storyteller, Sasanka combines innovation, artistry, and
              technical expertise to craft experiences that are authentic, emotive, and visually 
              stunning. His work spans weddings, music videos, events, and commercial productions,
              each reflecting his commitment to quality and creativity.
              <br /><br />
              Guided by a vision to bring stories to life, Sasanka ensures that every frame
              captures emotion, beauty, and meaning, creating timeless cinematic journeys that 
              resonate with audiences and leave a lasting impression.
            </p>
            <div data-fx="up" className="pt-4 flex items-center justify-center lg:justify-start gap-2">
              <p className="text-sm font-roboto m-0">Let's Connect!</p>

              {/* WhatsApp */}
              <a
                href="https://wa.me/94719896981"
                aria-label="WhatsApp Sasanka Dulanjana" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:-translate-y-0.5 hover:scale-120 text-lg"
              >
                <FaWhatsapp />
              </a>

              {/* Facebook */}
              <a
                href="https://web.facebook.com/sasankadula0"
                aria-label="Sasanka Dulanjana on Facebook" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:scale-120 text-lg"
              >
                <FaFacebookF />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sasankadulanjana_/"
                aria-label="Sasanka Dulanjana on Instagram" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-pink-500 transition-all duration-300 hover:-translate-y-0.5 hover:scale-120 text-lg"
              >
                <FaInstagram />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sasanka-dulanjana/"
                aria-label="Sasanka Dulanjana on LinkedIn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:scale-120 text-lg"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1 order-1 lg:order-2 w-full">
            <div
              data-fx="clip"
              className="relative group cursor-pointer overflow-hidden rounded-[16px] pt-8 sm:pt-12"
            >
              <img
                src={sasanka}
                loading="lazy"
                decoding="async"
                alt="Sasanka Dulanjana, wedding videographer and director at Studio VisualFX"
                className="relative block w-full h-auto object-cover origin-top transition-[scale] duration-700 ease-out group-hover:scale-102"
              />
            </div>
          </div>
        </div>

        {/* Bottom Icons Section */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 border-t border-gray-800 pt-12 items-center lg:items-start"
        >
          
          {/* Supporting List */}
          <div data-fx="up" className="col-span-2 md:col-span-1 text-center lg:text-left text-sm font-roboto space-y-1 text-white mb-4 md:mb-0">
            <p className="hover:text-white transition-colors cursor-default">Cinematic Storytelling</p>
            <p className="hover:text-white transition-colors cursor-default">Post-Production Mastery</p>
            <p className="hover:text-white transition-colors cursor-default">Audio & Visual Design</p>
          </div>

          {/* Dynamic Tools List */}
          {tools.map((tool, index) => (
            <div
              key={index}
              data-fx="card3d"
              className="flex flex-col items-center text-center space-y-4 group cursor-pointer"
            >
              <div className="text-gray-300 hover:text-white transform group-hover:scale-110 transition-all duration-500">
                {tool.icon}
              </div>
              <p className="font-roboto text-xs uppercase text-gray-300 group-hover:text-white transition-colors">
                {tool.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceSection;