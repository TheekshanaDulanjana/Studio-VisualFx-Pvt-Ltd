import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

import AlbumDefultBanner from '../assets/optimized/AlbumDefultBanner.webp';
import AlbumMobileBanner from '../assets/optimized/AlbumMobileBanner.webp';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { gsap, useGSAP } from '../lib/gsap';
import useScrollFx from '../hooks/useScrollFx';
import { FILMS, getVideoId } from '../data/studio';

const FilmGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      console.log('Searching for:', trimmedTerm);
    }
  };

  const films = FILMS;

  const filteredFilms = films.filter(film =>
    film.coupleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filmsToShow = showMore ? filteredFilms : filteredFilms.slice(0, 9);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const bannerRef = useRef(null);
  const heroContentRef = useRef(null);

  // New cards (search / show more) get animated, existing ones are left alone
  useScrollFx(pageRef, [filmsToShow.map((f) => f.link).join('|')]);

  // Banner drifts slower than the page, title floats away
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const st = { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to(bannerRef.current, { yPercent: 25, ease: 'none', scrollTrigger: st });
        gsap.to(heroContentRef.current, { y: -80, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '90% top' } });
      });
      return () => mm.revert();
    },
    { scope: heroRef }
  );

  const luxuryEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.15 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 45 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: luxuryEase } },
  };


  return (
    <div ref={pageRef} className="w-full">
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full h-104 md:h-88 overflow-hidden">
        <div ref={bannerRef} className="w-full h-full will-change-transform">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: luxuryEase }}
        >
          {/* <picture> so only ONE banner is downloaded (two <img> + CSS hide fetches both) */}
          <picture className="block w-full h-full">
            <source media="(min-width: 768px)" srcSet={AlbumDefultBanner} />
            <motion.img
              src={AlbumMobileBanner}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1.15 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: luxuryEase }}
            />
          </picture>
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black to-transparent opacity-90 z-10" />
        </motion.div>
        </div>

        <div ref={heroContentRef} className="absolute inset-0 z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="absolute inset-0 flex flex-col items-center font-belleza justify-center text-center px-4 z-20 mt-28"
        >
          <motion.h1 className="text-3xl md:text-4xl text-white" variants={fadeInUp}>
            Our Wedding Films
          </motion.h1>
          <motion.p className="text-sm md:text-base font-roboto text-white mt-2 max-w-4xl" variants={fadeInUp}>
            Explore cinematic wedding films by Studio VisualFX, each crafted with
            creativity, passion, and precision to tell stories that inspire and
            leave a lasting impression. Looking for music videos, events or brand
            work? See our{' '}
            <Link to="/commercial" className="underline underline-offset-4 hover:text-gray-300">
              commercial and music video production
            </Link>.
          </motion.p>

          {/* Search Bar */}
          <motion.div className="w-full max-w-md relative mt-6" variants={fadeInUp}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search your film..."
              aria-label="Search wedding films by couple name"
              className="w-full font-roboto text-sm tracking-wide border shadow-xl border-gray-400 hover:border-white px-4 py-2 bg-transparent rounded-full text-white backdrop-blur-xs focus:outline-none focus:border-white transition duration-300"
            />
            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search films"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-300 hover:text-white cursor-pointer"
            >
              <FaSearch className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Film Cards Section */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {filmsToShow.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filmsToShow.map((film) => {
              const videoId = getVideoId(film.link);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

              return (
                // Real <a> (crawlable, keyboard accessible) instead of a clickable <div> + window.open
                <a
                  key={videoId}
                  href={film.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${film.coupleName} wedding film on YouTube`}
                  data-fx="card3d"
                  data-tilt="8"
                  className="block will-change-transform bg-white/20 backdrop-blur-sm rounded-[16px] border border-white shadow-lg overflow-hidden cursor-pointer group"
                >
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src={thumbnail}
                      alt={`${film.coupleName} wedding film by Studio VisualFX`}
                      width="1280"
                      height="720"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      }}
                    />

                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <div className="w-0 h-0 border-l-14 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <h2 className="p-4 text-center text-sm font-roboto text-white">{film.coupleName}</h2>
                </a>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="text-center text-white mt-24 mb-24"
          >
            <h2 className="text-2xl font-belleza mb-2">No results found!</h2>
            <p className="text-sm font-roboto">Sorry, we couldn't find anything matching your search!</p>
          </motion.div>
        )}

        {filteredFilms.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
            className="mt-8 flex items-center justify-center"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: luxuryEase }}
              onClick={() => setShowMore(!showMore)}
              className="w-35 h-10 flex items-center justify-center gap-2 
                        bg-white text-black font-roboto text-sm  
                        px-4 py-4 rounded-full 
                        hover:bg-white transition-all duration-300 cursor-pointer"
            >
              <span className="text-md">{showMore ? "Show Less" : "Show More"}</span>
              <span className="flex items-center justify-center w-6 h-6 bg-black rounded-full">
                {showMore ? (
                  <FaArrowLeft className="text-white text-xs" />
                ) : (
                  <FaArrowRight className="text-white text-xs" />
                )}
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FilmGallery;