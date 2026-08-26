import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCardSettings } from "../../api/card-settings";
import type { CardSettingsForm } from "../../types/card";

export function useUpdateCardSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, settings }: { cardId: string; settings: CardSettingsForm }) =>
      updateCardSettings(cardId, settings),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cardSettings", variables.cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
    },
  });
}
