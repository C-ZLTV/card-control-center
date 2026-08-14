import "./App.css";

import { MantineProvider } from "@mantine/core";

import { theme } from "./theme/theme";
import { resolver } from "./theme/resolver.ts";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";

function App() {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
