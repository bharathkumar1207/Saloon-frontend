import { Route, Routes } from "react-router-dom";
import { websiteRoutes, managementRoutes } from "./routes";
import { PublicLayout } from "../modules/public-site/layouts/public-layout/public-layout";
import { HomePage } from "../modules/public-site/pages/home-page/home-page";
import { ServicesPage } from "../modules/public-site/pages/services-page/services-page";
import { GalleryPage } from "../modules/public-site/pages/gallery-page/gallery-page";
import { AboutPage } from "../modules/public-site/pages/about-page/about-page";
import { BookingPage } from "../modules/public-site/pages/booking-page/booking-page";
import { ContactPage } from "../modules/public-site/pages/contact-page/contact-page";
import { AdminLayout } from "../modules/management/layouts/admin-layout/admin-layout";
import { ProtectedRoute } from "../modules/management/auth/protected-route";
import { LoginPage } from "../modules/management/pages/login-page/login-page";
import { DashboardPage } from "../modules/management/pages/dashboard-page/dashboard-page";
import { BillingPage } from "../modules/management/pages/billing-page/billing-page";
import { BillsPage } from "../modules/management/pages/bills-page/bills-page";
import { BillDetailPage } from "../modules/management/pages/bill-detail-page/bill-detail-page";
import { AppointmentsPage } from "../modules/management/pages/appointments-page/appointments-page";
import { ServicesPage as AdminServicesPage } from "../modules/management/pages/services-page/services-page";
import { EmployeesPage } from "../modules/management/pages/employees-page/employees-page";
import { PortalUsersPage } from "../modules/management/pages/portal-users-page/portal-users-page";
import { ExpensesPage } from "../modules/management/pages/expenses-page/expenses-page";

export function RoutesManager() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={websiteRoutes.home} element={<HomePage />} />
        <Route path={websiteRoutes.services} element={<ServicesPage />} />
        <Route path={websiteRoutes.gallery} element={<GalleryPage />} />
        <Route path={websiteRoutes.about} element={<AboutPage />} />
        <Route path={websiteRoutes.booking} element={<BookingPage />} />
        <Route path={websiteRoutes.contact} element={<ContactPage />} />
      </Route>

      <Route path={managementRoutes.login} element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={managementRoutes.dashboard} element={<DashboardPage />} />
          <Route path={managementRoutes.billing} element={<BillingPage />} />
          <Route path={managementRoutes.bills} element={<BillsPage />} />
          <Route path={managementRoutes.billDetailPattern} element={<BillDetailPage />} />
          <Route path={managementRoutes.appointments} element={<AppointmentsPage />} />
          <Route path={managementRoutes.services} element={<AdminServicesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
        <Route element={<AdminLayout />}>
          <Route path={managementRoutes.employees} element={<EmployeesPage />} />
          <Route path={managementRoutes.portalUsers} element={<PortalUsersPage />} />
          <Route path={managementRoutes.expenses} element={<ExpensesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
