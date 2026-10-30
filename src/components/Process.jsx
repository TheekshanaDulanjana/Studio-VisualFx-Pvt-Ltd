import React, { useRef } from "react";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { gsap, useGSAP } from "../lib/gsap";
import useScrollFx from "../hooks/useScrollFx";
import { scrollToSection } from "../lib/scroll";
import { CONTACT, track } from "../data/studio";

// "How we work" - steps light up one by one while a progress line draws down.
const STEPS = [
  {
    title: "Consultation",
    text: "Tell us about your day, your story and the look you love. We plan the coverage around your vision, venue and schedule.",
  },
  {
    title: "Reserve Your Date",
    text: "An advance payment secures your date on our calendar, so the team is locked in for your celebration.",
  },
  {
    title: "Filming Day",
    text: "Our crew captures every emotion, ritual and detail. We recommend a table round session so every guest is covered.",
  },
  {
    title: "Editing & Colour",
    text: "Your story is crafted in Premiere Pro, DaVinci Resolve, After Effects and Audition with cinematic grading and sound design.",
  },
  {
    title: "Delivery",
    text: "Your final film is delivered within 8-12 weeks. RAW footage and footage archiving are available as optional add-ons.",
  },
];

export default function Process() {
  const scope = useRef(null);
  const list = useRef(null);
  const fill = useRef(null);
  useScrollFx(scope);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list.current, start: "top 60%", end: "bottom 60%", scrub: 0.5 },
          }
        );

        gsap.utils.toArray(".process-step", list.current).forEach((step) => {
          const dot = step.querySelector(".process-dot");
          const num = step.querySelector(".process-num");
          gsap
            .timeline({
              scrollTrigger: { trigger: step, start: "top 62%", end: "bottom 62%", toggleActions: "play none none reverse" },
            })
            .fromTo(step, { opacity: 0.28 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
            .fromTo(dot, { scale: 0.4, backgroundColor: "#000" }, { scale: 1, backgroundColor: "#fff", duration: 0.5 }, 0)
            .fromTo(num, { x: -20 }, { x: 0, duration: 0.8 }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} aria-labelledby="process-title" className="px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left - sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p data-fx="up" className="mb-3 font-roboto text-xs uppercase tracking-[0.3em] text-white/60">
              How We Work
            </p>
            <h2
              id="process-title"
              data-fx="words"
              className="mb-6 font-belleza text-3xl leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              From First Hello to Your Final Film
            </h2>
            <p data-fx="up" className="mb-8 max-w-md font-roboto text-sm leading-relaxed text-gray-300">
              A simple, stress-free process built around you. Our clients often mention our punctuality,
              quick delivery and how comfortable they felt in front of the camera.
            </p>
            <div data-fx="up" className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  track("cta_click", { location: "process", action: "check_date" });
                  scrollToSection("contact");
                }}
                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-3 rounded-full bg-white px-6 py-3 font-roboto text-sm font-semibold text-black transition-colors duration-500 hover:bg-black hover:text-white hover:outline hover:outline-white"
              >
                Check Your Date
                <FaArrowRight className="text-xs transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                  "Hi Studio VisualFX! I'd like to check availability for my date."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "process" })}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/50 px-6 py-3 font-roboto text-sm text-white transition-colors duration-500 hover:bg-white hover:text-black"
              >
                <FaWhatsapp className="text-base" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Right - steps */}
        <ol ref={list} className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute left-[11px] top-2 bottom-2 w-px bg-white/15" />
          <span
            ref={fill}
            aria-hidden="true"
            className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-white"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="process-step relative pb-12 pl-14 last:pb-0 md:pl-20">
              <span
                aria-hidden="true"
                className="process-dot absolute left-0 top-1 h-[23px] w-[23px] rounded-full border border-white bg-white"
              />
              <span className="process-num mb-2 block font-belleza text-5xl leading-none text-white/15 md:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 font-belleza text-2xl text-white md:text-3xl">{step.title}</h3>
              <p className="max-w-lg font-roboto text-sm leading-relaxed text-gray-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
