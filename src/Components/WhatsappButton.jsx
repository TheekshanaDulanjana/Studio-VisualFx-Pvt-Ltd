import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import whatsappDP from "../assets/WhatsappDP.png";
import WABD from "../assets/WABD.png";

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
      className={`fixed right-4 md:right-10 z-50  flex flex-col items-end transition-all duration-300 ease-in-out ${
        showScrollButton
          ? "bottom-[5.8rem] md:bottom-[6.2rem]"
          : "bottom-6 md:bottom-8"
      }`}
    >
      {/* Chat Popup */}
      <div
        className={`mb-4 transition-all  duration-300 ease-in-out origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          style={{
            backgroundImage: `url(${WABD})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="p-6 rounded-2xl shadow-lg shadow-black/30  w-[90vw] md:w-96 backdrop-blur-md overflow-hidden border border-white/20"
        >
          {/* Header Section */}
          <div className="-mx-6 -mt-6 mb-6 rounded-t-[2xl] bg-[#161717] px-6 py-3 border-b border-white/5 shadow-lg">
            <div className="flex items-center gap-3">
              <img
                src={whatsappDP}
                alt="Studio VisualFX"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="text-white font-roboto tracking-wide text-sm">
                  Studio VisualFX (PVT) Ltd
                </p>

                <p className="text-xs font-roboto text-[#21C063] flex items-center">
                  
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="relative mb-5 rounded-xl bg-[#161717] shadow-md shadow-black/30 border-l-2 border-[#21C063] p-4 text-sm leading-relaxed text-white">
            <p className="mb-1 font-semibold text-[#21C063]">Hi 👋</p>

            Welcome to Studio VisualFX.
            <br />
            How can we help you today?
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={openWhatsApp}
            className="flex w-full cursor-pointer shadow-md shadow-black/30 items-center justify-center gap-2.5 rounded-xl bg-[#21C063] py-3 font-roboto text-white  transition-all duration-300 hover:bg-green-700"
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