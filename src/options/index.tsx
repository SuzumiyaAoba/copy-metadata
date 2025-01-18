import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import Options from "./Options.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Options />
  </StrictMode>
);
