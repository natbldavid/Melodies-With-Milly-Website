// src/hooks/useActiveSection.js
import { useEffect, useState } from "react";

/**
 * Highlights the section whose TOP is at/above the header line and closest to it.
 * Uses scroll/resize measurement (not IntersectionObserver), so it works even if
 * sections start visibility:hidden for your reveal animation.
 */
export default function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const header = document.querySelector("[data-app-header]");
    const getHeaderPx = () => header?.offsetHeight ?? 96; // match your header height

    let ticking = false;

    const calc = () => {
      const headerPx = getHeaderPx();

      let current = sectionIds[0] ?? null;
      let bestTop = -Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // distance from section top to the line right under the header
        const topRelativeToHeader = rect.top - headerPx;

        // choose the deepest section whose top is <= header line
        if (topRelativeToHeader <= 1 && rect.top > bestTop) {
          bestTop = rect.top;
          current = id;
        }
      }

      // If none crossed yet (e.g., at very top), keep the first.
      setActiveId(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        calc();
      });
    };

    const onResize = () => calc();

    // initial run (covers deep-link after your instant scroll)
    calc();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [sectionIds.join("|")]);

  return activeId;
}
