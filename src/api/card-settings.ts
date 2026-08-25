import { apiClient } from "./client";
import type { CardSettings } from "../types/card";

export async function getCardSettings(cardId: string): Promise<CardSettings> {
  const response = await apiClient.get<CardSettings>(`/settings/${cardId}`);

  return response.data;
}

export async function updateCardSettings(
  cardId: string,
  settings: CardSettings,
): Promise<CardSettings> {
  const response = await apiClient.patch<CardSettings>(`/settings/${cardId}`, settings);

  return response.data;
}
