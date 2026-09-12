const testimonialsData = [
  { id: 1, name: "Alex R.", quote: "Best haircut I've had in years." },
  { id: 2, name: "Jordan P.", quote: "Friendly staff and great atmosphere." },
  { id: 3, name: "Sam T.", quote: "Booking online was quick and easy." },
  { id: 4, name: "Priya K.", quote: "Loved the hair spa, super relaxing." },
  { id: 5, name: "Rahul V.", quote: "Clean, professional, and affordable." },
  { id: 6, name: "Divya M.", quote: "My bridal makeup was absolutely stunning." },
];

// Duplicated once so the track can loop seamlessly at the halfway point.
const loopedTestimonials = [...testimonialsData, ...testimonialsData];

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold">What Our Clients Say</h2>
        <p className="mt-2 text-center text-sm text-muted">
          Sample reviews — real ones coming soon
        </p>

        <div className="group mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="animate-marquee flex w-max gap-6 group-hover:[animation-play-state:paused]">
            {loopedTestimonials.map((testimonial, index) => (
              <blockquote
                key={`${testimonial.id}-${index}`}
                className="w-72 shrink-0 rounded-lg border border-border bg-surface p-6 text-sm text-muted"
              >
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="mt-3 font-medium text-foreground">{testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
