import { useState, useEffect } from 'react';

export interface Breakpoints {
  isMobile:  boolean;  // < 768px
  isTablet:  boolean;  // 768-1023px
  isDesktop: boolean;  // >= 1024px
  width: number;
}

export function useResponsive(): Breakpoints {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    function handler() { setWidth(window.innerWidth); }
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  return {
    isMobile:  width < 768,
    isTablet:  width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
}
