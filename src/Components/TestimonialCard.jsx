import React, { useState } from "react";

export default function TestimonialCard({ testimonial }) {
  const { username, image, eventType, message, date } = testimonial;

  // Controls the "message open" state.
  // - Desktop: opens on hover (via group-hover CSS) regardless of this state.
  // - Mobile/Tablet: hover doesn't exist, so we toggle this on tap/touch.
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleToggle}
      className="group relative w-[80vw] xs:w-72 sm:w-80 max-w-[320px] shrink-0 box-border overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 cursor-pointer select-none"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image.src}
          alt={username}
          className="h-full rounded-2xl w-full object-cover"
          draggable={false}
        />
        <span className="absolute top-3 left-3 rounded-full bg-black/30 backdrop-blur-xs border px-3 py-1 text-xs font-roboto text-white">
          {eventType}
        </span>
      </div>

      {/* Basic Info (always visible) */}
      <div className="p-4">
        <h3 className="font-belleza text-lg text-white truncate">{username}</h3>
        <p className="font-roboto text-xs text-gray-400 mb-2">{date}</p>
        <p className="font-roboto text-sm text-gray-300 line-clamp-2">{message}</p>
      </div>

      {/* Full Message Overlay
          - opacity-0 -> group-hover:opacity-100 handles desktop hover
          - isOpen appended manually so mobile/tablet tap also reveals it */}
      <div
        className={`absolute inset-0 flex flex-col justify-center bg-black/40 backdrop-blur-md p-5 text-left opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 ${
          isOpen ? "opacity-100" : ""
        }`}
      >
        <h3 className="font-belleza text-lg text-white mb-1">{username}</h3>
        <p className="font-roboto text-xs text-white/70 mb-3">
          {eventType} • {date}
        </p>
        <p className="font-roboto text-sm text-white leading-relaxed overflow-y-auto max-h-40 pr-1">
          {message}
        </p>
      </div>
    </div>
  );
}