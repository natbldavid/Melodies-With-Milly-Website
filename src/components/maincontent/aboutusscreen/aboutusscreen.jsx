// src/components/maincontent/aboutusscreen/aboutusscreen.jsx
import aboutImg from "../../../assets/mwmmainfromwebby.jpg";

import { HiOutlineSparkles } from "react-icons/hi2";
import { PiStarFourFill } from "react-icons/pi";

export default function AboutUsScreen({ id = "about" }) {
  return (
    <section id={id} className="section pt-0">
      {/* 2-col on md+: image left, content right */}
      <div className="bg-[#FFF7FA] grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
        {/* LEFT: Image */}
        <div className="relative">
          <img
            src={aboutImg}
            alt="About Milly"
            className="w-full h-auto md:h-[85vh] object-cover object-center"
          />
        </div>

        {/* RIGHT: Card + Decorative icons */}
        <div className="relative flex items-center justify-center px-6 sm:px-8 lg:px-12 py-6 md:py-0">
          {/* Wrapper to position card & decorations together */}
          <div className="relative w-full max-w-xl">
            {/* Decorations (positioned relative to card) */}
            <PiStarFourFill
              aria-hidden
              className="absolute -top-8 right-20 text-pink-400/80 z-10 pointer-events-none text-[54px] stroke-1"
              size={32}
            />
            <HiOutlineSparkles
              aria-hidden
              className="absolute top-1 right-1 text-pink-300/90 z-10 pointer-events-none text-[54px] stroke-1"
              size={54}
            />
            <HiOutlineSparkles
              aria-hidden
              className="absolute bottom-0 right-2 text-pink-300/90 z-10 pointer-events-none text-[54px] stroke-1"
              size={54}
            />
            <PiStarFourFill
              aria-hidden
              className="absolute -bottom-8 right-20 text-pink-300 z-10 pointer-events-none text-[54px] stroke-1"
              size={32}
            />

            {/* Card */}
            <div
              className="
                relative bg-pink-100 rounded-3xl shadow
                overflow-visible z-0
                p-6 sm:p-8 md:p-10
                h-auto md:h-[70vh]   /* shorter height on desktop */
                flex flex-col justify-start
              "
            >
              <h2 className="text-3xl sm:text-4xl font-more font-bold text-[#95B3EA] mb-4">
                About Milly
              </h2>

              <p className="text-base sm:text-lg leading-relaxed">
                I first created <span className="font-more text-[#95B3EA]">Melodies with Milly</span> in June 2022.
                That first year I did over 100 parties! I always strive to be the best
                and ensure the parties I provide are <em>exactly</em> what you want.
                I always add my personal touch to every party, ensuring no party is
                the same.
                <br /><br />
                Before starting my party business, I was a nanny and a singing teacher,
                and I worked overseas as an entertainer/vocalist. I have always been
                passionate about singing and teaching, so this business is a dream come true.
                <br /><br />
                Aside from my career I also love travelling, drinking coffee, spending time
                with my cats, and I&apos;m a BIG foodie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}