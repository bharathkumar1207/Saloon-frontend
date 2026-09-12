import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { RoutesManager } from "./setup/routes-manager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RoutesManager />
    </BrowserRouter>
  </StrictMode>,
);
