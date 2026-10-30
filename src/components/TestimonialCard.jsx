import React, { useState } from "react";

// 3D flip card: photo + short quote on the front, full review on the back.
// Desktop: hover flips it. Touch: tap flips it.
export default function TestimonialCard({ testimonial }) {
  const { username, image, eventType, message, date } = testimonial;
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((v) => !v);

  return (
    <div
      className="group h-[430px] w-[80vw] max-w-[320px] shrink-0 select-none [perspective:1400px] sm:w-80"
      onClick={toggle}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Review by ${username}. ${flipped ? "Showing full review" : "Show full review"}`}
    >
      <div
        className={`relative h-full w-full cursor-pointer transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : "[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]"
        }`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 overflow-hidden rounded-[22px] border border-white/15 bg-neutral-900 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] [backface-visibility:hidden]">
          <img
            src={image.src}
            alt={username}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-[scale] duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/0" />

          <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-black/30 px-3 py-1 font-roboto text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
            {eventType}
          </span>
          <span aria-hidden="true" className="absolute right-5 top-1 font-belleza text-7xl leading-none text-white/70">
            &rdquo;
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="mb-4 font-roboto text-sm leading-relaxed text-white/90 line-clamp-3">{message}</p>
            <div className="flex items-center gap-3 border-t border-white/15 pt-4">
              <img
                src={image.src}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/70"
                draggable={false}
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-belleza text-lg leading-tight text-white">{username}</h3>
                <p className="font-roboto text-[11px] text-white/60">{date}</p>
              </div>
              <span className="font-roboto text-[10px] uppercase tracking-widest text-white/50">
                Read
              </span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-white/30 bg-linear-to-br from-neutral-800 via-neutral-900 to-black p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span aria-hidden="true" className="font-belleza text-6xl leading-[0.6] text-white/30">
            &ldquo;
          </span>
          <p
            data-lenis-prevent
            className="mt-4 flex-1 overflow-y-auto pr-1 font-roboto text-sm leading-relaxed text-white/90 [scrollbar-width:thin]"
          >
            {message}
          </p>
          <div className="mt-4 flex items-center gap-3 border-t border-white/15 pt-4">
            <img
              src={image.src}
              alt=""
              aria-hidden="true"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white/70"
              draggable={false}
            />
            <div className="min-w-0">
              <h3 className="truncate font-belleza text-lg leading-tight text-white">{username}</h3>
              <p className="font-roboto text-[11px] text-white/60">
                {eventType} • {date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
