import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import whatsappDP from "../assets/WhatsappDP.png";

const WhatsappWidget = ({ showScrollButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "94776996981";
  const message = "Hi! I would like to get some information.";

  const openWhatsApp = () => {
    const fullMessage = `${message}\n\n--- Message from website ---`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`fixed z-50 flex flex-col items-end gap-4 right-4 md:right-10 ${showScrollButton ? "bottom-[5.5rem]" : "bottom-6 md:bottom-8"}`}>
      {/* Modal */}
      {isOpen && (
        <div className="p-6 bg-black bg-gradient-to-tr from-white/15 to-transparent rounded-2xl shadow-2xl w-[90vw] md:w-96 border border-white/50 transition-all duration-300 ease-in-out animate-fadeIn">
          <div className="flex items-center gap-3 mb-5">
            <img 
              src={whatsappDP} 
              alt="Studio VisualFX" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-roboto text-base">Studio VisualFX (PVT) Ltd</p>
              <p className="text-xs font-roboto text-green-400 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online
              </p>
            </div>
          </div>
          
          <div className="bg-[#161717] p-4 rounded-xl mb-5 text-white text-sm leading-relaxed relative before:content-[''] before:absolute before:left-3 before:-top-2 before:w-4 before:h-4 before:bg-[#161717] before:rotate-45 before:clip-path-triangle">
            <p className="font-roboto font-semibold text-green-300 mb-1">Hi 👋</p>
            Welcome to Studio VisualFX.<br />
            How can we help you today?
          </div>
          
          <button 
            onClick={openWhatsApp}
            className="w-full bg-green-600 text-white py-3 rounded-xl cursor-pointer font-roboto flex items-center justify-center gap-2.5 hover:bg-green-700 transition-colors shadow-md"
          >
            <FaWhatsapp className="text-xl" /> Start Chat
          </button>
        </div>
      )}

      {/* WhatsApp button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 flex cursor-pointer items-center justify-center rounded-full bg-white text-black hover:bg-green-500 hover:text-white transition-all hover:scale-105"
      >
        <FaWhatsapp className="text-2xl" />
      </button>
    </div>
  );
};

export default WhatsappWidget;