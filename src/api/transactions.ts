import { apiClient } from "./client";
import type { TransactionsResponse } from "../types/transaction";

export async function getCardTransactions(
  cardId: string,
  limit = 5,
): Promise<TransactionsResponse> {
  const response = await apiClient.get<TransactionsResponse>(`/transactions/${cardId}`, {
    params: {
      limit,
    },
  });

  return response.data;
}
