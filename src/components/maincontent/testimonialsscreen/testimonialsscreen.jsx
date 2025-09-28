// src/components/maincontent/testimonialsscreen/testimonialsscreen.jsx
import { useMemo, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { PiStarFourFill } from "react-icons/pi";
import { FaStar, FaRegStar } from "react-icons/fa";

// ---- Data: add / remove freely; UI adapts automatically ----
const TESTIMONIALS = [
  { rating: 5, name: "Sophie H.", review: "Milly made our daughters 3rd birthday so special! I know even some of the Mums felt emotional listening to her sing. She is in an incredibly good singer, performer and entertainer! Her attention to detail leading up to the party is amazing...so helpful, collaborative and reliable! Thank you!" },
  { rating: 5, name: "Emma R.", review: "Super professional and so much fun. Best party decision we made." },
  { rating: 4, name: "Liam W.", review: "Great energy and lovely singing. Would definitely book again." },
  { rating: 5, name: "Priya K.", review: "Our little one was starstruck. Seamless from booking to the big day!" },
  { rating: 5, name: "James M.", review: "They went above and beyond to make it special—thank you!" },
  { rating: 4, name: "Amelia T.", review: "Brilliant games and so engaging with every child." },
  { rating: 5, name: "Charlotte P.", review: "The coronation moment was unforgettable. Highly recommend." },
  { rating: 5, name: "Ben C.", review: "Slick, friendly, and full of sparkle. Five stars!" },
  { rating: 5, name: "Nadia A.", review: "The whole room was smiling. Perfect mix of song and games." },
];

// ---- Presentational bits ----
function StarRating({ rating = 0 }) {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i < rating), [rating]);
  return (
    <div className="flex items-center gap-1 text-pink-600" aria-label={`${rating} out of 5 stars`}>
      {stars.map((filled, i) =>
        filled ? <FaStar key={i} aria-hidden /> : <FaRegStar key={i} aria-hidden />
      )}
    </div>
  );
}

function TestimonialCard({ t, animatedIn }) {
  return (
    <div
      className={[
        "relative rounded-3xl p-5 sm:p-6 lg:p-7",
        "bg-white/40 backdrop-blur-[1.5px]",
        "border-2 border-pink-500",
        "shadow",
        animatedIn ? "motion-safe:animate-[riseIn_420ms_cubic-bezier(.22,.61,.36,1)]" : "",
      ].join(" ")}
    >
      {/* Decorative sparkles (subtle) */}
      <PiStarFourFill
        aria-hidden
        className="absolute -top-3 -right-2 text-pink-300/80 pointer-events-none"
        size={22}
      />

      {/* Stars */}
      <StarRating rating={t.rating} />

      {/* Review text */}
      <p className="mt-3 text-sm sm:text-base text-black/80">{t.review}</p>

      {/* Name */}
      <p className="mt-4 font-semibold text-pink-800">— {t.name}</p>
    </div>
  );
}

// ---- Screen ----
export default function TestimonialsScreen({ id = "testimonials" }) {
  // show 3 at a time; "Show More" reveals the next 3; "Show Less" returns to 3
  const PAGE_SIZE = 3;
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [animateFrom, setAnimateFrom] = useState(0); // first index that should animate-in this round

  const items = TESTIMONIALS.slice(0, visible);
  const remaining = TESTIMONIALS.length - visible;
  const canShowMore = remaining > 0;
  const canShowLess = visible > PAGE_SIZE;

  const onShowMore = () => {
    setAnimateFrom(visible);
    setVisible((v) => Math.min(v + PAGE_SIZE, TESTIMONIALS.length));
  };

  const onShowLess = () => {
    setAnimateFrom(0);
    setVisible(PAGE_SIZE);
  };

  return (
    <section id={id} className="section pt-12 pb-12 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Title bar (matches your other screens) */}
        <div className="relative mb-6 sm:mb-8">
          <div className="bg-pink-100 rounded-3xl py-5 sm:py-6 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-more font-bold text-[#95B3EA]">Testimonials</h2>
          </div>

          {/* Subtle sparkles around the bar */}
          <PiStarFourFill aria-hidden className="absolute -top-3 left-20 text-pink-300/90 pointer-events-none hidden sm:block" size={28} />
          <HiOutlineSparkles aria-hidden className="absolute -top-5 left-8 text-pink-400 pointer-events-none hidden sm:block" size={34} />
          <HiOutlineSparkles aria-hidden className="absolute -bottom-4 right-10 text-pink-300/90 pointer-events-none hidden sm:block" size={32} />
        </div>

        {/* Grid: 1 / 2 / 3 columns */}
        <div
          id="testimonials-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {items.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} animatedIn={i >= animateFrom} />
          ))}
        </div>

        {/* Controls */}
        {(canShowMore || canShowLess) && (
          <div className="mt-6 flex items-center justify-center gap-3">
            {canShowMore && (
              <button
                type="button"
                onClick={onShowMore}
                className="rounded-2xl px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                aria-controls="testimonials-grid"
              >
                Show More{remaining > PAGE_SIZE ? ` (${Math.min(PAGE_SIZE, remaining)} more)` : ""}
              </button>
            )}
            {canShowLess && (
              <button
                type="button"
                onClick={onShowLess}
                className="rounded-2xl px-5 py-2.5 bg-white/70 hover:bg-white/90 text-pink-700 border-2 border-pink-500 font-medium focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
                aria-controls="testimonials-grid"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
