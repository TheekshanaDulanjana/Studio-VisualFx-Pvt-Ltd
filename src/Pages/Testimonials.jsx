import React, { useRef } from "react";
import TestimonialCard from "../components/TestimonialCard";

import MenoliPeiris from "../assets/Menoli Peiris.jpg";
import Ramitha from "../assets/Ramitha.jpg";
import Tharu from "../assets/Tharu.jpg";
import Dilmi from "../assets/Dilmi.jpg";
import Malindu from "../assets/Malindu.jpg";
import Hirushi from "../assets/Hirushi.jpg";
import Umesha from "../assets/Umesha.jpg";
import Randika from "../assets/Randika.jpg";

const testimonials = [
  {
    username: "Menoli Peiris",
    image: { src: MenoliPeiris },
    eventType: "Wedding",
    message: "Thank you for capturing our special day so beautifully. Every moment was filmed with such creativity, professionalism, and attention to detail. We truly appreciate your hard work, dedication, and friendly approach throughout the entire journey. Your talent and passion shine through in every frame. Highly recommended to anyone looking for a talented wedding videographer!",
    date: "04 June 2026"
  },
  {
    username: "Ramitha Nivi",
    image: { src: Ramitha },
    eventType: "Wedding",
    message: "💯 Recommended the service and the commitment at the field was really appreciated. Special thing was our time frame for the shoot was very tight and the time management and the punctuality of the team was 🫡👌. Final outcome will be a long lasting investment and still now we both watch and feel that live experience because of you guys. The quality you maintain, always matches two three generations forward. So don’t hesitate and don’t think twice to choose Studio VisualFX.",
    date: "15 February 2026"
  },
  {
    username: "Dilmi Mahinsala",
    image: { src: Dilmi },
    eventType: "Wedding",
    message: "A huge shoutout to Sasanka & team for capturing every unforgettable moments in our wedding ❤️☺️. You were super friendly, professional, hardworking and made the whole experience perfect. Thank you so much and definitely recommend your quick and stress free service 🎥😍",
    date: "23 January 2026"
  },
  {
    username: "Tharu Wilege",
    image: { src: Tharu },
    eventType: "Wedding",
    message: "Professionalism & Reliability: A true professional, highly recommend, finished our video so quickly ♥️🫶",
    date: "13 January 2026"
  },
  {
    username: "Malindu Hansaka",
    image: { src: Malindu },
    eventType: "Wedding",
    message: "Thank you for capturing our story so beautifully. Watching the video brings us right back to that. you for making us feel so comfortable in front of the camera. Your talent and hard work are unmatched. We appreciate your hard work and the incredible quality you delivered. You've truly captured the essence of our brand. you! So much gratitude for the magic you created.🙏🫂❤️‍df",
    date: "13 January 2026"
  },
  {
    username: "Hirushi Kalindi",
    image: { src: Hirushi },
    eventType: "Wedding",
    message: "Our wedding day was beautifully brought to life thanks to the incredible videography by Sasanka & Team. Your talent, professionalism, and eye for detail made every moment feel magical. The way you captured emotions, laughter, and every little detail was beyond our expectations. We are truly grateful for your hard work and creativity in turning our special day into a timeless film that we can relive again and again. A heartfelt thank you for making our memories last forever. Highly recommended! 🎥❤️",
    date: "03 September 2025"
  },
  {
    username: "Umesha Kolambage",
    image: { src: Umesha },
    eventType: "Wedding",
    message: "We are beyond grateful for the amazing work done by Studio VisualFX. Without question, picking u for our wedding filming was our best decision. U are very friendly & we were so easy to work with u. Our video & trailer are absolutely amazing. The trailer was absolutely breathtaking with perfect editing, music that truly reflected the emotions of the day. U captured every special moment so beautifully. Highly recommend to any couple looking for the best wedding videographer. Thank u so much for all ur hard work & capturing our day perfectly.🥰❤️🫶",
    date: "18 August 2025"
  },
  {
    username: "Randika Suridu",
    image: { src: Randika },
    eventType: "Wedding",
    message: "We're so grateful to have had such a talented and professional videographer capture our wedding day so beautifully. He turned every special moment into a lasting memory with his creative vision and attention to detail. Supportive to work with, and truly passionate about his craft-we highly recommend him to anyone looking to preserve their big day perfectly.",
    date: "15 July 2025"
  }
];

export default function Testimonials() {
  const sliderRef = useRef(null);
  const firstThree = testimonials.slice(0, 3);
  const remainingCount = testimonials.length - firstThree.length;

  const scroll = (direction) => {
    if (sliderRef.current) {
      // mobile screen width එක අනුව scroll ප්‍රමාණය ගණනය කරයි
      const cardWidth = sliderRef.current.querySelector(".testimonial-card-wrapper")?.offsetWidth || 300;
      const scrollAmount = direction === "left" ? -(cardWidth + 16) : (cardWidth + 16);
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="text-white py-12 sm:py-16 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* LEFT SIDE */}
        <div className="lg:w-5/12 flex flex-col justify-center">
          <div className="flex items-center mb-4 bg-white rounded-full w-fit px-3 py-2">
            {firstThree.map((t, i) => (
              <img
                key={t.username}
                src={t.image.src}
                alt={t.username}
                className={`w-6 h-6 rounded-full border border-black object-cover ${i !== 0 ? "-ml-2" : ""}`}
              />
            ))}
            {remainingCount > 0 && (
              <span className="ml-2 text-sm font-roboto text-black">
                +{remainingCount} Testimonials
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-belleza lg:text-5xl mb-4 sm:mb-6">
            What our clients are <br /> saying about us?
          </h2>

          <p className="text-gray-300 max-w-md font-roboto text-justify text-sm leading-relaxed">
            Hear directly from our clients about their experiences working with Studio VisualFX and how we’ve helped bring their stories to life.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-7/12 relative flex flex-col justify-between min-w-0">

          {/* Controls */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll Left"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 bg-black/40 text-white hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 320 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll Right"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 bg-black/40 text-white hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
          </div>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 px-1"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.username} 
                className="testimonial-card-wrapper snap-center sm:snap-start shrink-0 w-[85vw] max-w-[320px] sm:w-[320px]"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}