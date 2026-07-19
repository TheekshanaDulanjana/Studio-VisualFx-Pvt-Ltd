import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import whatsappDP from "../assets/WhatsappDP.png";

const WhatsappWidget = ({ showScrollButton }) => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "94776996981";
  const message = "Hi! I would like to get some information.";

  const openWhatsApp = () => {
    const fullMessage = `${message}\n\n--- Message from website ---`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div
      className={`fixed right-4 md:right-10 z-50 flex flex-col items-end transition-all duration-300 ease-in-out ${
        showScrollButton
          ? "bottom-[5.8rem] md:bottom-[6.2rem]"
          : "bottom-6 md:bottom-8"
      }`}
    >
      {/* Chat Popup */}
      <div
        className={`mb-4 transition-all duration-300 ease-in-out origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-6 bg-black bg-gradient-to-tr from-white/15 to-transparent rounded-2xl shadow-2xl w-[90vw] md:w-96 border border-white/50 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-5">
            <img
              src={whatsappDP}
              alt="Studio VisualFX"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="text-white font-roboto text-base">
                Studio VisualFX (PVT) Ltd
              </p>

              <p className="text-xs font-roboto text-green-400 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Online
              </p>
            </div>
          </div>

          <div className="relative mb-5 rounded-xl bg-[#161717] p-4 text-sm leading-relaxed text-white">
            <p className="mb-1 font-semibold text-green-300">Hi 👋</p>

            Welcome to Studio VisualFX.
            <br />
            How can we help you today?
          </div>

          <button
            onClick={openWhatsApp}
            className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-green-600 py-3 font-roboto text-white shadow-md transition-all duration-300 hover:bg-green-700"
          >
            <FaWhatsapp className="text-xl" />
            Start Chat
          </button>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-xl transition-all duration-300 hover:scale-110 hover:bg-green-500 hover:text-white"
      >
        <FaWhatsapp className="text-2xl" />
      </button>
    </div>
  );
};

export default WhatsappWidget;