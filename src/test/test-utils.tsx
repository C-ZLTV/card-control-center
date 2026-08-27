import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

import { theme } from "../theme/theme";
import { resolver } from "../theme/resolver";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function renderWithQueryClient(ui: ReactNode) {
  const queryClient = createTestQueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
          {ui}
        </MantineProvider>
      </QueryClientProvider>
    </MemoryRouter>,
  );
}
