import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./fonts.css";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";

import { theme } from "./theme/theme";
import { resolver } from "./theme/resolver.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
);
