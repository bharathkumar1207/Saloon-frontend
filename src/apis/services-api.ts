import { adminApiClient, uploadFile } from "./api-client";

export type Service = {
  id: string;
  category: string;
  name: string;
  description: string | null;
  price: string;
  duration_minutes: number | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export function listServices(includeInactive = false): Promise<Service[]> {
  return adminApiClient<Service[]>(`/api/services?includeInactive=${includeInactive}`);
}

export type CreateServiceInput = {
  category: string;
  name: string;
  description?: string | null;
  price: number;
  durationMinutes?: number | null;
  imageUrl?: string | null;
};

export function createService(input: CreateServiceInput): Promise<Service> {
  return adminApiClient<Service>("/api/services", { method: "POST", body: input });
}

export type UpdateServiceInput = Partial<{
  category: string;
  name: string;
  description: string | null;
  price: number;
  durationMinutes: number | null;
  imageUrl: string | null;
  isActive: boolean;
}>;

export function updateService(id: string, input: UpdateServiceInput): Promise<Service> {
  return adminApiClient<Service>(`/api/services/${id}`, { method: "PATCH", body: input });
}

export function deleteService(id: string): Promise<void> {
  return adminApiClient<void>(`/api/services/${id}`, { method: "DELETE" });
}

export function uploadServiceImage(file: File): Promise<{ url: string }> {
  return uploadFile<{ url: string }>("/api/uploads", file);
}
