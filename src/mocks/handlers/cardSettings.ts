import { http, HttpResponse } from "msw";
import settingsData from "../data/card-settings.json";
import type { CardSettings, CardSettingsForm } from "../../types/card";

export const cardSettingsHandlers = [
  http.get("/api/settings/:cardId", ({ params }) => {
    const { cardId } = params;

    const settings = settingsData.settings.find(
      (setting: CardSettings) => setting.cardId === cardId,
    );

    if (!settings) {
      return HttpResponse.json({ message: "Card settings not found in GET" }, { status: 404 });
    }

    return HttpResponse.json(settings);
  }),

  http.patch("/api/settings/:cardId", async ({ params, request }) => {
    const { cardId } = params;

    const updatedSettings = (await request.json()) as CardSettingsForm;

    const settingsIndex = settingsData.settings.findIndex(
      (setting: CardSettings) => setting.cardId === cardId,
    );

    if (settingsIndex === -1) {
      return HttpResponse.json({ message: "Card settings not found" }, { status: 404 });
    }

    const updatedCardSettings: CardSettings = {
      ...settingsData.settings[settingsIndex],
      ...updatedSettings,
    };

    settingsData.settings[settingsIndex] = updatedCardSettings;

    //return HttpResponse.json(updatedCardSettings);

    return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }),
];
