// src/components/maincontent/charactersscreen/charactersscreen.jsx
import { useEffect, useMemo, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { PiStarFourFill } from "react-icons/pi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import queenOfMean from "../../../assets/mwmqueenofmean.jpg";
import melodyTheFairy from "../../../assets/mwmmelodythefairy.jpg";
import winnieTheWitch from "../../../assets/mwmwinniethewitch.jpg";
import starryPrincess from "../../../assets/mwmstarryprincess.jpg";
import southernPrincess from "../../../assets/mwmsouthernprincess.jpg";

/* ⛏️ Verify these filenames exactly match your /assets files (case sensitive!) */
import mermaidPrincess from "../../../assets/mwmmermainprincess.jpg";     // was mwmmermainprincess.jpg
import iceQueen from "../../../assets/mwmicequeen.jpg";
import towerPrincess from "../../../assets/mwmtowerprincess.jpg";
import colombianPrincess from "../../../assets/mwmcolombianprincess.jpg";
import arabianPrincess from "../../../assets/mwmarabianprincess.jpg";
import beautyQueen from "../../../assets/mwmbeautyqueen.jpg";
import caribbeanMermaid from "../../../assets/mwmcaribbeanmermain.jpg";  // was mwmcaribbeanmermain.jpg
import melodyTheElf from "../../../assets/mwmmelodytheelf.jpg";
import nonCharacterEntertainer from "../../../assets/mwmnoncharacterentertainer.jpg";
import polynesianPrincess from "../../../assets/mwmpolynesianprincess.jpg"; // was polynesianPriness
import snowSister from "../../../assets/mwmsnowsister.jpg";
import princessBeauty from "../../../assets/mwmprincessbeauty.jpg";

/* Data */
const CHARACTERS = [
  { name: "Ice Queen", power: "Ability to create snow storms and form ice", image: iceQueen },
  { name: "Polynesian Princess", power: "Connection with the sea", image: polynesianPrincess },
  { name: "Mermaid Princess", power: "Fantastic swimmer & very adventurous", image: mermaidPrincess },
  { name: "Princess Beauty", power: "Talking to cutlery and tableware", image: princessBeauty },
  { name: "Colombian Princess", power: "Being the heart of her familia and community", image: colombianPrincess },
  { name: "Snow Sister", power: "Staying positive, being the best sister and Princess to her town", image: snowSister },
  { name: "Starry Princess", power: "Dreaming big and inspiring others", image: starryPrincess },
  { name: "Tower Princess", power: "Healing the sick with her lustrous long hair", image: towerPrincess },
  { name: "Beauty Queen", power: "Always looking fabulous and empowering women!", image: beautyQueen },
  { name: "Melody the Fairy Princess", power: "Being kind and lots of fun", image: melodyTheFairy },
  { name: "Caribbean Mermaid", power: "Beautiful voice", image: caribbeanMermaid },
  { name: "Arabian Princess", power: "Being compassionate, speaking to genies and flying on magic carpets", image: arabianPrincess },
  { name: "Southern Princess", power: "Creating the most magical gumbo & beignets", image: southernPrincess },
  { name: "Queen of Mean", power: "Being mean", image: queenOfMean },
  { name: "Melody The Elf", power: "Checking who's naughty or nice and being Santa's best helper", image: melodyTheElf },
  { name: "Winnie The Witch", power: "Creating spells", image: winnieTheWitch },
  { name: "Non Character Entertainer", power: "Entertaining lots of children", image: nonCharacterEntertainer },
];

/* Determine current grid columns (so 2 rows collapsed is responsive) */
function useGridColumns() {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (mqLg.matches) setCols(4);
      else if (mqMd.matches) setCols(3);
      else if (mqSm.matches) setCols(2);
      else setCols(1);
    };
    update();
    mqSm.addEventListener?.("change", update);
    mqMd.addEventListener?.("change", update);
    mqLg.addEventListener?.("change", update);
    return () => {
      mqSm.removeEventListener?.("change", update);
      mqMd.removeEventListener?.("change", update);
      mqLg.removeEventListener?.("change", update);
    };
  }, []);
  return cols;
}

