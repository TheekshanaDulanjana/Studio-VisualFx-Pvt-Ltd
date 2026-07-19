import React, { useRef, useEffect, useState } from "react";
import TestimonialCard from "../Components/TestimonialCard";

import MenoliPeiris from "../assets/Menoli Peiris.jpg";
import Ramitha from "../assets/Ramitha.jpg"
import Tharu from "../assets/Tharu.jpg"
import Dilmi from "../assets/Dilmi.jpg"
import Malindu from "../assets/Malindu.jpg"
import Hirushi from "../assets/Hirushi.jpg"
import Umesha from "../assets/Umesha.jpg"
import Randika from "../assets/Randika.jpg"



const testimonials = [
    //     { 
  //   username: "Menoli Peiris", 
  //   image: MenoliPeiris, 
  //   eventType: "Wedding", 
  //   message: "", 
  //   date: "04 June 2026" 
  // },
  
  { 
    username: "Menoli Peiris", 
    image: MenoliPeiris, 
    eventType: "Wedding", 
    message: "Thank you for capturing our special day so beautifully. Every moment was filmed with such creativity, professionalism, and attention to detail. We truly appreciate your hard work, dedication, and friendly approach throughout the entire journey. Your talent and passion shine through in every frame. Highly recommended to anyone looking for a talented wedding videographer!", 
    date: "04 June 2026" 
  },

  { 
    username: "Ramitha Nivi", 
    image: Ramitha, 
    eventType: "Wedding", 
    message: "💯 Recommended the service and the commitment at the field was really appreciated. Special thing was our time frame for the shoot was  very tight and  the time management and the punctuality of the team was 🫡👌. Final outcome will be a long lasting investment and still now we both watch and feel that live experience because of you guys. The quality you maintain, always matches two three generations forward. So don’t hesitate and don’t think twice to choose Studio VisualFX.", 
    date: "15 February 2026" 
  },

    { 
    username: "Dilmi Mahinsala", 
    image: Dilmi, 
    eventType: "Wedding", 
    message: "A huge shoutout to Sasanka & team for capturing every unforgettable moments in our wedding ❤️☺️. You were super friendly, professional, hardworking and made the whole experience perfect. Thank you so much and definitely recommend your quick and stress free service 🎥😍", 
    date: "23 January 2026" 
  },

      { 
    username: "Tharu Wilege", 
    image: Tharu, 
    eventType: "Wedding", 
    message: "Professionalism & Reliability: A true professional, highly recommend, finished our video so quickly ♥️🫶",
    date: "13 January 2026" 
  },

      { 
    username: "Malindu Hansaka", 
    image: Malindu, 
    eventType: "Wedding", 
    message: "Thank you for capturing our story so beautifully. Watching the video brings us right back to that. you for making us feel so comfortable in front of the camera. Your talent and hard work are unmatched. We appreciate your hard work and the incredible quality you delivered. You've truly captured the essence of our brand. you! So much gratitude for the magic you created.🙏🫂❤️‍🩹", 
    date: "13 January 2026" 
  },

      { 
    username: "Hirushi Kalindi", 
    image: Hirushi, 
    eventType: "Wedding", 
    message: "Our wedding day was beautifully brought to life thanks to the incredible videography by Sasanka & Team. Your talent, professionalism, and eye for detail made every moment feel magical. The way you captured emotions, laughter, and every little detail was beyond our expectations. We are truly grateful for your hard work and creativity in turning our special day into a timeless film that we can relive again and again. A heartfelt thank you for making our memories last forever. Highly recommended! 🎥❤️", 
    date: "03 September 2025" 
  },

      { 
    username: "Umesha Kolambage", 
    image: Umesha, 
    eventType: "Wedding", 
    message: "We are beyond grateful for the amazing work done by Studio VisualFX. Without question, picking u for our wedding filming was our best decision. U are very friendly & we were so easy to work with u. Our video & trailer are absolutely amazing. The trailer was absolutely breathtaking with perfect editing, music that truly reflected the emotions of the day. U captured every special moment so beautifully. Highly recommend to any couple looking for the best wedding videographer. Thank u so much for all ur hard work & capturing our day perfectly.🥰❤️🫶", 
    date: "18 August 2025" 
  },

      { 
    username: "Randika Suridu", 
    image: Randika, 
    eventType: "Wedding", 
    message: "We're so grateful to have had such a talented and professional videographer capture our wedding day so beautifully. He turned every special moment into a lasting memory with his creative vision and attention to detail. Supportive to work with, and truly passionate about his craft-we highly recommend him to anyone looking to preserve their big day perfectly.", 
    date: "15 July 2025" 
  },

  //     { 
  //   username: "Menoli Peiris", 
  //   image: MenoliPeiris, 
  //   eventType: "Wedding", 
  //   message: "", 
  //   date: "04 June 2026" 
  // },

  //     { 
  //   username: "Menoli Peiris", 
  //   image: MenoliPeiris, 
  //   eventType: "Wedding", 
  //   message: "", 
  //   date: "04 June 2026" 
  // },

  //     { 
  //   username: "Menoli Peiris", 
  //   image: MenoliPeiris, 
  //   eventType: "Wedding", 
  //   message: "", 
  //   date: "04 June 2026" 
  // },


];

