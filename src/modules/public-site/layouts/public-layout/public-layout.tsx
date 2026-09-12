import { Outlet } from "react-router-dom";
import { AnnouncementBar } from "./announcement-bar";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
