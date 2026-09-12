import { useState } from "react";
import { Link } from "react-router-dom";
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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to={websiteRoutes.home} className="flex items-center gap-2">
          <img src={logo} alt="Vismaya" className="h-10 w-10" />
          <span className="text-xl font-semibold text-foreground">Vismaya</span>
        </Link>

        <div className="hidden gap-6 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={websiteRoutes.booking}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600"
          >
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
          <div className="flex flex-col gap-1 px-4 py-3 text-sm font-medium text-muted">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-2 py-2 hover:bg-background"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
