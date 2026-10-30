import { adminApiClient } from "./api-client";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";

export type Appointment = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  service_id: string;
  employee_id: string | null;
  appointment_date: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export function listAppointments(filters?: {
  employeeId?: string;
  status?: AppointmentStatus;
}): Promise<Appointment[]> {
  const params = new URLSearchParams();
  if (filters?.employeeId) params.set("employeeId", filters.employeeId);
  if (filters?.status) params.set("status", filters.status);
  const query = params.toString();
  return adminApiClient<Appointment[]>(`/api/appointments${query ? `?${query}` : ""}`);
}

export type CreateAppointmentInput = {
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  serviceId: string;
  employeeId?: string | null;
  appointmentDate: string;
  notes?: string | null;
};

export function createAppointment(input: CreateAppointmentInput): Promise<Appointment> {
  return adminApiClient<Appointment>("/api/appointments", { method: "POST", body: input });
}

export type UpdateAppointmentInput = Partial<{
  employeeId: string | null;
  appointmentDate: string;
  status: AppointmentStatus;
  notes: string | null;
}>;

export function updateAppointment(
  id: string,
  input: UpdateAppointmentInput,
): Promise<Appointment> {
  return adminApiClient<Appointment>(`/api/appointments/${id}`, { method: "PATCH", body: input });
}

export function deleteAppointment(id: string): Promise<void> {
  return adminApiClient<void>(`/api/appointments/${id}`, { method: "DELETE" });
}
