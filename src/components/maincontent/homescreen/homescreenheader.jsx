import "./homescreenheader.css";
import millyImg from "../../../assets/mwmtransparenthome.png";
import { FaStar, FaHeart } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { PiStarFourFill } from "react-icons/pi";

export default function HomeScreenHeader() {
  return (
    <section className="bg-[#FFF7FA] text-black min-h-[88vh] flex items-center w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* LEFT: Text block */}
          <div>
            <p className="text-sm md:text-base font-medium opacity-80 mb-3">Welcome to <span className="font-more text-[#95B3EA]">Melodies With Milly</span></p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed">
              We host <span className="text-pink-600">princess parties</span> in
              London, Surrey &amp; Hampshire
            </h1>
            <p className="mt-4 text-base sm:text-lg">
              Discover the magic with Melodies with Milly! Elevate your
              celebrations in South-West London, Surrey, and Hampshire with
              enchanting princess parties, delightful entertainment, and
              memorable visits.
            </p>
            <div className="mt-6">
              <a
              href="#contact"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
              >
                Enquire Now
              </a>
            </div>
          </div>

        {/* RIGHT: Card + Image + Decorative icons */}
<div className="relative mt-6 sm:mt-8 lg:mt-12">
  {/* Decorations – ABOVE the card */}
  <PiStarFourFill
    aria-hidden
    className="absolute -top-20 right-7 text-pink-400/80 z-10 pointer-events-none text-[54px] stroke-1" size={32}
/>

  <HiOutlineSparkles
    aria-hidden
    className="absolute -top-20 left-20 text-pink-400 z-10 pointer-events-none text-[54px] stroke-1" size={54}
/>
  <PiStarFourFill
    aria-hidden
    className="absolute top-1/3 -left-4 text-pink-300 z-10 pointer-events-none text-[54px] stroke-1" size={32}
/>
  <HiOutlineSparkles
    aria-hidden
    className="absolute -bottom-5 left-10 text-pink-400 z-10 pointer-events-none text-[54px] stroke-1" size={54}
/>
  <HiOutlineSparkles
    aria-hidden
    className="absolute bottom-2 right-1 text-pink-300/90 z-10 pointer-events-none text-[54px] stroke-1" size={54}
/>

  <PiStarFourFill
    aria-hidden
    className="absolute -bottom-6 right-20 text-pink-300 z-10 pointer-events-none text-[54px] stroke-1" size={32}
/>

  {/* Card – BELOW decorations */}
  <div
    className="
      milly-card
      relative
      bg-pink-100
      rounded-3xl
      w-full
      max-w-[640px]
      h-[280px] sm:h-[330px] lg:h-[400px]
      mx-auto
      overflow-visible
      z-0
    "
  >
    {/* Photo – ABOVE everything */}
    <img
      src={millyImg}
      alt="Milly – company owner"
      className="
        milly-photo
        absolute left-1/2 -translate-x-1/2
        bottom-0
        h-[130%] sm:h-[135%] lg:h-[140%]
        object-contain
        pointer-events-none select-none
        z-20
      "
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
