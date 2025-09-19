import "./homescreen.css";
import HomeScreenHeader from "./homescreenheader.jsx";

export default function HomeScreen() {
  return (
    <div className="homescreen">
      {/* HERO / HEADER SECTION */}
      <HomeScreenHeader />

      {/* Future sections of the home page can be added here as separate components */}
      {/* <HomeScreenOpener /> */}
      {/* <HomeFeatures /> */}
      {/* <HomeTestimonialsPreview /> */}
    </div>
  );
}
