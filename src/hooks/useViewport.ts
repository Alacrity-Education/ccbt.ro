"use client";
import { useState, useEffect } from "react";

interface ViewportState {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useViewport(): ViewportState {
  const [state, setState] = useState<ViewportState>({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setState({
        width: w,
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
        isDesktop: w >= 1024,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return state;
}
