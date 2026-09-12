import { serviceCategories } from "../../data/services-data";
import { ImagePlaceholder } from "../../../../shared/components/image-placeholder/image-placeholder";

export function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Our Services</h1>
      <p className="mt-2 text-muted">
        Hair, skin, nails, makeup, and spa care for men and women. Prices shown are starting
        prices — final pricing may vary by length, density, product, and technique.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {serviceCategories.map((category) => (
          <div
            key={category.id}
            className="grid gap-6 rounded-xl border border-border bg-surface p-6 md:grid-cols-[220px_1fr]"
          >
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="mx-auto h-40 w-40 rounded-lg object-cover md:mx-0 md:h-auto md:w-full md:aspect-square"
              />
            ) : (
              <ImagePlaceholder
                label={category.name}
                ratio="aspect-square"
                className="mx-auto h-40 w-40 md:mx-0 md:h-auto md:w-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-foreground">{category.name}</h2>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-end gap-2 text-sm">
                    <span className="text-foreground">
                      {item.name}
                      {item.description ? (
                        <span className="block text-xs text-muted">{item.description}</span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mb-1 h-0 flex-1 border-b border-dotted border-border"
                    />
                    <span className="shrink-0 font-medium text-primary-700">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
