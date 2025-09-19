// src/layout/layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";

function Layout() {
  return (
    <div className="min-h-screen grid" style={{ gridTemplateRows: "12vh 1fr auto" }}>
      <header className="bg-white border-b">
        <Header />
      </header>

      {/* Remove the container/padding here */}
      <main className="bg-white text-black">
        <Outlet />
      </main>

      <footer className="bg-white border-t">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;