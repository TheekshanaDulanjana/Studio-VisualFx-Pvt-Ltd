import React, { useEffect } from 'react';
import logo from '../assets/StudioVisualFX.png';

const LoadingSpinner = () => {
  useEffect(() => {
    const styleId = 'logo-fast-zoom';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @keyframes fastZoom {
          0%, 100% { transform: scale(0.85); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) styleElement.remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-auto">
      <div className="relative">
        {/* Main Logo - Fast animation applied */}
        <img
          src={logo}
          alt="Studio Visual FX Logo"
          className="w-32 h-32 object-contain relative z-10"
          style={{
            animation: 'fastZoom 1.2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;