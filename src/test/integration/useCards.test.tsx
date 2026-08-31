import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ReactNode } from "react";

import { useCards } from "../../hooks/api/useCards";
import { CardStatuses } from "../../constants/card";
import type { CardFilters } from "../../types/card";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function createWrapper() {
  const queryClient = createTestQueryClient();

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe("useCards", () => {
  const filters: CardFilters = {
    cardId: "",
    branchCode: "",
    status: "all",
    startExpirationDate: "",
    endExpirationDate: "",
    startActivationDate: "",
    endActivationDate: "",
  };

  it("fetches cards successfully", async () => {
    const { result } = renderHook(
      () =>
        useCards({
          page: 1,
          limit: 10,
          filters,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.cards).toHaveLength(10);

    expect(result.current.data?.cards[0]).toMatchObject({
      cardId: "CARD-CTR-84739261501",
      cardStatus: CardStatuses.ACTIVE,
    });
  });

  it("fetches the second page", async () => {
    const { result } = renderHook(
      () =>
        useCards({
          page: 2,
          limit: 10,
          filters,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();

    expect(result.current.data?.cards).toHaveLength(10);

    expect(result.current.data?.cards[0]).toMatchObject({
      cardId: "CARD-CTR-84739261511",
    });
  });

  it("applies filters when fetching cards", async () => {
    const filteredFilters: CardFilters = {
      ...filters,
      status: CardStatuses.BLOCKED,
    };

    const { result } = renderHook(
      () =>
        useCards({
          page: 1,
          limit: 10,
          filters: filteredFilters,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.cards.length).toBeGreaterThan(0);

    expect(
      result.current.data?.cards.every((card) => card.cardStatus === CardStatuses.BLOCKED),
    ).toBe(true);
  });
});
