import { NavLink } from "react-router-dom";

const baseClasses = "block px-4 py-2 text-lg transition-colors";
const activeClasses = "underline underline-offset-4 decoration-2";
const inactiveClasses = "hover:underline hover:underline-offset-4 hover:decoration-2";

const links = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/packages", label: "Packages" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faqs", label: "FAQS" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ onNavigate }) {
  return (
    <nav className="flex items-center gap-1">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              baseClasses,
              isActive ? activeClasses : inactiveClasses
            ].join(" ")
          }
          onClick={onNavigate}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
