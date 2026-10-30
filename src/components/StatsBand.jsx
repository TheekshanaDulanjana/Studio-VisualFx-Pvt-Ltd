import React, { useRef } from "react";
import useScrollFx from "../hooks/useScrollFx";
import { STATS } from "../data/studio";

// Big count-up numbers between the intro and the services.
export default function StatsBand() {
  const scope = useRef(null);
  useScrollFx(scope);

  return (
    <section ref={scope} aria-label="Studio VisualFX in numbers" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[1600px]">
        <div data-fx="line" className="mb-10 h-px w-full bg-white/15 md:mb-14" />
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-fx="up"
              className={`relative px-2 text-center md:px-6 md:text-left ${
                i % 2 === 1 ? "md:border-l" : ""
              } ${i === 2 ? "md:border-l" : ""} border-white/10`}
            >
              <div
                data-fx="count"
                className="font-belleza text-5xl leading-none text-white tabular-nums sm:text-6xl lg:text-8xl"
              >
                {stat.value}
              </div>
              <div className="mt-3 font-roboto text-[10px] uppercase tracking-[0.3em] text-white/60 sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div data-fx="line" className="mt-10 h-px w-full bg-white/15 md:mt-14" />
      </div>
    </section>
  );
}
