import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = ({ onVisibilityChange }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 600;

      setVisible(shouldShow);

      if (onVisibilityChange) {
        onVisibilityChange(shouldShow);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onVisibilityChange]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed
        right-4
        md:right-10
        bottom-6
        md:bottom-8
        z-50
        w-12
        h-12
        rounded-full
        bg-white
        text-black
        shadow-xl
        flex
        items-center
        justify-center
        transition-all
        duration-300
        hover:scale-110
        animate-fadeInUp
        cursor-pointer
      "
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollToTop;