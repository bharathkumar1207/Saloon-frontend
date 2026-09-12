import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
