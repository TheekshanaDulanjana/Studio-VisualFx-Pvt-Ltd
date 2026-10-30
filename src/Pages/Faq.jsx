import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import useScrollFx from '../hooks/useScrollFx';
import { FAQS, CONTACT, track } from '../data/studio';
import { gsap, useGSAP } from '../lib/gsap';

const luxuryEase = [0.16, 1, 0.3, 1];

const FAQItem = ({ index, question, answer, isOpen, onClick }) => {
  const id = `faq-answer-${index}`;
  return (
    <div data-fx="card3d" className="mb-4 [perspective:1200px]">
      <div
        className={`group relative overflow-hidden rounded-[18px] border backdrop-blur-md transition-all duration-500 ${
          isOpen
            ? 'border-white/60 bg-white/[0.08] shadow-[0_30px_60px_-30px_rgba(255,255,255,0.25)]'
            : 'border-white/15 bg-white/[0.03] hover:border-white/40 hover:bg-white/[0.06]'
        }`}
      >
        {/* Question */}
        <button
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={id}
          className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-7"
        >
          <span
            className={`font-belleza text-2xl leading-none transition-colors duration-500 sm:text-3xl ${
              isOpen ? 'text-white' : 'text-white/30 group-hover:text-white/60'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="flex-1 font-belleza text-base tracking-wide text-white sm:text-lg">{question}</h3>
          <span
            aria-hidden="true"
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
              isOpen ? 'rotate-[135deg] border-white bg-white' : 'border-white/40 group-hover:border-white'
            }`}
          >
            <span className={`absolute h-px w-3.5 ${isOpen ? 'bg-black' : 'bg-white'}`} />
            <span className={`absolute h-3.5 w-px ${isOpen ? 'bg-black' : 'bg-white'}`} />
          </span>
        </button>

        {/* Answer: drops down and flips forward in 3D */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ rotateX: -75, y: -10 }}
                animate={{ rotateX: 0, y: 0 }}
                exit={{ rotateX: -75, y: -10 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{ transformOrigin: '50% 0%', transformPerspective: 900 }}
                className="px-5 pb-6 sm:px-7 sm:pl-[4.75rem]"
              >
                <p className="border-l border-white/40 pl-4 font-roboto text-sm leading-relaxed text-gray-200">
                  {answer}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const scope = useRef(null);
  const glyphRef = useRef(null);
  useScrollFx(scope);

  // big question mark slowly turns in 3D as the section scrolls by
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          glyphRef.current,
          { rotationY: -70, rotate: -10, yPercent: 15, transformPerspective: 800 },
          {
            rotationY: 50,
            rotate: 8,
            yPercent: -15,
            ease: 'none',
            scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope }
  );

  const faqs = FAQS;

  return (
    <section ref={scope} className="py-16 md:py-24 px-6">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left Column: Title and Description */}
        <div className="relative isolate lg:w-5/12 lg:sticky lg:top-24 h-fit">
          <span
            ref={glyphRef}
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 -top-10 right-0 select-none bg-linear-to-b from-white/25 to-white/0 bg-clip-text font-belleza text-[11rem] leading-none text-transparent sm:text-[16rem] lg:-top-16 lg:text-[20rem]"
          >
            ?
          </span>

          <div className="flex items-center gap-4 mb-6">
            <span data-fx="line" className="h-px w-12 sm:w-20 bg-white" />
            <p data-fx="up" className="font-roboto text-xs sm:text-sm uppercase tracking-[0.3em] text-white">
              Good to Know
            </p>
          </div>
          <h2 data-fx="words3d" className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-[1.08] text-white font-belleza mb-6">
            Frequently Asked Questions
          </h2>
          <p data-fx="up" className="text-gray-300 font-roboto text-justify text-sm leading-relaxed mb-8 max-w-md">
            Find quick answers to the most common questions about our services,
            process, and what to expect when working with Studio VisualFX.
          </p>

          <div data-fx="up" className="rounded-[18px] border border-white/15 bg-white/[0.03] p-5 max-w-md backdrop-blur-md">
            <p className="font-belleza text-lg text-white mb-1">Still have a question?</p>
            <p className="font-roboto text-xs text-white/60 mb-4">Message us and we'll get back to you quickly.</p>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Studio VisualFX! I have a question about your packages.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'faq' })}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-roboto text-sm text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:outline hover:outline-white"
            >
              <FaWhatsapp className="text-base" /> Ask on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Column: FAQ Cards */}
        <div className="w-full lg:w-7/12">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
