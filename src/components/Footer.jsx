import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Finax from "../assets/StudioVisualFX.png";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToSection, scrollToTop } from "../lib/scroll";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About Us", href: "/about" },
    { id: "film-gallery", label: "Our Films", href: "/film-gallery" },
    { id: "testimonials", label: "Testimonials", href: "/#testimonials" },
    { id: "faq", label: "FAQ", href: "/#faq" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ];

  const handleScroll = (id) => {
    if (id === "film-gallery" || id === "about") {
      navigate(`/${id}`);
      scrollToTop({ immediate: true });
      return;
    }

    if (location.pathname !== "/") {
      if (id === "home") {
        navigate("/");
        scrollToTop({ immediate: true });
      } else {
        navigate(`/#${id}`);
      }
      return;
    }

    if (id === "home") scrollToTop();
    else scrollToSection(id);
  };

  return (
    <footer className="text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 md:py-6">
        <div className="border-t border-gray-800"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mt-10">
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleScroll("home"); }}
              className="cursor-pointer rounded-lg"
              aria-label="Studio VisualFX - Home"
            >
              <img src={Finax} alt="Studio VisualFX" loading="lazy" className="w-24 md:w-28 mb-4 hover:opacity-80 transition-opacity" />
            </a>
            <p className="text-sm md:text-sm leading-relaxed font-roboto max-w-sm text-white/70">
              Studio VisualFX (Pvt) Ltd. brings your stories
              to life through cinematic creativity. Capturing moments,
              emotions, and experiences with passion, precision, and artistry.
            </p>
          </div>

          {/* Service Coverage */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-belleza text-lg mb-4">Service Coverage</h3>
            <ul className="space-y-2 text-sm md:text-sm font-roboto">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <p className="text-white/70 hover:text-white">Islandwide Across Sri Lanka</p>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <p className="text-white/70 hover:text-white">Matara (Main Hub)</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-belleza text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-sm font-roboto text-white/60">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleScroll(item.id); }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-belleza text-lg mb-4">Social Presence</h3>
            <ul className="space-y-2 text-sm md:text-sm font-roboto">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaWhatsapp className="shrink-0 text-white/70" />
                <a 
                  href="https://wa.me/94776996981" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white"
                >
                  Whatsapp
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaFacebookF className="shrink-0 text-white/70" />
                <a 
                  href="https://facebook.com/visualfxsl" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaInstagram className="shrink-0 text-white/70" />
                <a 
                  href="https://www.instagram.com/studiovisualfx/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaTiktok className="shrink-0 text-white/70" />
                <a 
                  href="https://www.tiktok.com/@studiovisualfx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white"
                >
                  Tik Tok
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaYoutube className="shrink-0 text-white/70" />
                <a 
                  href="https://www.youtube.com/@studiovisualfx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-belleza text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm md:text-sm font-roboto">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaPhone className="shrink-0 text-white/70" />
                <a href="tel:+94776996981" className="text-white/70 hover:text-white">+94 77 699 6981</a> 
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaEnvelope className="shrink-0 text-white/70" />
                <a href="mailto:svisualfx@gmail.com" className="min-w-0 break-all text-white/70 hover:text-white">svisualfx@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4 font-roboto">
            <p className="text-center md:text-left text-[10px] md:text-[10px] uppercase tracking-widest text-white/50">
              Copyright © {new Date().getFullYear()} Studio VisualFx (Pvt) Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate("/privacy-policy"); scrollToTop({ immediate: true }); }} className="text-white/50 cursor-pointer hover:text-white text-[9px] md:text-[10px] uppercase tracking-wider">
                Privacy Policy
              </a>
              <a href="/terms-conditions" onClick={(e) => { e.preventDefault(); navigate("/terms-conditions"); scrollToTop({ immediate: true }); }} className="text-white/50 hover:text-white cursor-pointer text-[9px] md:text-[10px] uppercase tracking-wider">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}