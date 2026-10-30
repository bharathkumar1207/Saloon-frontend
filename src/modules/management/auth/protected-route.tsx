import { Navigate, Outlet } from "react-router-dom";
import { managementRoutes } from "../../../setup/routes";
import { useAuth } from "./auth-context";
import type { UserRole } from "../../../apis/users-api";

type ProtectedRouteProps = {
  allowedRoles?: UserRole[];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to={managementRoutes.login} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={managementRoutes.dashboard} replace />;
  }

  return <Outlet />;
}
