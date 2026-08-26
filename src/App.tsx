import { useEffect } from "react";
import "./App.css";

import { MantineProvider } from "@mantine/core";

import { theme } from "./theme/theme";
import { resolver } from "./theme/resolver.ts";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useOperatorInfo } from "./hooks/api/useOperatorInfo.ts";
import { useOperatorStore } from "./store/operatorStore.ts";

const queryClient = new QueryClient();

function OperatorInitializer() {
  const { data: operator } = useOperatorInfo();

  const setOperator = useOperatorStore((state) => state.setOperator);

  useEffect(() => {
    if (operator) {
      setOperator(operator);
    }
  }, [operator, setOperator]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
        <OperatorInitializer />

        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
