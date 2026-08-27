import { http, HttpResponse } from "msw";

import settingsData from "../data/card-settings.json";
import cardData from "../data/card-list.json";

import type { CardSettings, CardSettingsForm } from "../../types/card";

const initialSettings = structuredClone(settingsData.settings);
const initialCards = structuredClone(cardData.cards);

let currentSettings = structuredClone(initialSettings);

const previousCardStatuses: Record<string, string> = {};

export function resetCardSettingsMock() {
  currentSettings = structuredClone(initialSettings);

  cardData.cards.splice(0, cardData.cards.length, ...structuredClone(initialCards));

  Object.keys(previousCardStatuses).forEach((cardId) => {
    delete previousCardStatuses[cardId];
  });
}

export const cardSettingsHandlers = [
  http.get("/api/settings/:cardId", ({ params }) => {
    const { cardId } = params;

    const settings = currentSettings.find((setting: CardSettings) => setting.cardId === cardId);

    if (!settings) {
      return HttpResponse.json({ message: "Card settings not found in GET" }, { status: 404 });
    }

    return HttpResponse.json(settings);
  }),

  http.patch("/api/settings/:cardId", async ({ params, request }) => {
    const { cardId } = params;

    if (typeof cardId !== "string") {
      return HttpResponse.json({ message: "Invalid cardId" }, { status: 400 });
    }

    const updatedSettings = (await request.json()) as CardSettingsForm;

    const settingsIndex = currentSettings.findIndex(
      (setting: CardSettings) => setting.cardId === cardId,
    );

    if (settingsIndex === -1) {
      return HttpResponse.json({ message: "Card settings not found" }, { status: 404 });
    }

    const updatedCardSettings: CardSettings = {
      ...currentSettings[settingsIndex],
      ...updatedSettings,
    };

    currentSettings[settingsIndex] = updatedCardSettings;

    const cardIndex = cardData.cards.findIndex((card) => card.cardId === cardId);

    if (cardIndex !== -1) {
      if (updatedSettings.cardBlocked) {
        if (!previousCardStatuses[cardId]) {
          previousCardStatuses[cardId] = cardData.cards[cardIndex].cardStatus;
        }

        cardData.cards[cardIndex].cardStatus = "blocked";
      } else {
        cardData.cards[cardIndex].cardStatus = previousCardStatuses[cardId] ?? "active";

        delete previousCardStatuses[cardId];
      }
    }

    return HttpResponse.json(updatedCardSettings);
  }),
];