export default function Testimonials() {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const firstThree = testimonials.slice(0, 3);
  const remainingCount = testimonials.length - firstThree.length;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // 🔹 Auto scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    intervalRef.current = setInterval(() => {
      slider.scrollBy({ left: 320, behavior: "smooth" });
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // 🔹 Mouse wheel scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      e.preventDefault();
      slider.scrollBy({ left: e.deltaY > 0 ? 320 : -320, behavior: "smooth" });
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  // 🔹 Touch drag
  const handleTouchStart = (e) => { setStartX(e.touches[0].clientX); setIsDragging(true); };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      sliderRef.current.scrollBy({ left: diff > 0 ? 320 : -320, behavior: "smooth" });
      setStartX(currentX);
    }
  };
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <section className=" text-white py-12 sm:py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* LEFT SIDE */}
        <div className="lg:w-5/12 flex flex-col justify-center">
          <div className="flex items-center mb-4 bg-white rounded-full w-fit px-3 py-2">
            {firstThree.map((t, i) => (
              <img
                key={i}
                src={t.image}
                alt={t.username}
                className={`w-6 h-6 sm:w-6 sm:h-6 rounded-full border border-black object-cover ${i !== 0 ? "-ml-2" : ""}`}
              />
            ))}
            {remainingCount > 0 && (
              <span className="ml-2 text-sm sm:text-sm font-roboto text-black">
                +{remainingCount} Testimonials
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-belleza lg:text-5xl mb-4 sm:mb-6  ">
            What our clients are <br /> saying about us?
          </h2>

          <p className="text-gray-300 max-w-md font-roboto text-justify sm:text-sm text-sm leading-relaxed">
            Hear directly from our clients about their experiences 
            working with Studio VisualFX and how we’ve helped bring 
            their stories to life.
          </p>
        </div>

        {/* RIGHT SIDE – Auto Slider */}
        <div className="lg:w-7/12 relative">
          <div
            ref={sliderRef}
            onMouseEnter={() => clearInterval(intervalRef.current)}
            onMouseLeave={() => {
              intervalRef.current = setInterval(() => sliderRef.current.scrollBy({ left: 320, behavior: "smooth" }), 3000);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 sm:gap-6 overflow-hidden scroll-smooth snap-x snap-mandatory cursor-grab py-2"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* 🔹 Gradient overlay for right shadow effect on large screens */}
          <div className="hidden lg:block absolute top-0 right-0 h-full w-34 pointer-events-none bg-linear-to-l from-black/80 to-transparent"></div>
        </div>

      </div>
    </section>
  );
}
