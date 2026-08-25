import { useQuery } from "@tanstack/react-query";
import { getCardSettings } from "../../api/card-settings";

export function useCardSettings(cardId: string) {
  return useQuery({
    queryKey: ["cardSettings", cardId],
    queryFn: () => getCardSettings(cardId),
    retry: 2,
  });
}
