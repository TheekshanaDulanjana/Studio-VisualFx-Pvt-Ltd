import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Finax from "../assets/StudioVisualFX.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "film-gallery", label: "Our Films" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const handleScroll = (id) => {
    if (id === "film-gallery") {
      navigate("/film-gallery");
      window.scrollTo(0, 0); 
      return;
    }

    if (id === "about") {
      navigate("/about");
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 800);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="text-white  ">
      <div className="max-w-7xl mx-auto px-6  lg:px-0 md:py-6">
        <div className="border-t border-gray-800"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mt-10">
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <img src={Finax} alt="Logo" className="w-24 md:w-28 mb-4" />
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
                <p className="text-white/70 hover:text-white">Matara, Sri Lanka</p>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <p className="text-white/70 hover:text-white">Colombo, Sri Lanka </p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-belleza text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-sm font-roboto text-white/60">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleScroll(item.id)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence */}
          <div className="text-center md:text-left">
  <h3 className="text-white font-belleza text-lg mb-4">Social Presence</h3>
  <ul className="space-y-2 text-sm md:text-sm font-roboto">
    <li className="flex items-center justify-center md:justify-start gap-3">
      <FaWhatsapp className="text-white/70" />
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
      <FaFacebookF className="text-white/70" />
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
      <FaInstagram className="text-white/70" />
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
      <FaTiktok className="text-white/70" />
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
      <FaYoutube className="text-white/70" />
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
                <FaPhone className="text-white/70" />
                <a href="tel:+94719896981" className="text-white/70 hover:text-white">94 71 989 6981</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaEnvelope className="text-white/70" />
                <a href="mailto:svisualfx@gmail.com" className="text-white/70 hover:text-white">svisualfx@gmail.com</a>
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
              <button onClick={() => { navigate("/privacy-policy"); window.scrollTo(0,0); }} className="text-white/50 cursor-pointer hover:text-white text-[9px] md:text-[10px] uppercase tracking-wider ">
                Privacy Policy
              </button>
              <button onClick={() => { navigate("/terms-conditions"); window.scrollTo(0,0); }} className="text-white/50 hover:text-white cursor-pointer text-[9px] md:text-[10px] uppercase tracking-wider">
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}