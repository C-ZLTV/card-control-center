import { apiClient } from "./client";
import type { CardSettings } from "../types/card";

export async function getCardSettings(cardId: string): Promise<CardSettings> {
  const response = await apiClient.get<CardSettings>(`/settings/${cardId}`);

  return response.data;
}
