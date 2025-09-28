// src/pages/sections-page.jsx
import { useEffect } from "react";
import useRevealSections from "../hooks/useRevealSections";

import HomeScreen from "../components/maincontent/homescreen/homescreen.jsx";
import AboutUsScreen from "../components/maincontent/aboutusscreen/aboutusscreen.jsx";
import PackagesScreen from "../components/maincontent/packagesscreen/packagesscreen.jsx";
import CharactersScreen from "../components/maincontent/charactersscreen/charactersscreen.jsx";
import TestimonialsScreen from "../components/maincontent/testimonialsscreen/testimonialsscreen.jsx";
import FaqScreen from "../components/maincontent/faqscreen/faqscreen.jsx";
import ContactUsScreen from "../components/maincontent/contactusscreen/contactusscreen.jsx";

export default function SectionsPage() {
  // Handle deep-link first load (/#packages etc.)
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "instant", block: "start" }), 0);
    }
  }, []);

  // 👇 ADD: reveal sections as you scroll or jump via navbar (no layout changes)
  useRevealSections(["home", "packages", "about", "characters", "testimonials", "faqs", "contact"]);

  return (
    <div>
      <HomeScreen id="home" />
      <PackagesScreen id="packages" />
      <AboutUsScreen id="about" />
      <CharactersScreen id="characters" />
      <TestimonialsScreen id="testimonials" />
      <FaqScreen id="faqs" />
      <ContactUsScreen id="contact" />
    </div>
  );
}
