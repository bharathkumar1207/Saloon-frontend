export const websiteRoutes = {
  home: "/",
  services: "/services",
  gallery: "/gallery",
  about: "/about",
  booking: "/booking",
  contact: "/contact",
} as const;

export const managementRoutes = {
  login: "/admin/login",
  dashboard: "/admin/dashboard",
  billing: "/admin/billing",
  bills: "/admin/bills",
  billDetailPattern: "/admin/bills/:id",
  billDetail: (id: string) => `/admin/bills/${id}`,
  appointments: "/admin/appointments",
  services: "/admin/services",
  employees: "/admin/employees",
  portalUsers: "/admin/portal-users",
  expenses: "/admin/expenses",
} as const;
