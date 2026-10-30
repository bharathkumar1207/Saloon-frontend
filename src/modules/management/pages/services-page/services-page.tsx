import { useEffect, useRef, useState, type FormEvent } from "react";
import * as servicesApi from "../../../../apis/services-api";
import { ApiError } from "../../../../apis/api-client";
import { resolveImageUrl } from "../../../../apis/api-client";

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const emptyForm = {
  id: null as string | null,
  category: "",
  name: "",
  description: "",
  price: "",
  durationMinutes: "",
  imageUrl: null as string | null,
};

export function ServicesPage() {
  const [services, setServices] = useState<servicesApi.Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function refresh() {
    return servicesApi.listServices(true).then(setServices);
  }

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, []);

  function resetForm() {
    setForm(emptyForm);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(service: servicesApi.Service) {
    setForm({
      id: service.id,
      category: service.category,
      name: service.name,
      description: service.description ?? "",
      price: service.price,
      durationMinutes: service.duration_minutes?.toString() ?? "",
      imageUrl: service.image_url,
    });
    setError(null);
  }

  async function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    try {
      const { url } = await servicesApi.uploadServiceImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!form.category.trim() || !form.name.trim() || !form.price) {
      setError("Category, name, and price are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        category: form.category.trim(),
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: Number(form.price),
        durationMinutes: form.durationMinutes ? Number(form.durationMinutes) : null,
        imageUrl: form.imageUrl,
      };

      if (form.id) {
        await servicesApi.updateService(form.id, payload);
      } else {
        await servicesApi.createService(payload);
      }
      resetForm();
      await refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save service.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function toggleActive(service: servicesApi.Service) {
    await servicesApi.updateService(service.id, { isActive: !service.is_active });
    await refresh();
  }

  async function handleDelete(service: servicesApi.Service) {
    if (!confirm(`Delete "${service.name}"? This can't be undone.`)) return;
    await servicesApi.deleteService(service.id);
    if (form.id === service.id) resetForm();
    await refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Services</h1>

        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={6}>
                    Loading…
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      {service.image_url ? (
                        <img
                          src={resolveImageUrl(service.image_url) ?? undefined}
                          alt={service.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-background" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted">{service.category}</td>
                    <td className="px-4 py-3 text-foreground">{service.name}</td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      ₹{Number(service.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleActive(service)}
                        className={service.is_active ? "text-green-700" : "text-muted"}
                      >
                        {service.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => startEdit(service)}
                        className="mr-3 text-xs text-primary-700 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(service)}
                        className="text-xs text-muted hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-fit rounded-lg border border-border bg-surface p-5">
        <h2 className="font-semibold text-foreground">{form.id ? "Edit Service" : "Add Service"}</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div>
            <span className="text-sm font-medium text-foreground">Image</span>
            <div className="mt-1 flex items-center gap-3">
              {form.imageUrl ? (
                <img
                  src={resolveImageUrl(form.imageUrl) ?? undefined}
                  alt=""
                  className="h-14 w-14 rounded object-cover"
                />
              ) : (
                <div className="h-14 w-14 rounded bg-background" />
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                disabled={isUploading}
                className="text-xs text-muted"
              />
            </div>
            {isUploading ? <p className="mt-1 text-xs text-muted">Uploading…</p> : null}
          </div>
          <label className="text-sm font-medium text-foreground">
            Category
            <input
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Description (optional)
            <input
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Price
            <input
              type="number"
              min={0}
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Duration (minutes, optional)
            <input
              type="number"
              min={0}
              value={form.durationMinutes}
              onChange={(event) => setForm({ ...form, durationMinutes: event.target.value })}
              className={inputClasses}
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600 disabled:opacity-60"
            >
              {isSubmitting ? "Saving…" : form.id ? "Update Service" : "Add Service"}
            </button>
            {form.id ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
