import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappButton from "./components/WhatsappButton";
import ScrollToTopCompo from "./components/ScrollToTopCompo";
import SmoothScroll from "./components/SmoothScroll";

// SEO
import RouteSEO from "./seo/RouteSEO";
import { REDIRECTS } from "./seo/seo.config";

// Pages path
import Home from "./Pages/Home";
import About from "./Pages/About";
import FAQ from "./Pages/Faq";
import Contact from "./Pages/Contact";
import FilmGallery from "./Pages/FilmGallery";
import Commercial from "./Pages/Commercial";
import Testimonials from "./Pages/Testimonials";
import TermofCondition from "./Pages/TermofCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import NotFound from "./Pages/NotFound";

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
      <RouteSEO />
      <SmoothScroll />
      <Header />

      <main className="flex-grow">
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
