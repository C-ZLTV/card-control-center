import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCards } from "../../api/cards";
import type { CardsParams } from "../../types/card";

export function useCards({ page, limit, filters }: CardsParams) {
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ["cards", page, filters],
    queryFn: () =>
      getCards({
        ...filters,
        limit,
        offset,
      }),

    placeholderData: keepPreviousData,
  });
}
