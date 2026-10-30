import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappButton from "./components/WhatsappButton";
import ScrollToTopCompo from "./components/ScrollToTopCompo";
import SmoothScroll from "./components/SmoothScroll";
import CinematicOverlay from "./components/CinematicOverlay";
import WelcomeAudio from "./components/WelcomeAudio";
import { scrollToTop } from "./lib/scroll";

// SEO
import RouteSEO from "./seo/RouteSEO";
import { REDIRECTS } from "./seo/seo.config";

// Pages path
import Home from "./Pages/Home";
import FAQ from "./Pages/Faq";
import Contact from "./Pages/Contact";
import Testimonials from "./Pages/Testimonials";

// Other pages load on demand (smaller first download for the home page)
const About = lazy(() => import("./Pages/About"));
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
                <section id="testimonials"> <Testimonials /></section>
                <section id="faq"> <FAQ /> </section>
                <section id="contact"> <Contact /> </section>
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

      <ScrollToTopCompo onVisibilityChange={setShowScrollButton} />
      <WhatsappButton showScrollButton={showScrollButton} />
      <Footer />
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