/* Card */
function CharacterCard({ name, power, image, animatedIn, animatedOut }) {
  const src = image;
  return (
    <div
      className={[
        "relative bg-pink-100 rounded-3xl shadow p-4 sm:p-5 lg:p-6 overflow-visible",
        animatedIn ? "motion-safe:animate-[riseIn_400ms_ease-out]" : "",
        /* when fading out, keep it in the DOM and animate down+fade, then parent removes it */
        animatedOut ? "motion-safe:animate-[fadeOut_400ms_ease-in]" : "",
      ].join(" ")}
    >
      {/* Decorations (visible above card) */}
      <PiStarFourFill
        aria-hidden
        className="absolute -top-3 -left-2 text-pink-300/90 z-10 pointer-events-none"
        size={22}
      />
      <HiOutlineSparkles
        aria-hidden
        className="absolute -bottom-3 -right-1 text-pink-300 z-10 pointer-events-none"
        size={26}
      />

      {/* Image */}
      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/60">
        {src ? (
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-pink-700/60">
            Missing image
          </div>
        )}
      </div>

      {/* Text */}
      <div className="mt-3">
        <h3 className="text-lg sm:text-xl font-more font-semibold text-[#95B3EA]">
          {name}
        </h3>
        <p className="mt-1 text-sm sm:text-base text-black/80 font-bold">
          Power: <span className="font-light">{power}</span>
        </p>
      </div>
    </div>
  );
}

/* Screen */
export default function CharactersScreen({ id = "characters" }) {
  const [expanded, setExpanded] = useState(false);
  const [leaving, setLeaving] = useState(false); // when collapsing, play fadeOut before removing
  const cols = useGridColumns();
  const visibleCount = cols * 2; // two rows when collapsed

  // When expanded OR leaving (during fadeOut), render all; otherwise slice
  const items = useMemo(() => {
    if (expanded || leaving) return CHARACTERS;
    return CHARACTERS.slice(0, visibleCount);
  }, [expanded, leaving, visibleCount]);

  const hasMore = CHARACTERS.length > visibleCount;

  const onToggle = () => {
    if (expanded) {
      // start leaving phase
      setLeaving(true);
      // after fadeOut duration, actually collapse
      setTimeout(() => {
        setLeaving(false);
        setExpanded(false);
      }, 400); // must match fadeOut duration
    } else {
      setExpanded(true);
    }
  };

  return (
    <section id={id} className="section pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Title bar */}
        <div className="relative bg-pink-100 rounded-3xl py-5 sm:py-6 mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-more font-bold text-[#95B3EA]">
            Our Characters
          </h2>
          <PiStarFourFill
            aria-hidden
            className="absolute -top-3 left-8 sm:left-16 text-pink-300/90 pointer-events-none hidden sm:block"
            size={24}
          />
          <HiOutlineSparkles
            aria-hidden
            className="absolute -bottom-3 right-8 sm:right-16 text-pink-400 pointer-events-none hidden sm:block"
            size={28}
          />
        </div>

        {/* Grid */}
        <div
          id="characters-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {items.map((c, i) => {
            const isExtra = i >= visibleCount;
            const animatedIn = expanded && isExtra; // new cards fade in
            const animatedOut = leaving && isExtra; // extra cards fade out before removal
            return (
              <CharacterCard
                key={c.name}
                {...c}
                animatedIn={animatedIn}
                animatedOut={animatedOut}
              />
            );
          })}
        </div>

        {/* Show All / Show Less */}
        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
              aria-expanded={expanded}
              aria-controls="characters-grid"
            >
              {expanded && !leaving ? (
                <>
                  <FiChevronUp className="text-xl" /> Show Less
                </>
              ) : (
                <>
                  <FiChevronDown className="text-xl" /> Show All
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
