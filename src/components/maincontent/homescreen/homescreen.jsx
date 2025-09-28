// src/components/maincontent/homescreen/homescreen.jsx
import "./homescreen.css";
import HomeScreenHeader from "./homescreenheader.jsx";

export default function HomeScreen({ id = "home" }) {
  return (
    <section id={id} className="section homescreen">
      {/* HERO / HEADER SECTION */}
      <HomeScreenHeader />
      {/* Add more home sub-sections here later if you like */}
    </section>
  );
}
