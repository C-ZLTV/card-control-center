import { apiClient } from "./client";
import type { CardSettings, CardSettingsForm } from "../types/card";

export async function getCardSettings(cardId: string): Promise<CardSettings> {
  const response = await apiClient.get<CardSettings>(`/settings/${cardId}`);

  return response.data;
}

export async function updateCardSettings(
  cardId: string,
  settings: CardSettingsForm,
): Promise<CardSettings> {
  const response = await apiClient.patch<CardSettings>(`/settings/${cardId}`, settings);

  return response.data;
}
