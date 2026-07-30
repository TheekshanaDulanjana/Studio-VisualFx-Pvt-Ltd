import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

 // Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import WhatsappButton from "./components/WhatsappButton";
import ScrollToTopCompo from "./components/ScrollToTopCompo";
import SmoothScroll from "./components/Smoothscroll";

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

//import Maintenance from "./Pages/Maintenance";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        {loading ? <LoadingSpinner /> : <MainApp />}
      </BrowserRouter>
    </HelmetProvider>
  );

}

const MainApp = () => {
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (typeof window.gtag === "function" && measurementId) {
      window.gtag("config", measurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Page loading spinner logic
  useEffect(() => {
    setPageLoading(true);
    const endTimer = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => clearTimeout(endTimer);
  }, [location.pathname]);

  // Tab Title change all the logic
  useEffect(() => {
    const pageTitles = {
      "/": "Home | Studio VisualFX",
      "/about": "About Us | Studio VisualFX",
      "/film-gallery": "Film Gallery | Studio VisualFX",
      "/commercial": "Commercial Projects | Studio VisualFX",
      "/testimonials": "Testimonials | Studio VisualFX",
      "/faq": "FAQ | Studio VisualFX",
      "/contact": "Contact Us | Studio VisualFX",
      "/privacy-policy": "Privacy Policy | Studio VisualFX",
      "/terms-conditions": "Terms & Conditions | Studio VisualFX",
    };

    document.title = pageTitles[location.pathname] || "Studio VisualFX";
  }, [location.pathname]);

  return (
    <>

      <div className="flex flex-col min-h-screen antialiased">
      <SmoothScroll/>

        {pageLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex flex-col min-h-screen antialiased">
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
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>

               <ScrollToTopCompo onVisibilityChange={setShowScrollButton}
      /> 
              <WhatsappButton showScrollButton={showScrollButton} /> 
              <Footer />
            </div>
          </>
        )}
      </div>
    </>
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
