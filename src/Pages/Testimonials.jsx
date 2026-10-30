import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import useScrollFx from "../hooks/useScrollFx";
import { gsap, useGSAP } from "../lib/gsap";
import TestimonialCard from "../components/TestimonialCard";

import MenoliPeiris from "../assets/optimized/MenoliPeiris.webp";
import Ramitha from "../assets/optimized/Ramitha.webp";
import Tharu from "../assets/optimized/Tharu.webp";
import Dilmi from "../assets/optimized/Dilmi.webp";
import Malindu from "../assets/optimized/Malindu.webp";
import Hirushi from "../assets/optimized/Hirushi.webp";
import Umesha from "../assets/optimized/Umesha.webp";
import Randika from "../assets/optimized/Randika.webp";
import Jules from "../assets/optimized/Jules.webp";

const testimonials = [
    {
    username: "Jules Jenkinson",
    image: { src: Jules },
    eventType: "Wedding",
    message: "One of the best Photographers/Videographers I've worked with, and coming from Australia this speaks volumes. Exceptional talent!We are so grateful for the time effort energy you have placed in every photograph and video that you and you're team had taken. The photos are sheer magic, keep sakes for ever with tales of a lifetime. We waited and waited patiently to see Day 1 and Day 2 and they are truly incredible. The video of our Poruwa ceremony felt it was like stepping back in time and watching an old movie, can't wait to see Day 2. You are very talented and gifted thank you for the work you do.",
    date: "01 September 2026"
  },{
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
    message: "Our wedding day was beautifully brought to life thanks to the incredible videography by Sasanka & Team. Your talent, professionalism, and eye for detail made every moment feel magical. The way you captured emotions, laughter, and every little detail was beyond our expectations. We are truly grateful for your hard work and creativity in turning our special day into a timeless film that we can relive again and again. A heartfelt thank you for making our memories last forever. Highly recommended! 🎥❤️️",
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
  const scope = useRef(null);
  const quoteRef = useRef(null);
  const barRef = useRef(null);
  useScrollFx(scope);

  useGSAP(
    () => {
      const slider = sliderRef.current;
      const items = gsap.utils.toArray(".cf-item", slider);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 3D coverflow: cards turn and sink back the further they are from the centre
      let raf = 0;
      const update = () => {
        raf = 0;
        const max = slider.scrollWidth - slider.clientWidth;
        const p = max > 0 ? slider.scrollLeft / max : 1;
        gsap.to(barRef.current, { scaleX: Math.max(0.06, p), duration: 0.4, ease: "power3.out", overwrite: true });
        if (reduce) return;
        const sr = slider.getBoundingClientRect();
        const centre = sr.left + sr.width / 2;
        items.forEach((item) => {
          const r = item.getBoundingClientRect();
          const d = gsap.utils.clamp(-1.4, 1.4, (r.left + r.width / 2 - centre) / r.width);
          gsap.set(item, {
            rotationY: d * -22,
            z: -Math.abs(d) * 140,
            scale: 1 - Math.min(Math.abs(d), 1) * 0.08,
            transformPerspective: 1200,
            transformOrigin: d > 0 ? "0% 50%" : "100% 50%",
          });
        });
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      update();
      slider.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          quoteRef.current,
          { yPercent: 30, rotate: -12, opacity: 0 },
          {
            yPercent: -30,
            rotate: 8,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      return () => {
        cancelAnimationFrame(raf);
        slider.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        mm.revert();
      };
    },
    { scope }
  );

  const firstThree = testimonials.slice(0, 3);
  const remainingCount = testimonials.length - firstThree.length;

  const scroll = (direction) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".testimonial-card-wrapper")?.offsetWidth || 300;
      const scrollAmount = direction === "left" ? -(cardWidth + 24) : cardWidth + 24;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const arrowBtn =
    "w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer";

  return (
    <section ref={scope} className="relative text-white py-16 sm:py-24 overflow-hidden">
      <span
        ref={quoteRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 select-none font-belleza text-[16rem] leading-none text-white/[0.05] sm:text-[24rem] lg:right-[6%]"
      >
        &ldquo;
      </span>

      {/* Header */}
      <div className="relative max-w-[1600px] mx-auto px-6 mb-10 md:mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div data-fx="up" className="flex items-center mb-6 bg-white rounded-full w-fit pl-2 pr-4 py-1.5 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.4)]">
            {firstThree.map((t, i) => (
              <img
                key={t.username}
                src={t.image.src}
                alt={t.username}
                loading="lazy"
                className={`w-7 h-7 rounded-full border-2 border-white object-cover ${i !== 0 ? "-ml-2.5" : ""}`}
              />
            ))}
            {remainingCount > 0 && (
              <span className="ml-2 text-sm font-roboto text-black">+{remainingCount} Testimonials</span>
            )}
          </div>

          <h2
            data-fx="words3d"
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-[1.08] font-belleza"
          >
            What our clients are <br /> saying about us?
          </h2>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
          <p data-fx="up" className="text-gray-300 max-w-md font-roboto text-justify text-sm leading-relaxed lg:text-right">
            Hear directly from our clients about their experiences working with Studio VisualFX and how we’ve helped bring their stories to life.
          </p>
          <div data-fx="up" className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/visualfxsl/reviews/?id=100067077977165&sk=reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors duration-300 text-sm font-roboto cursor-pointer"
            >
              Testimonial References
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:-rotate-45" />
            </a>
            <button onClick={() => scroll("left")} aria-label="Scroll Left" className={arrowBtn}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 320 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll Right" className={arrowBtn}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 3D coverflow slider */}
      <div className="relative max-w-[1600px] mx-auto">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-8 px-[10vw] md:px-[calc(50%-160px)] [transform-style:preserve-3d]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.username}
              data-fx="card-side"
              className="testimonial-card-wrapper snap-center shrink-0 w-[80vw] max-w-[320px] sm:w-[320px]"
            >
              <div className="cf-item will-change-transform">
                <TestimonialCard testimonial={testimonial} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider progress */}
      <div aria-hidden="true" className="max-w-[1600px] mx-auto px-6 mt-4">
        <div className="mx-auto h-px w-full max-w-md bg-white/15">
          <div ref={barRef} className="h-px w-full origin-left scale-x-[0.06] bg-white" />
        </div>
        <p className="mt-3 text-center font-roboto text-[10px] uppercase tracking-[0.3em] text-white/40">
          Hover or tap a card to read the full story
        </p>
      </div>
    </section>
  );
}
