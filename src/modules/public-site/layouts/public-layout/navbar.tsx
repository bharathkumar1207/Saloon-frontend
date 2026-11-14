import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { websiteRoutes } from "../../../../setup/routes";
import logo from "../../../../assets/logo.png";

const navLinks = [
  { label: "Home", to: websiteRoutes.home },
  { label: "Services", to: websiteRoutes.services },
  { label: "Gallery", to: websiteRoutes.gallery },
  { label: "About", to: websiteRoutes.about },
  { label: "Contact", to: websiteRoutes.contact },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to={websiteRoutes.home} className="flex items-center gap-3 py-1">
          <img src={logo} alt="Vismaya" className="h-16 w-auto" />
          <div>
            <span className="font-display block text-xl font-semibold tracking-wide text-foreground">
              VISMAYA
            </span>
            <span className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.2em]">
              <span className="text-gold-600">V4U</span>
              <span className="h-px w-3 bg-gold-400" />
              <span className="h-px w-3 bg-silver-500" />
            </span>
          </div>
        </Link>

        <div className="hidden gap-8 text-xs font-medium tracking-[0.12em] uppercase md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === websiteRoutes.home}
              className={({ isActive }) =>
                `border-b pb-0.5 transition ${
                  isActive
                    ? "border-gold-500 text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to={websiteRoutes.booking} className="btn-premium bg-primary text-surface hover:bg-primary-600">
            Book Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-border md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === websiteRoutes.home}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-2 py-2 ${
                    isActive ? "text-foreground" : "text-muted hover:bg-background"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
