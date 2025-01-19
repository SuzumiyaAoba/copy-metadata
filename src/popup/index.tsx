import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import "./popup.css";
import { Popup } from "./Popup";
import { ConfigProvider } from "@/libs/contexts/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <Popup />
    </ConfigProvider>
  </StrictMode>,
);
