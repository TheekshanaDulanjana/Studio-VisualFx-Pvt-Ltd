import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollButton(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowScrollButton(false), 10000);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showScrollButton && (
      <button
        onClick={scrollToTop}
        className="fixed cursor-pointer rounded-full bottom-8 right-10 w-10 h-10 flex items-center justify-center bg-white text-black transition-transform transform hover:scale-110 group z-60 overflow-hidden"
        aria-label="Scroll to top"
      >
        <span className="relative z-10 transition-colors duration-300">
          <FaArrowUp className="text-sm font-bold" />
        </span>
      </button>
    )
  );
};

export default ScrollToTop;
