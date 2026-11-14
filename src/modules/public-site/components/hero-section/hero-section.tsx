import { Link } from "react-router-dom";
import { websiteRoutes } from "../../../../setup/routes";
import heroImage from "../../../../assets/stock/hero-salon-interior.jpg";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 md:grid-cols-2">
      <div className="flex flex-col items-start gap-6 text-left">
        <span className="eyebrow text-gold-600">Visakhapatnam's Premium Salon</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          The Art of Being Spellbound
        </h1>
        <p className="max-w-lg text-muted">
          Vismaya Unisex Salon — premium hair, skin, and beauty care. Get ready to spoil yourself.
        </p>
        <Link to={websiteRoutes.booking} className="btn-premium bg-primary text-surface hover:bg-primary-600">
          Book an Appointment
        </Link>
      </div>
      <img
        src={heroImage}
        alt="Vismaya salon interior"
        className="aspect-[4/3] w-full object-cover"
      />
    </section>
  );
}
