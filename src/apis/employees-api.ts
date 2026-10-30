import { adminApiClient } from "./api-client";

export type Employee = {
  id: string;
  user_id: string | null;
  name: string;
  mobile: string;
  designation: string | null;
  salary: string | null;
  joined_date: string | null;
  aadhar_number: string | null;
  address: string | null;
  email: string | null;
  date_of_birth: string | null;
  gender: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  bank_account_number: string | null;
  bank_ifsc: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export function listEmployees(includeInactive = false): Promise<Employee[]> {
  return adminApiClient<Employee[]>(`/api/employees?includeInactive=${includeInactive}`);
}

export type CreateEmployeeInput = {
  name: string;
  mobile: string;
  designation?: string | null;
  salary?: number | null;
  joinedDate?: string | null;
  aadharNumber?: string | null;
  address?: string | null;
  email?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  bankAccountNumber?: string | null;
  bankIfsc?: string | null;
};

export function createEmployee(input: CreateEmployeeInput): Promise<Employee> {
  return adminApiClient<Employee>("/api/employees", { method: "POST", body: input });
}

export type UpdateEmployeeInput = Partial<CreateEmployeeInput & { isActive: boolean }>;

export function updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
  return adminApiClient<Employee>(`/api/employees/${id}`, { method: "PATCH", body: input });
}

export function deleteEmployee(id: string): Promise<void> {
  return adminApiClient<void>(`/api/employees/${id}`, { method: "DELETE" });
}
