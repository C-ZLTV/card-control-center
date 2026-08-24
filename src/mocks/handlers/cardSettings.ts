import { http, HttpResponse } from "msw";
import settingsData from "../data/card-settings.json";
import type { CardSettings } from "../../types/card";

export const cardSettingsHandlers = [
  http.get("/api/settings/:cardId", ({ params }) => {
    const { cardId } = params;

    const settings = settingsData.settings.find(
      (setting: CardSettings) => setting.cardId === cardId,
    ) as CardSettings;

    return HttpResponse.json(settings);
    //return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }),
];
