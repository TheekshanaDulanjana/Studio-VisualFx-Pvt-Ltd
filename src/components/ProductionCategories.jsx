import React from "react";
import { motion } from "framer-motion";
import wedding from "../assets/wedding.png";
import event from "../assets/event.png";
import commercial from "../assets/commercial.png";
import music from "../assets/music.png";

export default function ProductionCategories() {
  const otherCategories = [
    {
      img: event,
      title: "Event Coverage",
      desc: "We professionally capture every moment of your events from corporate functions to special celebrations, ensuring every highlight is preserved with clarity and creativity.",
    },
    {
      img: commercial,
      title: "Commercial Productions",
      desc: "We create impactful visual content that elevates your brand. From advertisements to promotional videos, our productions are designed to attract, engage, and convert your audience.",
    },
    {
      img: music,
      title: "Music Videos",
      desc: "From concept to final cut, we bring your music to life with visually stunning storytelling. Our creative direction ensures your sound is matched with powerful, engaging visuals",
    },
  ];

  // Combine all for the Tablet/Mobile grid view
  const allCategories = [
    {
      img: wedding,
      title: "Creative Wedding Films",
      desc: "We turn your special day into a cinematic love story. Every emotion, smile, and moment is beautifully captured and crafted into a timeless wedding film you’ll cherish forever.",
    },
    ...otherCategories,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.3,
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
      className=" text-white py-12 md:py-16 px-6"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: Text and Highlight Card (Laptop View) */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center font-[Alata]">
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 font-belleza text-center lg:text-left"
            >
              Bringing Your Moments to Life Through Cinematic Vision
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-gray-300 font-roboto max-w-2xl mx-auto lg:mx-0 text-sm text-center lg:text-justify sm:text-sm leading-relaxed"
            >
              At Studio VisualFX (Pvt) Ltd., we offer a range of
              creative visual production services designed to capture,
              create, and elevate your story. With a perfect blend of
              innovation, technology, and artistic vision, we deliver
              high-quality productions tailored to every unique moment
              and purpose.
            </motion.p>
          </div>

          {/* Wedding Highlight Card - Visible only on Laptop (lg+) */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            className="hidden lg:block relative rounded-[16px] overflow-hidden outline outline-white/30 shadow-2xl h-[350px] group cursor-pointer"
          >
            <motion.img
              src={wedding}
              alt="Creative Wedding Films"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
            />

            {/* Glowing Horizontal Sheen Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-2xl mb-2 font-belleza">Creative Wedding Films</h3>
              <p className="text-[12px] text-gray-200 font-roboto max-w-lg">
                We turn your special day into a cinematic love story. Every emotion, smile, and moment is beautifully captured and crafted into a timeless wedding film you’ll cherish forever.
              </p>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: The Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
        >
          {allCategories.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className={`relative rounded-[16px] overflow-hidden group h-64 sm:h-72 md:h-80 outline outline-white/30 lg:h-64 cursor-pointer 
                ${index === 0 ? "lg:hidden" : "block"}`}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
              />

              {/* Glowing Horizontal Sheen Overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h4 className="text-xl mb-2 font-belleza transition-colors">
                  {item.title}
                </h4>
                <p className="text-[12px] text-gray-200 font-roboto leading-snug">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}