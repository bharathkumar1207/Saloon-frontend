import { adminApiClient } from "./api-client";

export type PaymentMethod = "cash" | "card" | "upi" | "other";
export type PaymentStatus = "paid" | "pending" | "partial";

export type Bill = {
  id: string;
  bill_number: string;
  appointment_id: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type BillItem = {
  id: string;
  bill_id: string;
  service_id: string;
  employee_id: string;
  description: string;
  price: string;
  quantity: number;
  created_at: string;
};

export function listBills(): Promise<Bill[]> {
  return adminApiClient<Bill[]>("/api/bills");
}

export function getBill(id: string): Promise<Bill & { items: BillItem[] }> {
  return adminApiClient<Bill & { items: BillItem[] }>(`/api/bills/${id}`);
}

export type CreateBillItemInput = {
  serviceId: string;
  employeeId: string;
  description: string;
  price: number;
  quantity?: number;
};

export type CreateBillInput = {
  appointmentId?: string | null;
  discount?: number;
  tax?: number;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  items: CreateBillItemInput[];
};

export function createBill(input: CreateBillInput): Promise<{ bill: Bill; items: BillItem[] }> {
  return adminApiClient<{ bill: Bill; items: BillItem[] }>("/api/bills", {
    method: "POST",
    body: input,
  });
}

export type EmployeeRevenue = {
  employee_id: string;
  employee_name: string;
  total_revenue: string;
  services_count: string;
};

export function getRevenueByEmployee(range?: {
  from?: string;
  to?: string;
}): Promise<EmployeeRevenue[]> {
  const params = new URLSearchParams();
  if (range?.from) params.set("from", range.from);
  if (range?.to) params.set("to", range.to);
  const query = params.toString();
  return adminApiClient<EmployeeRevenue[]>(
    `/api/bills/revenue-by-employee${query ? `?${query}` : ""}`,
  );
}
