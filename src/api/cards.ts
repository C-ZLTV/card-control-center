import { apiClient } from "./client";
import type { CardFilters, CardsResponse } from "../types/card";

type GetCardsParams = CardFilters & {
  limit: number;
  offset: number;
};

export async function getCards(params: GetCardsParams): Promise<CardsResponse> {
  const response = await apiClient.get<CardsResponse>("/cards", {
    params,
  });

  return response.data;
}
