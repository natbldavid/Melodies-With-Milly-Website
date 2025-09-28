// src/components/maincontent/packagesscreen/packagesscreen.jsx
import { useMemo, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { PiStarFourFill } from "react-icons/pi";
import { FiCheck } from "react-icons/fi";

const TIERS_ORDER = ["Platinum", "Gold", "Silver", "Bronze"];

// Content (tweak freely)
const DATA = {
  one: {
    label: "One Entertainer Packages",
    tiers: {
      Platinum: {
        blurb: "The full fairytale experience.",
        features: [
          "Grand entrance + princess introduction",
          "Party games & dancing",
          "A live song from your chosen character",
          "Pass the Parcel (with prizes)",
          "Bubbles & ribbon wands",
          "Birthday coronation & tiara",
          "Photo time + farewell parade",
        ],
      },
      Gold: {
        blurb: "Big energy, big smiles.",
        features: [
          "Princess introduction",
          "Party games & dancing",
          "A live song",
          "Pass the Parcel",
          "Bubbles",
        ],
      },
      Silver: {
        blurb: "Core activities for smaller groups.",
        features: [
          "Princess hello & meet",
          "Party games",
          "Mini singalong",
          "Bubbles",
        ],
      },
      Bronze: {
        blurb: "Short & sweet visit.",
        features: ["Character meet & greet", "Photo time", "Happy Birthday singalong"],
      },
    },
  },
  two: {
    label: "Two Entertainer Packages",
    tiers: {
      Platinum: {
        blurb: "Double the magic. Perfect for larger parties.",
        features: [
          "Two-character grand entrance",
          "Games & dance duos",
          "Two live songs",
          "Pass the Parcel",
          "Bubbles & extras",
          "Mini show moment",
        ],
      },
      Gold: {
        blurb: "Dynamic duo—crowd pleaser.",
        features: [
          "Two-character welcome",
          "Games & dancing",
          "One live duet",
          "Pass the Parcel",
          "Bubbles",
        ],
      },
      Silver: {
        blurb: "All the essentials with two performers.",
        features: ["Welcome & meet", "Games", "Singalong", "Bubbles"],
      },
      Bronze: {
        blurb: "Quick double visit.",
        features: ["Meet & greet", "Photo time", "Birthday song"],
      },
    },
  },
  virtual: {
    label: "Virtual Packages",
    tiers: {
      Platinum: {
        blurb: "Interactive virtual party with extras.",
        features: [
          "Live hosted call",
          "Games & singalong",
          "Custom birthday message",
          "Digital activity pack",
        ],
      },
      Gold: {
        blurb: "Live call + core activities.",
        features: ["Hosted call", "Games", "Singalong", "Birthday message"],
      },
      Silver: {
        blurb: "Short virtual visit.",
        features: ["Hello from your character", "Song", "Screenshots"],
      },
      Bronze: {
        blurb: "Personalised video message.",
        features: ["Recorded greeting", "Name mentions", "Short song clip"],
      },
    },
  },
};

// Tier badge style
const TierBadge = ({ name }) => {
  const map = {
    Platinum: "bg-gradient-to-r from-pink-300 to-pink-200 text-pink-900",
    Gold: "bg-yellow-200 text-yellow-900",
    Silver: "bg-gray-200 text-gray-700",
    Bronze: "bg-amber-200 text-amber-900",
  };
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${map[name] || "bg-pink-200 text-pink-900"}`}>
      {name}
    </span>
  );
};

// --- Fixed card height (adjust once, applies everywhere) ---
const CARD_HEIGHT = "h-[380px] md:h-[420px] lg:h-[440px]"; // tweak to taste

function TierCard({ name, blurb, features }) {
  const [open, setOpen] = useState(false);
  const preview = features.slice(0, 4);
  const rest = features.slice(4);

  return (
    <div className={`relative bg-pink-100 rounded-3xl shadow p-6 sm:p-7 lg:p-8 ${CARD_HEIGHT} flex flex-col`}>
      {/* Decorations relative to the card */}
      <PiStarFourFill aria-hidden className="absolute -top-5 right-5 text-pink-300 pointer-events-none" size={28} />
      <HiOutlineSparkles aria-hidden className="absolute -bottom-4 left-5 text-pink-300/90 pointer-events-none" size={36} />

      {/* Heading row */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <TierBadge name={name} />
      </div>

      {/* Blurb */}
      <p className="text-sm text-pink-900/80 mb-3">{blurb}</p>

      {/* Scrollable feature area – keeps overall card height fixed */}
      <div className="flex-1 min-h-0">
        <ul className="space-y-2 h-full overflow-y-auto pr-1">
          {(open ? features : preview).map((f) => (
            <li key={f} className="flex items-start gap-2">
              <FiCheck className="mt-1 shrink-0 text-pink-600" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle – no layout shift because the list area is scrollable */}
      {rest.length > 0 && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-3 self-start text-pink-700 hover:text-pink-800 underline underline-offset-4"
        >
          {open ? "Show fewer details" : "More details"}
        </button>
      )}
    </div>
  );
}

export default function PackagesScreen({ id = "packages" }) {
  const tabs = useMemo(
    () => [
      { key: "one", label: DATA.one.label },
      { key: "two", label: DATA.two.label },
      { key: "virtual", label: DATA.virtual.label },
    ],
    []
  );

  const [tab, setTab] = useState("one");
  const current = DATA[tab];

  return (
    <section id={id} className="section pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

        {/* Full-width pink title bar */}
        <div className="relative mb-6 sm:mb-8">
          <div className="bg-pink-100 rounded-3xl py-5 sm:py-6 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-more font-bold text-[#95B3EA]">Packages</h2>
          </div>

          {/* Subtle sparkles around the bar */}
          <PiStarFourFill aria-hidden className="absolute -top-3 left-20 text-pink-300/90 pointer-events-none hidden sm:block" size={28} />
          <HiOutlineSparkles aria-hidden className="absolute -top-5 left-8 text-pink-400 pointer-events-none hidden sm:block" size={34} />
          <HiOutlineSparkles aria-hidden className="absolute -bottom-4 right-10 text-pink-300/90 pointer-events-none hidden sm:block" size={32} />
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="inline-flex gap-2 bg-pink-50 rounded-full p-1">
            {tabs.map((t) => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm md:text-base transition",
                    active ? "bg-pink-600 text-white shadow" : "text-pink-700 hover:bg-pink-100",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of fixed-height tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {TIERS_ORDER.map((tierName) => {
            const tier = current.tiers[tierName];
            if (!tier) return null;
            return (
              <TierCard
                key={tierName}
                name={tierName}
                blurb={tier.blurb}
                features={tier.features}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
