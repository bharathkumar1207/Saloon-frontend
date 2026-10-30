import { adminApiClient, apiClient } from "./api-client";

export type UserRole = "manager" | "employee";

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type LoginResult = { user: SafeUser; token: string };

export function login(email: string, password: string): Promise<LoginResult> {
  return apiClient<LoginResult>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function fetchMe(): Promise<SafeUser> {
  return adminApiClient<SafeUser>("/api/auth/me");
}

export function listUsers(): Promise<SafeUser[]> {
  return adminApiClient<SafeUser[]>("/api/users");
}

export type CreateUserInput = {
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  role: UserRole;
};

export function createUser(input: CreateUserInput): Promise<SafeUser> {
  return adminApiClient<SafeUser>("/api/users", { method: "POST", body: input });
}

export type UpdateUserInput = Partial<{
  name: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
}>;

export function updateUser(id: string, input: UpdateUserInput): Promise<SafeUser> {
  return adminApiClient<SafeUser>(`/api/users/${id}`, { method: "PATCH", body: input });
}

export function deleteUser(id: string): Promise<void> {
  return adminApiClient<void>(`/api/users/${id}`, { method: "DELETE" });
}
