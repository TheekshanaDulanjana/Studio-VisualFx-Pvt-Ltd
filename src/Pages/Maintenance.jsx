import React from "react";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-6">
          Launching Soon
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-belleza text-white leading-tight">
          Something Extraordinary
          Is Coming
        </h1>

        <p className="mt-8 text-gray-300 text-sm sm:text-base md:text-lg font-roboto leading-relaxed max-w-2xl mx-auto">
          We're putting the finishing touches on a brand-new Studio VisualFX
          experience. Stay tuned as we prepare to launch our new website.
        </p>
{/* coming soon message */}
        <div className="mt-10">
          <span className="inline-block border border-white/30 rounded-full px-8 py-3 text-white text-sm tracking-widest uppercase">
            Coming Soon
          </span>
        </div>

      </div>
    </div>
  );
};

export default Maintenance;