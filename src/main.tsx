import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { RoutesManager } from "./setup/routes-manager";
import { AuthProvider } from "./modules/management/auth/auth-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <RoutesManager />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
