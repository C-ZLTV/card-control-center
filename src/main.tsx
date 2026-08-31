import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./fonts.css";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import App from "./App.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  await worker.start({
    onUnhandledRequest: "warn",
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
