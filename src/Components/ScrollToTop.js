import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const resetScrollPosition = () => {
  if (typeof window === 'undefined') return;

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  window.scrollTo(0, 0);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.scrollingElement?.scrollTo(0, 0);

  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    window.lenis.scrollTo(0, { immediate: true });
  }
};

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    resetScrollPosition();

    const handlePageShow = () => resetScrollPosition();
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    resetScrollPosition();

    const frameId = window.requestAnimationFrame(() => resetScrollPosition());
    const timeoutId = window.setTimeout(() => resetScrollPosition(), 50);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  return null;
}