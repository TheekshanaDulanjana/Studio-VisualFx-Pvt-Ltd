import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Logo from "../assets/StudioVisualFX.png";
import LogoBlack from "../assets/StudioVisualFXBlack.png";

const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About Us", path: "/about" },
  { id: "film-gallery", label: "Our Films", path: "/film-gallery" },
  { id: "testimonials", label: "Testimonials", path: "/#testimonials" },
  { id: "faq", label: "FAQ", path: "/#faq" },
  { id: "contact", label: "Contact", path: "/#contact" },
];

const ROUTE_IDS = new Set(["about", "film-gallery"]);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = useRef(0);

  // Ultra smooth luxury easing curve
  const luxuryEase = [0.16, 1, 0.3, 1];

  // Lock body scroll while menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  // Hide header while scrolling down and detect scroll position for theme change
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Check if user has scrolled away from the very top
      if (currentY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Show / Hide header based on scroll direction
      if (currentY <= 0) {
        setShowHeader(true);
      } else if (currentY < lastScrollY.current) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goTo = useCallback(
    (id) => {
      setIsMenuOpen(false);

      if (ROUTE_IDS.has(id)) {
        navigate(`/${id}`);
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
        return;
      }

      if (id === "home") {
        navigate("/");
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
        return;
      }

      const hash = `#${id}`;

      if (location.pathname !== "/") {
        navigate(`/${hash}`);
      } else {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          window.history.replaceState({}, "", hash);
        }
      }
    },
    [navigate, location.pathname]
  );

  const goToCommercial = useCallback(() => {
    setIsMenuOpen(false);

    navigate("/commercial");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [navigate]);

  // Framer motion variants for mobile menu stagger
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: luxuryEase,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: luxuryEase,
      },
    },
  };

  const navListVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, y: 25 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: luxuryEase,
      },
    },
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pointer-events-none transition-all duration-500 ease-out will-change-transform ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-white shadow-md py-3" : "pt-6 bg-transparent"}`}
      >
        <div className="pointer-events-auto mx-4 flex max-w-7xl items-center justify-between px-4 py-1 sm:px-6 lg:mx-auto lg:px-8 transition-all duration-300">
          
          {/* Logo with dynamic source swap */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: luxuryEase }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goTo("home")}
            className="touch-manipulation cursor-pointer flex items-center"
          >
            <img
              src={isScrolled ? LogoBlack : Logo}
              alt="Studio Visual FX"
              className="h-10 w-auto transition-all duration-300"
            />
          </motion.button>

          {/* Desktop Nav Items */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: luxuryEase }}
            className={`hidden space-x-8 font-roboto lg:flex xl:space-x-10 transition-colors duration-300 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            {NAV_ITEMS.map(({ id, label }) => (
              <motion.button
                key={id}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2, ease: luxuryEase }}
                onClick={() => goTo(id)}
                className="touch-manipulation cursor-pointer text-sm uppercase tracking-widest transition-all duration-200 hover:font-semibold xl:text-xs"
              >
                {label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Commercial Button with inverted theme on scroll */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: luxuryEase }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={goToCommercial}
            className={`group hidden touch-manipulation items-center gap-3 rounded-full px-4 py-2 text-sm transition-all duration-300 lg:flex cursor-pointer border ${
              isScrolled
                ? "bg-black text-white hover:bg-white hover:text-black border-black"
                : "bg-white text-black hover:bg-black hover:text-white border-transparent"
            }`}
          >
            <span className="font-roboto">Commercial</span>

            <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
              isScrolled
                ? "bg-white group-hover:bg-black"
                : "bg-black group-hover:bg-white"
            }`}>
              <FaArrowRight className={`text-xs transition-all ${
                isScrolled
                  ? "text-black group-hover:text-white"
                  : "text-white group-hover:text-black"
              }`} />
            </span>
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: luxuryEase }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
            className={`touch-manipulation rounded-full p-2 transition lg:hidden cursor-pointer ${
              isScrolled ? "hover:bg-black/10" : "hover:bg-white/10"
            }`}
          >
            <Menu className={`h-6 w-6 transition-colors duration-300 ${
              isScrolled ? "text-black" : "text-white"
            }`} />
          </motion.button>
        </div>
      </header>

      {/* Mobile & Tablet Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[999] lg:hidden pointer-events-auto"
          >
            {/* Background Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: luxuryEase }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md transform-gpu" 
            />

            {/* Menu Content */}
            <div className="relative flex h-full flex-col px-6 py-8 font-roboto text-white transform-gpu">
              
              {/* Drawer Top Row */}
              <div className="flex items-center justify-between">
                <img
                  src={Logo}
                  alt="Studio Visual FX"
                  className="h-10"
                />

                <motion.button
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close Menu"
                  className="touch-manipulation rounded-full border border-white/30 p-2 transition hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Navigation Links Stagger */}
              <motion.nav 
                variants={navListVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-1 flex-col items-center justify-center space-y-7"
              >
                {NAV_ITEMS.map(({ id, label }) => (
                  <motion.button
                    key={id}
                    variants={navItemVariants}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goTo(id)}
                    className="touch-manipulation text-base uppercase tracking-widest transition-transform duration-200 cursor-pointer"
                  >
                    {label}
                  </motion.button>
                ))}
              </motion.nav>

              {/* Drawer Bottom Commercial Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3, ease: luxuryEase }}
                className="mb-6 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={goToCommercial}
                  className="flex h-12 w-40 touch-manipulation items-center justify-center gap-4 rounded-full bg-white px-4 py-3 text-black transition-transform duration-200 cursor-pointer"
                >
                  <span className="font-roboto text-sm">Commercial</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                    <FaArrowRight className="text-sm text-white" />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;