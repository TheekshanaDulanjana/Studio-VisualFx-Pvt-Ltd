import React, { Suspense, useEffect, useState } from "react";
import { onEntered, hasEntered } from "../lib/entrance";

// Renders its children a moment after the page has loaded (when the browser
// is idle), one section after another. The first screen therefore appears
// much faster, and the rest of the page is still in place long before anyone
// scrolls to it (the welcome screen is up meanwhile). Search engines still get
// the full page - this only spreads the work out.
export default function Deferred({ children, order = 0, minHeight = "60vh" }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId;
    let t;
    let fallback;
    let started = false;
    const ric = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));
    const cic = window.cancelIdleCallback || clearTimeout;

    // stagger sections so each one is a small piece of work
    // (when the visitor is already inside the site - e.g. clicked "FAQ" on
    // another page - render almost immediately)
    const start = () => {
      if (started) return;
      started = true;
      const quick = hasEntered();
      t = setTimeout(() => {
        idleId = ric(() => setReady(true), { timeout: quick ? 200 : 2500 });
      }, order * (quick ? 20 : 80));
    };

    // Begin when the visitor taps Entrance, or shortly after the page has
    // loaded if they haven't yet (search engines never tap anything).
    const off = onEntered(start);
    const afterLoad = () => (fallback = setTimeout(start, 2500));
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    return () => {
      off();
      window.removeEventListener("load", afterLoad);
      clearTimeout(fallback);
      clearTimeout(t);
      cic(idleId);
    };
  }, [order]);

  const placeholder = <div data-deferred-pending="" aria-hidden="true" style={{ minHeight }} />;
  if (!ready) return placeholder;
  // children may be lazy-loaded components (separate small JS files)
  return <Suspense fallback={placeholder}>{children}</Suspense>;
}
