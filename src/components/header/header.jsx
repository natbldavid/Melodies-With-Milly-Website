import { useState } from "react";
import Navbar from "../navbar/navbar.jsx";
import logoUrl from "../../assets/mwmlogoofficial4logo.png"; // adjust filename if different

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full">
      {/* Bar */}
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + Title (Title hidden on small screens) */}
        <div className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="App Logo"
            className="h-24 w-24 object-contain"
          />
          <span className="hidden md:inline-block font-more text-4xl leading-none text-[#95B3EA] ">
            Melodies With Milly
          </span>
        </div>

        {/* Right: Desktop nav */}
        <div className="hidden lg:block">
          <Navbar />
        </div>

        {/* Right: Mobile hamburger (shows when small) */}
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md border px-3 py-2"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          {/* simple hamburger icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile full-screen Overlay Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="App Logo" className="h-10 w-10 object-contain" />
              {/* Title hidden on extra-small too, since you asked */}
              <span className="hidden sm:inline-block font-more text-2xl leading-none">
                Your App Title
              </span>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md border px-3 py-2"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              {/* X icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="mt-6 px-4 sm:px-6 lg:px-8">
            <Navbar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
