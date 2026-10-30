import { adminApiClient } from "./api-client";
import type { PaymentMethod } from "./bills-api";

export type ExpenseCategory =
  | "rent"
  | "utilities"
  | "supplies"
  | "salary"
  | "maintenance"
  | "marketing"
  | "other";

export type Expense = {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: string;
  paid_to: string | null;
  payment_method: PaymentMethod;
  recorded_by: string | null;
  expense_date: string;
  created_at: string;
};

export function listExpenses(filters?: { from?: string; to?: string }): Promise<Expense[]> {
  const params = new URLSearchParams();
  if (filters?.from) params.set("from", filters.from);
  if (filters?.to) params.set("to", filters.to);
  const query = params.toString();
  return adminApiClient<Expense[]>(`/api/expenses${query ? `?${query}` : ""}`);
}

export type CreateExpenseInput = {
  category: ExpenseCategory;
  description: string;
  amount: number;
  paidTo?: string | null;
  paymentMethod?: PaymentMethod;
  expenseDate?: string;
};

export function createExpense(input: CreateExpenseInput): Promise<Expense> {
  return adminApiClient<Expense>("/api/expenses", { method: "POST", body: input });
}

export function deleteExpense(id: string): Promise<void> {
  return adminApiClient<void>(`/api/expenses/${id}`, { method: "DELETE" });
}
