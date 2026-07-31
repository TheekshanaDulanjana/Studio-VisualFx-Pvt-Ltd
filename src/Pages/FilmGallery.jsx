import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

import AlbumDefultBanner from '../assets/AlbumDefultBanner.jpg';
import AlbumMobileBanner from '../assets/AlbumMobileBanner.jpg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const FilmGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      console.log('Searching for:', trimmedTerm);
    }
  };

  // Sample data
  const films = [
    { coupleName: 'Nethmi & Charuka', link: 'https://www.youtube.com/watch?v=MhENvCuxF0I' },
    { coupleName: 'Piyumi & Darshana', link: 'https://youtu.be/7JUmj4brDds' },
    { coupleName: 'Inesha & Randika', link: 'https://youtu.be/aplPx3YgxOc' },

    { coupleName: 'Meditha & Teran', link: 'https://www.youtube.com/watch?v=0yavt1yQGhc' },
    { coupleName: 'Raweesha & Sahan', link: 'https://www.youtube.com/watch?v=sqs5lNAy6GE' },
    { coupleName: 'Dilmi & Sanitha', link: 'https://www.youtube.com/watch?v=Ezo05vzfBbU' },

    { coupleName: 'Vihangi & Lahiru', link: 'https://youtu.be/j5-crzYuAys' },
    { coupleName: 'Nimmi & Brinoj', link: 'https://youtu.be/v2BLa9HXxeA' },
    { coupleName: 'Raveesha & Sahan', link: 'https://youtu.be/kkNuwRHeYR4' },
  ];

  // Filter based on search term
  const filteredFilms = films.filter(film =>
    film.coupleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Decide how many to show
  const filmsToShow = showMore ? filteredFilms : filteredFilms.slice(0, 9);

  // Extract YouTube video ID
  const getVideoId = (url) => {
    if (url.includes('youtu.be')) {
      return url.split('/').pop().split('?')[0];
    } else if (url.includes('watch?v=')) {
      return url.split('watch?v=')[1].split('&')[0];
    }
    return '';
  };

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
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-104 md:h-88 overflow-hidden">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: luxuryEase }}
        >
          {/* Mobile Image */}
          <motion.img
            src={AlbumMobileBanner}
            alt="Album Mobile Banner"
            className="w-full h-full object-cover md:hidden"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.15 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: luxuryEase,
            }}
          />
          {/* Desktop/Tablet Image */}
          <motion.img
            src={AlbumDefultBanner}
            alt="Album Default Banner"
            className="w-full h-full object-cover hidden md:block"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.15 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: luxuryEase,
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black to-transparent opacity-90 z-10" />
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="absolute inset-0 flex flex-col items-center font-belleza justify-center text-center px-4 z-20 mt-28"
        >
          <motion.h1
            className="text-3xl md:text-4xl text-white"
            variants={fadeInUp}
          >
            Our Films
          </motion.h1>
          <motion.p
            className="text-sm md:text-base font-roboto text-white mt-2 max-w-4xl"
            variants={fadeInUp}
          >
            Explore our cinematic journey through weddings, music videos,
            events, and commercial productions. Each film is crafted with 
            creativity, passion, and precision to tell stories that inspire,
            captivate, and leave a lasting impression.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="w-full max-w-md relative mt-6"
            variants={fadeInUp}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search your film..."
              className="w-full font-roboto text-sm tracking-wide border shadow-xl border-gray-400 hover:border-white px-4 py-2 bg-transparent rounded-full text-white backdrop-blur-xs focus:outline-none focus:border-white transition duration-300"
            />
            <button
              onClick={handleSearch}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-300 hover:text-white cursor-pointer"
            >
              <FaSearch className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Film Cards Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        {filmsToShow.length > 0 ? (
          /* Mobile: 1 card | Tab: 2 cards | Desktop: 3 cards */
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filmsToShow.map((film, index) => {
              const videoId = getVideoId(film.link);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: luxuryEase }}
                  className="bg-white/20 backdrop-blur-sm rounded-[16px] border border-white shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => window.open(film.link, '_blank')}
                >
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={thumbnail}
                      alt={film.coupleName}
                      className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      }}
                    />

                    {/* White Glow/Shine Effect on Hover */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
                    </div>

                    {/* YouTube Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <div className="w-0 h-0 border-l-14 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center text-sm font-roboto text-white">{film.coupleName}</div>
                </motion.div>
              );
            })}
          </motion.div>
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

        {/* See More / Show Less */}
        {filteredFilms.length > 9 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
            className="mt-8 flex items-center justify-center"
          >
            <motion.button
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
      </motion.div>
    </div>
  );
};

export default FilmGallery;