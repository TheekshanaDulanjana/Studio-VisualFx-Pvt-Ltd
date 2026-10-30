import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-24 text-center text-white">
      <div className="max-w-xl">
        <p className="mb-4 font-roboto text-xs uppercase tracking-[0.3em] text-white/50">Error 404</p>
        <h1 className="mb-4 font-belleza text-6xl sm:text-8xl">Lost the shot</h1>
        <p className="mb-10 font-roboto text-sm leading-relaxed text-white/70">
          The page you are looking for doesn't exist or has been moved. Let's get you back to the story.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-roboto text-sm text-black transition-colors duration-300 hover:bg-black hover:text-white hover:outline hover:outline-white"
          >
            Back to Home <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/film-gallery"
            className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 font-roboto text-sm text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Watch Our Films
          </Link>
        </div>
      </div>
    </section>
  );
}
