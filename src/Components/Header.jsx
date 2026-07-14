import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Logo from "../assets/StudioVisualFX.png";

const resetScrollPosition = () => {
  if (typeof window === 'undefined') return;

  window.scrollTo(0, 0);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.scrollingElement?.scrollTo(0, 0);
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Handle body overflow when mobile menu is open
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMenuOpen]);

  useEffect(() => {
    // Scroll listener for header show/hide
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        // At top, always show
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down, hide header
        setShowHeader(false);
      } else {
        // Scrolling up, show header
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);

    resetScrollPosition();

    if (id === "about") {
      navigate("/about");
      return;
    }

    if (id === "film-gallery") {
      navigate("/film-gallery");
      return;
    }

    const hash = `#${id}`;

    if (location.pathname !== "/") {
      navigate(`/${hash}`);
    } else {
      window.history.pushState(null, "", hash);
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "film-gallery", label: "Our Films" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/*DESKTOP HEADER*/}
      <header
        className={`fixed top-0 left-0 right-0 pt-6 z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-4 lg:mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <img src={Logo} alt="Studio Visual FX" className="h-10 w-auto" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 xl:space-x-10 text-white  font-roboto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-white cursor-pointer transition-colors duration-200 text-sm xl:text-xs hover:font-semibold uppercase tracking-widest relative"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => {
              resetScrollPosition();
              navigate("/commercial");
            }}
            className="group hidden lg:flex items-center gap-3 bg-white 
                        text-black px-4 py-2 rounded-full 
                       hover:bg-black hover:text-white 
                       transition-all duration-200 text-sm xl:text-sm  cursor-pointer"
          >
            <span className="font-roboto">Commercial</span>
            <span className="flex items-center justify-center w-6 h-6 bg-black rounded-full group-hover:bg-white transition">
              <FaArrowRight className="text-white text-xs group-hover:text-black transition" />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition"
          >
            <Menu className="w-6 h-6  text-white" />
          </button>
        </div>
      </header>

      {/*MOBILE */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

        {/* Content */}
        <div className="relative flex flex-col h-full px-6 py-8 font-roboto text-white">
          {/* Top */}
          <div className="flex items-center justify-between">
            <img src={Logo} alt="Studio Visual FX" className="h-10" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 flex flex-col justify-center items-center space-y-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group text-sm  font-roboto tracking-widest uppercase transition-all"
              >
                <span className=" transition">
                  {item.label}
                </span>
                <span className="absolute left-0 -bottom-2 w-0 h-0.5  group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="mb-6 items-center justify-center flex">
            <button
              onClick={() => {
                resetScrollPosition();
                navigate("/commercial");
              }}
              className="w-40 h-12 flex items-center justify-center gap-4 
                         bg-white text-black 
                         px-4 py-3 rounded-full 
                         hover:bg-white transition-all duration-300"
            >
              <span className="text-sm  font-roboto">Commercial</span>
              <span className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                <FaArrowRight className="text-white text-sm" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
