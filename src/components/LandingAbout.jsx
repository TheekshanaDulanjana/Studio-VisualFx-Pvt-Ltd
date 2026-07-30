import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LandingAbout() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/about");
  };

  // Video data
  const videos = [
    { id: "v2BLa9HXxeA", thumbnail: "https://img.youtube.com/vi/v2BLa9HXxeA/maxresdefault.jpg" },
    { id: "kkNuwRHeYR4", thumbnail: "https://img.youtube.com/vi/kkNuwRHeYR4/hqdefault.jpg" },
    { id: "aplPx3YgxOc", thumbnail: "https://img.youtube.com/vi/aplPx3YgxOc/maxresdefault.jpg" },

  ];

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <section className="max-w-7xl mx-auto text py-12 md:py-20 px-6 sm:px-6 lg:px-8 font-[Alata] flex flex-col justify-center">
      
      {/* Header Section */}
      <div className="mb-12">
        <p className="text-white text-xs text- font-roboto sm:text-xl lg:text-sm  mb-2 uppercase tracking-widest">
          The eyes behind stories!
        </p>

        <div className="w-16 sm:w-53 border-t border-white mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          
          <div className="lg:col-span-7">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] font-belleza text-white">
              Crafting Timeless Visual Stories <br className="hidden sm:block" />
              Through Passion, Vision, and <br className="hidden sm:block" />
              Authentic Creativity!
            </h1>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start">
            <p className="text-gray-200 font-roboto text-sm sm:text-sm leading-relaxed mt-6 sm:mt-0 text-justify lg:text-justify">
              At Studio VisualFX (Pvt) Ltd, we are driven by a deep passion for storytelling through visuals. 
              Every project we take on is a blend of creativity, technical expertise, and attention to 
              detail ensuring each moment is captured with authenticity and purpose. From intimate 
              celebrations to large-scale productions, we transform ideas into compelling visual 
              experiences that leave a lasting impression.
            </p>

            <div className="mt-6 w-full flex justify-start">
              <button
                onClick={handleExploreClick}
                className="group flex items-center gap-2 bg-white 
                           font-[Alata] text-black px-3 py-1.5 rounded-full 
                           hover:bg-black hover:text-white border border-transparent
                           hover:border-white transition-all duration-300 
                           text-sm md:text-base cursor-pointer "
              >
                <span className="font-roboto text-xs">Explore more</span>
                <span className="flex items-center justify-center w-6 h-6 bg-black rounded-full group-hover:bg-white transition-colors duration-300">
                  <FaArrowRight className="text-white text-[10px] group-hover:text-black transition-colors duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-4 md:mt-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-6">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="relative aspect-video rounded-[16px] overflow-hidden shadow-2xl bg-zinc-900 cursor-pointer hover:scale-[1.03] transition-transform duration-500 group"
              onClick={() => openVideo(video.id)}
            >
              {/* Thumbnail */}
              <img 
                src={video.thumbnail} 
                alt="video thumbnail" 
                className="w-full h-full object-cover" 
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300"> 
                <div className="w-16 h-10 bg-white/30 backdrop-blur-md rounded-[8px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-l-16 border-l-white border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}