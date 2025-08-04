import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Options from "./chrome-extension/options/index";
import "./chrome-extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="h-vh w-auto bg-white dark:bg-gray-900">
      <Options />
    </div>
  </StrictMode>
);
