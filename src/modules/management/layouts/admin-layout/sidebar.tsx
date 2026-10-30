import { NavLink } from "react-router-dom";
import { managementRoutes } from "../../../../setup/routes";
import { useAuth } from "../../auth/auth-context";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? "bg-primary-50 text-primary-700" : "text-muted hover:bg-background"
  }`;

export function Sidebar() {
  const { user, logout } = useAuth();
  const isManager = user?.role === "manager";

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface p-4">
      <div className="px-2 pb-4">
        <p className="text-lg font-semibold text-foreground">Vismaya</p>
        <p className="text-xs text-muted">Management Portal</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
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
          className="mt-2 w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted hover:bg-background"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
