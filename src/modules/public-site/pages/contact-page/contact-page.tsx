import { useState, type FormEvent } from "react";
import { ImagePlaceholder } from "../../../../shared/components/image-placeholder/image-placeholder";
import { CONTACT_EMAIL } from "../../../../setup/site-config";

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="mt-2 text-muted">
          Have a question? Send us a message and we'll get back to you.
        </p>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-foreground">Address (placeholder)</dt>
            <dd className="text-muted">123 Beach Road, Visakhapatnam, Andhra Pradesh 530001</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Phone / WhatsApp</dt>
            <dd className="text-muted">96408 93477</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Email (placeholder)</dt>
            <dd>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-700 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </dd>
          </div>
        </dl>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="contact-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
              Your Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={inputClasses}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-primary px-6 py-3 font-medium text-surface transition hover:bg-primary-600"
          >
            Send Us a Mail
          </button>
        </form>
      </div>
      <ImagePlaceholder label="Map / storefront photo" ratio="aspect-[4/3]" />
    </section>
  );
}
