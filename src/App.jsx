import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout.jsx";

// Screens
import HomeScreen from "./components/maincontent/homescreen/homescreen.jsx";
import AboutUsScreen from "./components/maincontent/aboutusscreen/aboutusscreen.jsx";
import PackagesScreen from "./components/maincontent/packagesscreen/packagesscreen.jsx";
import TestimonialsScreen from "./components/maincontent/testimonialsscreen/testimonialsscreen.jsx";
import FaqsScreen from "./components/maincontent/faqscreen/faqscreen.jsx";
import ContactUsScreen from "./components/maincontent/contactusscreen/contactusscreen.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout controls header (10% vh), main, footer */}
        <Route path="/" element={<Layout />}>
          {/* Default route = Home */}
          <Route index element={<HomeScreen />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="about" element={<AboutUsScreen />} />
          <Route path="packages" element={<PackagesScreen />} />
          <Route path="testimonials" element={<TestimonialsScreen />} />
          <Route path="faqs" element={<FaqsScreen />} />
          <Route path="contact" element={<ContactUsScreen />} />
          {/* Optionally a 404 could go here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
