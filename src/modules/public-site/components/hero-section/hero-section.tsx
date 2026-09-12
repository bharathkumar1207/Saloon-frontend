import { Link } from "react-router-dom";
import { websiteRoutes } from "../../../../setup/routes";
import heroImage from "../../../../assets/stock/hero-salon-interior.jpg";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 md:grid-cols-2">
      <div className="flex flex-col items-start gap-6 text-left">
        <span className="rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold tracking-wide text-primary-700 uppercase">
          Opening Soon in Visakhapatnam
        </span>
        <h1 className="text-4xl font-semibold sm:text-5xl">The Art of Being Spellbound</h1>
        <p className="max-w-lg text-muted">
          Vismaya Unisex Salon — premium hair, skin, and beauty care. Get ready to spoil yourself.
        </p>
        <Link
          to={websiteRoutes.booking}
          className="rounded-md bg-primary px-6 py-3 font-medium text-surface transition hover:bg-primary-600"
        >
          Get Notified at Launch
        </Link>
      </div>
      <img
        src={heroImage}
        alt="Vismaya salon interior"
        className="aspect-[4/3] w-full rounded-lg object-cover"
      />
    </section>
  );
}
