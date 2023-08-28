import { useEffect, useState } from "react";

function useMyScroll() {
  const [scrollDirection, setScrollDirection] = useState<"up"|"down" | null>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      setScrollTop(scrollY)
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return {scrollTop,scrollDirection};
}

export default useMyScroll;
