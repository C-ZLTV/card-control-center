import { useQuery } from "@tanstack/react-query";
import { getCardTransactions } from "../../api/transactions";

export function useCardTransactions(cardId: string) {
  return useQuery({
    queryKey: ["cardTransactions", cardId],
    queryFn: () => getCardTransactions(cardId, 5),
    retry: 2,
  });
}
