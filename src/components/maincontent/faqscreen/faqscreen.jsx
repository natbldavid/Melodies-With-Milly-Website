// src/components/maincontent/faqscreen/faqscreen.jsx
import { useMemo, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { PiStarFourFill } from "react-icons/pi";
import { FiPlus, FiMinus } from "react-icons/fi";

// ---- Data: add/remove freely; UI adapts automatically ----
const FAQS = [
  {
    q: "How do I book a party for my child?",
    a: "Head over to the booking form and fill it out. We'll be in contact asap.",
  },
  {
    q: "What areas do you cover?",
    a: "We do all of London and all surrounding areas.",
  },
  {
    q: "Is there a limit to how many children can attend a party?",
    a: "There isn't a limit. But there will need to be extra entertainers for more children.",
  },
];

function FaqItem({ id, q, a, open, onToggle }) {
  return (
    <div className="relative rounded-3xl bg-white/40 backdrop-blur-[1.5px] border-2 border-pink-500 shadow px-5 sm:px-6 py-4 sm:py-5">
      {/* subtle deco */}
      <PiStarFourFill
        aria-hidden
        className="absolute -top-3 -left-2 text-pink-300/80 pointer-events-none"
        size={20}
      />

      {/* Header button */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        id={`faq-button-${id}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 text-left"
      >
        <span className="text-base sm:text-lg font-semibold text-pink-800">{q}</span>
        <span
          className={[
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
            "border-pink-500 text-pink-600 bg-white/70",
          ].join(" ")}
          aria-hidden
        >
          {open ? <FiMinus /> : <FiPlus />}
        </span>
      </button>

      {/* Collapsible answer (smooth height via CSS grid trick) */}
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-button-${id}`}
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "mt-3",
        ].join(" ")}
      >
        <div
          className={[
            "overflow-hidden border-t border-pink-200/60 pt-3",
            open ? "motion-safe:animate-[riseIn_360ms_cubic-bezier(.22,.61,.36,1)]" : "",
          ].join(" ")}
        >
          <p className="text-sm sm:text-base text-black/80">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqScreen({ id = "faqs" }) {
  // track which items are open by index
  const [openSet, setOpenSet] = useState(() => new Set());

  const items = useMemo(() => FAQS, []);

  const toggle = (i) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id={id} className="section pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Title bar (matches your other screens) */}
        <div className="relative mb-6 sm:mb-8">
          <div className="bg-pink-100 rounded-3xl py-5 sm:py-6 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-more font-bold text-[#95B3EA]">FAQs</h2>
          </div>

          {/* Subtle sparkles around the bar */}
          <PiStarFourFill
            aria-hidden
            className="absolute -top-3 left-20 text-pink-300/90 pointer-events-none hidden sm:block"
            size={28}
          />
          <HiOutlineSparkles
            aria-hidden
            className="absolute -top-5 left-8 text-pink-400 pointer-events-none hidden sm:block"
            size={34}
          />
          <HiOutlineSparkles
            aria-hidden
            className="absolute -bottom-4 right-10 text-pink-300/90 pointer-events-none hidden sm:block"
            size={32}
          />
        </div>

        {/* List */}
        <div className="space-y-4 sm:space-y-5">
          {items.map((item, i) => (
            <FaqItem
              key={item.q}
              id={i}
              q={item.q}
              a={item.a}
              open={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
