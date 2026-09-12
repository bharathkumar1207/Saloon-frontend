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
        <h2 className="text-2xl font-semibold">Popular Services</h2>
        <Link to={websiteRoutes.services} className="text-sm font-medium text-primary-700">
          View All Services →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((category) => (
          <div
            key={category.id}
            className="overflow-hidden rounded-lg border border-border bg-surface"
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
        ))}
      </div>
    </section>
  );
}
