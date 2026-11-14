import { Link } from "react-router-dom";
import { serviceCategories } from "../../data/services-data";
import { ImagePlaceholder } from "../../../../shared/components/image-placeholder/image-placeholder";
import { websiteRoutes } from "../../../../setup/routes";

const featuredCategoryIds = ["mens-hair", "womens-hair", "hair-colour", "makeup"];

export function FeaturedServices() {
  const featured = serviceCategories.filter((category) =>
    featuredCategoryIds.includes(category.id),
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-gold-600">What We Offer</p>
          <h2 className="font-display mt-2 text-2xl font-semibold sm:text-3xl">Popular Services</h2>
        </div>
        <Link
          to={websiteRoutes.services}
          className="text-xs font-semibold tracking-[0.12em] text-foreground uppercase transition hover:text-gold-600"
        >
          View All Services →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((category) => {
          const accentBorder =
            category.accent === "gold"
              ? "border-gold-400"
              : category.accent === "silver"
                ? "border-silver-400"
                : "border-border";

          return (
            <div
              key={category.id}
              className={`overflow-hidden border ${accentBorder} bg-surface transition hover:shadow-md`}
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <ImagePlaceholder label={category.name} ratio="aspect-square" className="rounded-none border-0" />
              )}
              <div className="p-4">
                <h3 className="font-medium text-foreground">{category.name}</h3>
                <p className="mt-1 text-sm text-muted">{category.items.length} services</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
