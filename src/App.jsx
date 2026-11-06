import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

// Components
import Header from "./components/Header";
// not needed for the first screen -> separate small files, rendered after load
const Footer = lazy(() => import("./components/Footer"));
const WhatsappButton = lazy(() => import("./components/WhatsappButton"));
const ScrollToTopCompo = lazy(() => import("./components/ScrollToTopCompo"));
import SmoothScroll from "./components/SmoothScroll";
import CinematicOverlay from "./components/CinematicOverlay";
import WelcomeAudio from "./components/WelcomeAudio";
import Deferred from "./components/Deferred";
import { scrollToTop } from "./lib/scroll";

// SEO
import RouteSEO from "./seo/RouteSEO";
import { REDIRECTS } from "./seo/seo.config";

// Pages path
import Home from "./Pages/Home";

// Other pages load on demand (smaller first download for the home page)
const About = lazy(() => import("./Pages/About"));
// home-page sections below the first screen (rendered after load via <Deferred>)
const Testimonials = lazy(() => import("./Pages/Testimonials"));
const FAQ = lazy(() => import("./Pages/Faq"));
const Contact = lazy(() => import("./Pages/Contact"));
const FilmGallery = lazy(() => import("./Pages/FilmGallery"));
const Commercial = lazy(() => import("./Pages/Commercial"));
const TermofCondition = lazy(() => import("./Pages/TermofCondition"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./Pages/NotFound"));

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </HelmetProvider>
  );
}

const MainApp = () => {
  const location = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  // New page (no #section) always starts at the top
  useEffect(() => {
    if (!location.hash) scrollToTop({ immediate: true });
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // GA4 page views. index.html sets send_page_view:false so the first load isn't counted twice.
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-HGGY56NJ90";
    if (typeof window.gtag !== "function") return;
    // small delay so react-helmet-async has updated document.title first
    const t = setTimeout(() => {
      window.gtag("config", measurementId, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }, 150);
    return () => clearTimeout(t);
  }, [location.pathname, location.search]);

  return (
    <div className="flex flex-col min-h-screen antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10002] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <RouteSEO />
      <SmoothScroll />
      <CinematicOverlay />
      <WelcomeAudio />
      <Header />

      <main id="main" className="flex-grow">
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="home"> <Home /> </section>
                <section id="testimonials"><Deferred order={7} minHeight="100vh"><Testimonials /></Deferred></section>
                <section id="faq"><Deferred order={8} minHeight="80vh"><FAQ /></Deferred></section>
                <section id="contact"><Deferred order={9} minHeight="100vh"><Contact /></Deferred></section>
              </>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/film-gallery" element={<FilmGallery />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermofCondition />} />

          {Object.entries(REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>

      <Deferred order={10} minHeight="0">
        <ScrollToTopCompo onVisibilityChange={setShowScrollButton} />
        <WhatsappButton showScrollButton={showScrollButton} />
      </Deferred>
      <Deferred order={11} minHeight="40vh">
        <Footer />
      </Deferred>
    </div>
  );
};




//Under Maintain

// import React from "react";
// import { HelmetProvider } from "react-helmet-async";
// import Maintenance from "./Pages/Maintenance"; 

// export default function App() {
//   return (
//     <HelmetProvider>
//       <Maintenance />
//     </HelmetProvider>
//   );
// }
