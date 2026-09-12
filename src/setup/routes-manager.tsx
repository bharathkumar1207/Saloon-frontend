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
import { LoginPage } from "../modules/management/pages/login-page/login-page";
import { DashboardPage } from "../modules/management/pages/dashboard-page/dashboard-page";
import { EmployeeListPage } from "../modules/management/pages/employees/employee-list-page/employee-list-page";
import { FinanceOverviewPage } from "../modules/management/pages/finance/finance-overview-page/finance-overview-page";

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
      <Route element={<AdminLayout />}>
        <Route path={managementRoutes.dashboard} element={<DashboardPage />} />
        <Route path={managementRoutes.employees} element={<EmployeeListPage />} />
        <Route path={managementRoutes.finance} element={<FinanceOverviewPage />} />
      </Route>
    </Routes>
  );
}
