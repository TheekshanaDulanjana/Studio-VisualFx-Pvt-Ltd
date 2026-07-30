import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Logo from "../assets/StudioVisualFX.png";

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

  const lastScrollY = useRef(0);

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

  // Hide header while scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pointer-events-none pt-6 transition-transform duration-300 ease-out will-change-transform ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="pointer-events-auto mx-4 flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:mx-auto lg:px-8">
          <button
            onClick={() => goTo("home")}
            className="touch-manipulation cursor-pointer flex items-center"
          >
            <img
              src={Logo}
              alt="Studio Visual FX"
              className="h-10 w-auto"
            />
          </button>

          <nav className="hidden space-x-8 font-roboto text-white lg:flex xl:space-x-10">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className="touch-manipulation cursor-pointer text-sm uppercase tracking-widest transition-all duration-200 hover:font-semibold xl:text-xs"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={goToCommercial}
            className="group hidden touch-manipulation items-center gap-3 rounded-full bg-white px-4 py-2 text-sm text-black transition-all duration-300 hover:bg-black hover:text-white lg:flex"
          >
            <span className="font-roboto">Commercial</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black transition-all group-hover:bg-white">
              <FaArrowRight className="text-xs text-white transition-all group-hover:text-black" />
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
            className="touch-manipulation rounded-full p-2 transition hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      <div
        className={`fixed inset-0 z-[999] transition-opacity duration-200 ease-out lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/90 transform-gpu" />

        {/* Menu Content */}
        <div
          className={`relative flex h-full flex-col px-6 py-8 font-roboto text-white transition-transform duration-200 ease-out transform-gpu ${
            isMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <img
              src={Logo}
              alt="Studio Visual FX"
              className="h-10"
            />

            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Menu"
              className="touch-manipulation rounded-full border border-white/30 p-2 transition hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center space-y-7">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className="touch-manipulation text-sm uppercase tracking-widest transition-transform duration-200 active:scale-95"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="mb-6 flex justify-center">
            <button
              onClick={goToCommercial}
              className="flex h-12 w-40 touch-manipulation items-center justify-center gap-4 rounded-full bg-white px-4 py-3 text-black transition-transform duration-200 active:scale-95"
            >
              <span className="font-roboto text-sm">Commercial</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                <FaArrowRight className="text-sm text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;