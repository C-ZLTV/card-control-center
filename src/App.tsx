import "./App.css";

import { MantineProvider } from "@mantine/core";

import { theme } from "./theme/theme";
import { resolver } from "./theme/resolver.ts";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
