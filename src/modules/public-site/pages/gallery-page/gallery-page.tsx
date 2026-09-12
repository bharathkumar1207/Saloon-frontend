import brightInterior from "../../../../assets/stock/gallery-bright-interior.jpg";
import barbershop from "../../../../assets/stock/gallery-barbershop.jpg";
import modernSalon from "../../../../assets/stock/gallery-modern-salon.jpg";
import categoryNails from "../../../../assets/stock/category-nails.jpg";
import flatlay from "../../../../assets/stock/gallery-flatlay.jpg";
import categoryMakeup from "../../../../assets/stock/category-makeup.jpg";
import categorySpa from "../../../../assets/stock/category-spa.jpg";
import hairWash from "../../../../assets/stock/gallery-hair-wash.jpg";

const galleryPhotos = [
  { src: brightInterior, alt: "Salon interior" },
  { src: barbershop, alt: "Barbershop styling area" },
  { src: modernSalon, alt: "Modern salon seating" },
  { src: categoryNails, alt: "Manicure" },
  { src: flatlay, alt: "Styling tools" },
  { src: categoryMakeup, alt: "Makeup products" },
  { src: categorySpa, alt: "Spa massage" },
  { src: hairWash, alt: "Hair wash station" },
];

export function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="mt-2 text-muted">More photos of our space and work coming soon.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryPhotos.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className="aspect-square w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </section>
  );
}
