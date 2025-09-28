// src/hooks/useRevealSections.js
import { useEffect, useRef } from "react";

/**
 * Visually hides all sections except the first via CSS (you'll add the CSS rules),
 * then reveals each section with a smooth fade+rise when:
 *  - it enters the viewport while scrolling DOWN, or
 *  - the user jumps to it from the navbar (even if jumping upward),
 *  - or the page loads on a deep link (#packages).
 *
 * This hook does not change layout or your existing markup.
 */
export default function useRevealSections(sectionIds) {
  const revealed = useRef(new Set());     // ids already revealed
  const allowAnyDir = useRef(new Set());  // ids allowed to reveal regardless of direction
  const lastY = useRef(0);
  const dir = useRef("down");

  // Track scroll direction
  useEffect(() => {
    lastY.current = window.pageYOffset || 0;
    const onScroll = () => {
      const y = window.pageYOffset || 0;
      dir.current = y > lastY.current ? "down" : y < lastY.current ? "up" : dir.current;
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const reveal = (el) => {
      const id = el.id;
      if (revealed.current.has(id)) return;
      revealed.current.add(id);
      el.classList.add("reveal-visible");
    };

    // Observe sections (except the first, which is visible immediately)
    const io = new IntersectionObserver(
      (entries) => {
        if (prefersReduced) {
          // With reduced motion, reveal as soon as they intersect the first time
          for (const e of entries) if (e.isIntersecting) reveal(e.target);
          return;
        }
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          const canReveal = dir.current === "down" || allowAnyDir.current.has(id);
          if (canReveal) {
            reveal(e.target);
            io.unobserve(e.target);
            allowAnyDir.current.delete(id);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el, i) => {
      if (i === 0) {
        // ensure the first section is visible (the CSS only hides below-first)
        el.classList.add("reveal-visible");
      } else {
        io.observe(el);
      }
    });

    // Handle deep link on initial load and browser back/forward
    const forceFromHash = () => {
      const id = window.location.hash?.slice(1);
      if (!id || !sectionIds.includes(id)) return;
      allowAnyDir.current.add(id);
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      // If it's already within viewport, reveal immediately
      if (r.top < window.innerHeight && r.bottom > 0) {
        reveal(el);
        io.unobserve(el);
        allowAnyDir.current.delete(id);
      }
    };
    forceFromHash();
    const onPop = () => forceFromHash();
    window.addEventListener("popstate", onPop);

    // Listen for navbar jumps
    const onForce = (ev) => {
      const id = ev.detail?.id;
      if (!id) return;
      allowAnyDir.current.add(id);
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      // If the target is (already) within viewport, reveal now
      if (r.top < window.innerHeight && r.bottom > 0) {
        reveal(el);
        io.unobserve(el);
        allowAnyDir.current.delete(id);
      }
    };
    document.addEventListener("reveal:force", onForce);

    return () => {
      io.disconnect();
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("reveal:force", onForce);
    };
  }, [sectionIds.join("|")]);
}
