import { Link } from "react-router-dom";
import aboutImage from "../../../../assets/stock/about-team-styling.jpg";
import { websiteRoutes } from "../../../../setup/routes";

const values = [
  { title: "Premium", description: "Quality products and techniques for every service." },
  { title: "Hygienic", description: "Clean tools and sanitized stations, every time." },
  { title: "Professional", description: "Trained stylists who take pride in their craft." },
  { title: "Affordable", description: "Premium care that doesn't break the bank." },
];

export function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <img
          src={aboutImage}
          alt="Vismaya stylists at work"
          className="aspect-[4/3] w-full object-cover"
        />
        <div>
          <p className="eyebrow text-gold-600">Our Story</p>
          <h1 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">About Us</h1>
          <p className="mt-4 max-w-lg text-muted">
            Vismaya Unisex Salon is opening soon in Visakhapatnam, bringing hair, skin, nails,
            makeup, and spa care together under one roof. Our promise is simple: premium,
            hygienic, professional, and affordable care — for everyone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <p className="eyebrow text-center text-gold-600">Our Values</p>
        <h2 className="font-display mt-2 text-center text-2xl font-semibold sm:text-3xl">
          Why Choose Vismaya
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="border border-border bg-surface p-6 text-center">
              <h3 className="font-display font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-900 px-4 py-16 text-center text-background">
        <p className="eyebrow text-gold-400">Visit Us</p>
        <h2 className="font-display mt-2 text-2xl font-semibold sm:text-3xl">
          Find Us in Visakhapatnam
        </h2>
        <p className="mt-2 text-silver-300">Book your appointment today and experience Vismaya.</p>
        <Link
          to={websiteRoutes.booking}
          className="btn-premium mt-6 inline-flex bg-primary text-surface hover:bg-primary-600"
        >
          Book Now
        </Link>
      </section>
    </>
  );
}
