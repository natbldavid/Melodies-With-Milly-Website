// src/layout/layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* ⬇️ Push content below fixed header (h-24 = 6rem = 96px) */}
      <main className="flex-1 text-black pt-24">
        <Outlet />
      </main>
      <footer className="border-t">
        <Footer />
      </footer>
    </div>
  );
}
export default Layout;
