import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import Options from "./Options.tsx";
import { ConfigProvider } from "@/libs/contexts/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <Options />
    </ConfigProvider>
  </StrictMode>,
);
