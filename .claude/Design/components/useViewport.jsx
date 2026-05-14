// useViewport.jsx — exposes window.useViewport() returning { width, isMobile, isTablet, isDesktop }
function useViewport() {
  const get = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1440;
    return { width: w, isMobile: w < 768, isTablet: w >= 768 && w < 1024, isDesktop: w >= 1024 };
  };
  const [vp, setVp] = React.useState(get);
  React.useEffect(() => {
    const onResize = () => setVp(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vp;
}
window.useViewport = useViewport;
