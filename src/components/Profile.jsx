import React from 'react';
import { motion } from 'framer-motion';
import sasanka from '../assets/sasanka.png';
import { SiAdobepremierepro, SiDavinciresolve, SiAdobeaftereffects, SiAdobeaudition } from 'react-icons/si';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const ServiceSection = () => {
  const tools = [
    { name: 'Adobe Premiere Pro', icon: <SiAdobepremierepro className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: 'DaVinci Resolve', icon: <SiDavinciresolve className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: 'Adobe After Effects', icon: <SiAdobeaftereffects className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: 'Adobe Audition', icon: <SiAdobeaudition className="w-8 h-8 md:w-10 md:h-10" /> },
  ];

  // Ultra smooth and slow luxury easing curve
  const luxuryEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        ease: luxuryEase,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: luxuryEase,
      },
    },
  };

  const toolVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: luxuryEase,
      },
    },
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="text-white py-12 md:py-12 px-6 md:px-12 lg:px-6 overflow-hidden"
    >
      {/* Container to center and limit width */}
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Top Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 lg:mb-24">
          
          {/* Left Side: Text Content */}
          <motion.div variants={fadeInUp} className="flex-1 space-y-8 text-center lg:text-left order-2 lg:order-1 w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-belleza leading-tight">
              Visionary Director And <br className="hidden sm:block" /> Creative Storyteller
            </h1>
            <p className="text-white font-roboto leading-relaxed max-w-full lg:max-w-xl mx-auto lg:mx-0 text-sm md:text-sm text-justify lg:text-justify">
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
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2">
              <p className="text-sm font-roboto m-0">Let's Connect!</p>

              {/* WhatsApp */}
              <motion.a 
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.3, ease: luxuryEase }}
                href="https://wa.me/719896981" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-green-500 transition-colors text-lg"
              >
                <FaWhatsapp />
              </motion.a>

              {/* Facebook */}
              <motion.a 
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.3, ease: luxuryEase }}
                href="https://web.facebook.com/sasankadulanjana0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-blue-600 transition-colors text-lg"
              >
                <FaFacebookF />
              </motion.a>

              {/* Instagram */}
              <motion.a 
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.3, ease: luxuryEase }}
                href="https://www.instagram.com/sasankadulanjana_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-pink-500 transition-colors text-lg"
              >
                <FaInstagram />
              </motion.a>

              {/* LinkedIn */}
              <motion.a 
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.3, ease: luxuryEase }}
                href="https://www.linkedin.com/in/sasanka-dulanjana/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-blue-400 transition-colors text-lg"
              >
                <FaLinkedinIn />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div variants={imageVariants} className="flex-1 order-1 lg:order-2 w-full">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 transition duration-1000"></div>
              <motion.img 
                src={sasanka} 
                alt="Sasanka Dulanjana" 
                className="relative w-full h-auto object-cover rounded-[16px] shadow-2xl transition duration-700 ease-out group-hover:scale-102"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Icons Section */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 border-t border-gray-800 pt-12 items-center lg:items-start"
        >
          
          {/* Supporting List */}
          <motion.div variants={toolVariants} className="col-span-2 md:col-span-1 text-center lg:text-left text-sm font-roboto space-y-1 text-white mb-4 md:mb-0">
            <p className="hover:text-white transition-colors cursor-default">Cinematic Storytelling</p>
            <p className="hover:text-white transition-colors cursor-default">Post-Production Mastery</p>
            <p className="hover:text-white transition-colors cursor-default">Audio & Visual Design</p>
          </motion.div>

          {/* Dynamic Tools List */}
          {tools.map((tool, index) => (
            <motion.div 
              key={index} 
              variants={toolVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: luxuryEase }}
              className="flex flex-col items-center text-center space-y-4 group cursor-pointer"
            >
              <div className="text-gray-300 hover:text-white transform group-hover:scale-110 transition-all duration-500">
                {tool.icon}
              </div>
              <p className="font-roboto text-xs uppercase text-gray-300 group-hover:text-white transition-colors">
                {tool.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ServiceSection;