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
          className="aspect-[4/3] w-full rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold">About Us</h1>
          <p className="mt-4 max-w-lg text-muted">
            Vismaya Unisex Salon is opening soon in Visakhapatnam, bringing hair, skin, nails,
            makeup, and spa care together under one roof. Our promise is simple: premium,
            hygienic, professional, and affordable care — for everyone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-center text-2xl font-semibold">Why Choose Vismaya</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-lg border border-border bg-surface p-6 text-center"
            >
              <h3 className="font-semibold text-primary-700">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-800 px-4 py-16 text-center text-background">
        <h2 className="text-2xl font-semibold">Opening Soon in Visakhapatnam</h2>
        <p className="mt-2 text-primary-200">
          Follow along for our launch date and be the first to book.
        </p>
        <Link
          to={websiteRoutes.contact}
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-medium text-surface transition hover:bg-primary-600"
        >
          Get In Touch
        </Link>
      </section>
    </>
  );
}
