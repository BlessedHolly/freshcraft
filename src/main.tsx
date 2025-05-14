// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/main.scss";
import App from "./App.tsx";
import "./index.scss";

createRoot(document.getElementById("app")!).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
