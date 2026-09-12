import { useState, type FormEvent } from "react";
import { serviceCategories } from "../../data/services-data";
import { CONTACT_EMAIL, IS_SALON_OPEN } from "../../../../setup/site-config";

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

function WaitlistForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent("Waitlist signup — notify me at launch");
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nInterested in: ${service || "Not specified"}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-16 text-center">
      <span className="rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold tracking-wide text-primary-700 uppercase">
        Opening Soon
      </span>
      <h1 className="mt-4 text-3xl font-semibold">We're Not Open Yet</h1>
      <p className="mt-2 text-muted">
        Vismaya is getting ready to open in Visakhapatnam. Leave your details and we'll notify
        you the moment we're accepting appointments.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
        <div>
          <label htmlFor="waitlist-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="waitlist-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="waitlist-phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="waitlist-phone"
            type="tel"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="waitlist-service" className="text-sm font-medium text-foreground">
            Interested In (optional)
          </label>
          <select
            id="waitlist-service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            className={inputClasses}
          >
            <option value="">Select a category</option>
            {serviceCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-md bg-primary px-6 py-3 font-medium text-surface transition hover:bg-primary-600"
        >
          Notify Me at Launch
        </button>
      </form>
    </section>
  );
}

function AppointmentForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(`Appointment request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred date/time: ${preferredDate}\nNotes: ${notes}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Book an Appointment</h1>
      <p className="mt-2 text-muted">
        Fill in your details and preferred time — we'll confirm by phone or email.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="booking-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="booking-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="booking-phone"
            type="tel"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="booking-service" className="text-sm font-medium text-foreground">
            Service
          </label>
          <select
            id="booking-service"
            required
            value={service}
            onChange={(event) => setService(event.target.value)}
            className={inputClasses}
          >
            <option value="">Select a service</option>
            {serviceCategories.map((category) => (
              <optgroup key={category.id} label={category.name}>
                {category.items.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="booking-date" className="text-sm font-medium text-foreground">
            Preferred Date / Time
          </label>
          <input
            id="booking-date"
            required
            placeholder="e.g. 20 Oct, 4 PM"
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="booking-notes" className="text-sm font-medium text-foreground">
            Notes (optional)
          </label>
          <textarea
            id="booking-notes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className={inputClasses}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-primary px-6 py-3 font-medium text-surface transition hover:bg-primary-600"
        >
          Request Appointment
        </button>
      </form>
    </section>
  );
}

export function BookingPage() {
  return IS_SALON_OPEN ? <AppointmentForm /> : <WaitlistForm />;
}
