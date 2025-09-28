// src/components/navbar/navbar.jsx
import { useMemo } from "react";
import useActiveSection from "../../hooks/useActiveSection";

const baseClasses = "block px-4 py-2 text-base transition-colors";
const activeClasses = "underline underline-offset-4 decoration-2";
const inactiveClasses = "hover:underline hover:underline-offset-4 hover:decoration-2";

const links = [
  { to: "#home", label: "Home" },
  { to: "#packages", label: "Packages" },
  { to: "#about", label: "About" },
  { to: "#characters", label: "Characters"},
  { to: "#testimonials", label: "Testimonials" },
  { to: "#faqs", label: "FAQS" },
  { to: "#contact", label: "Contact" },
];

// ---- smooth scroller (duration is configurable) ----
function smoothScrollTo(el, offsetPx = 0, durationMs = 900) {
  // accessibility: respect prefers-reduced-motion
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - offsetPx;
    window.scrollTo(0, y);
    return;
  }

  const startY = window.pageYOffset;
  const targetY = el.getBoundingClientRect().top + startY - offsetPx;

  const distance = targetY - startY;
  const startTime = performance.now();

  // easeInOutCubic
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / durationMs);
    const eased = ease(t);
    window.scrollTo(0, startY + distance * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Navbar({ onNavigate }) {
  const sectionIds = useMemo(() => links.map((l) => l.to.slice(1)), []);
  const activeId = useActiveSection(sectionIds);

  const handleClick = (e, hash) => {
    e.preventDefault();

    const el = document.querySelector(hash);
    if (!el) return;

    // close mobile menu if provided
    onNavigate?.();

    // 👉 Tell the reveal system which ID we're jumping to
    document.dispatchEvent(new CustomEvent("reveal:force", { detail: { id: hash.slice(1) } }));

    // header offset
    const header = document.querySelector("[data-app-header]");
    const headerPx = header?.offsetHeight ?? 96;

    // smooth scroll with custom duration
    smoothScrollTo(el, headerPx, 900); // <- tweak duration here

    // update URL hash without jump (so deep linking still works)
    history.pushState(null, "", `/${hash}`);
  };

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ to, label }) => {
        const id = to.slice(1);
        const isActive = activeId === id;

        return (
          <a
            key={to}
            href={to}
            className={[baseClasses, isActive ? activeClasses : inactiveClasses].join(" ")}
            aria-current={isActive ? "page" : undefined}
            onClick={(e) => handleClick(e, to)}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
