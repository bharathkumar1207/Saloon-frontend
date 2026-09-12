export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h3 className="font-semibold text-foreground">Vismaya Unisex Salon</h3>
          <p className="mt-2 text-sm text-muted">The Art of Being Spellbound</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Address (placeholder)</p>
          <p className="mt-2">123 Beach Road, Visakhapatnam, Andhra Pradesh 530001</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Contact</p>
          <p className="mt-2">96408 93477</p>
          <p>Call / WhatsApp</p>
          <a href="mailto:hello@vismayaunisexsalon.com" className="mt-1 block hover:text-primary-700">
            hello@vismayaunisexsalon.com
          </a>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Vismaya Unisex Salon. All rights reserved.
      </div>
    </footer>
  );
}
