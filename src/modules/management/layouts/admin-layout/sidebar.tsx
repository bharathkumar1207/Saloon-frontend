import { NavLink } from "react-router-dom";
import { managementRoutes } from "../../../../setup/routes";
import { useAuth } from "../../auth/auth-context";
import logo from "../../../../assets/logo.png";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `border-l-2 px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "border-gold-500 bg-ink-900 text-background"
      : "border-transparent text-muted hover:bg-background"
  }`;

export function Sidebar() {
  const { user, logout } = useAuth();
  const isManager = user?.role === "manager";

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface p-4">
      <div className="flex items-center gap-2 border-b border-border px-2 pb-4">
        <img src={logo} alt="Vismaya" className="h-12 w-auto shrink-0" />
        <div>
          <p className="font-display text-sm leading-tight font-semibold text-foreground">
            Sri Lakshmi Varahi Enterprises
          </p>
          <p className="eyebrow mt-1 text-silver-600">Management Portal</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 pt-4">
        <NavLink to={managementRoutes.dashboard} className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to={managementRoutes.billing} className={navLinkClass}>
          New Bill
        </NavLink>
        <NavLink to={managementRoutes.bills} className={navLinkClass}>
          Bills
        </NavLink>
        <NavLink to={managementRoutes.appointments} className={navLinkClass}>
          Appointments
        </NavLink>
        <NavLink to={managementRoutes.services} className={navLinkClass}>
          Services
        </NavLink>
        {isManager ? (
          <>
            <NavLink to={managementRoutes.employees} className={navLinkClass}>
              Employees
            </NavLink>
            <NavLink to={managementRoutes.portalUsers} className={navLinkClass}>
              Portal Users
            </NavLink>
            <NavLink to={managementRoutes.expenses} className={navLinkClass}>
              Expenses
            </NavLink>
          </>
        ) : null}
      </nav>

      <div className="border-t border-border pt-4">
        <p className="px-2 text-sm font-medium text-foreground">{user?.name}</p>
        <p className="px-2 text-xs text-muted capitalize">{user?.role}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-2 w-full px-3 py-2 text-left text-sm font-medium text-muted hover:bg-background"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
