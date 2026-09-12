import { Link } from "react-router-dom";
import { managementRoutes } from "../../../../setup/routes";

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-border bg-surface p-4">
      <nav className="flex flex-col gap-2 text-sm font-medium text-muted">
        <Link to={managementRoutes.dashboard}>Dashboard</Link>
        <Link to={managementRoutes.employees}>Employees</Link>
        <Link to={managementRoutes.finance}>Finance</Link>
      </nav>
    </aside>
  );
}
