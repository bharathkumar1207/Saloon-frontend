export function Footer() {
  return (
    <footer className="border-t border-border bg-ink-900 text-silver-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-wide text-background">
            VISMAYA
          </h3>
          <p className="eyebrow mt-3 text-silver-500">The Art of Being Spellbound</p>
          <p className="mt-2 text-xs text-silver-500">
            V4U — Vismaya For You. Beauty That Cares Back.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow text-silver-500">Address</p>
          <p className="mt-3">123 Beach Road, Visakhapatnam, Andhra Pradesh 530001</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow text-silver-500">Contact</p>
          <p className="mt-3">96408 93477</p>
          <p>Call / WhatsApp</p>
          <a href="mailto:hello@vismayaunisexsalon.com" className="mt-1 block transition hover:text-gold-400">
            hello@vismayaunisexsalon.com
          </a>
        </div>
      </div>
      <div className="border-t border-silver-800 px-4 py-5 text-center text-xs tracking-wide text-silver-600">
        © {new Date().getFullYear()} Vismaya Unisex Salon. All rights reserved.
      </div>
    </footer>
  );
}
