import { http, HttpResponse } from "msw";
import cardData from "../data/card-list.json";
import type { Card } from "../../types/card";

export const cardHandlers = [
  http.get("/api/cards", ({ request }) => {
    const url = new URL(request.url);

    const limit = Number(url.searchParams.get("limit") ?? 10);
    const offset = Number(url.searchParams.get("offset") ?? 0);

    const branchCode = url.searchParams.get("branchCode");
    const status = url.searchParams.get("status");
    const startExpirationDate = url.searchParams.get("startExpirationDate");
    const endExpirationDate = url.searchParams.get("endExpirationDate");
    const startActivationDate = url.searchParams.get("startActivationDate");
    const endActivationDate = url.searchParams.get("endActivationDate");
    const pan = url.searchParams.get("pan");

    let cards = cardData.cards as Card[];

    if (branchCode) {
      cards = cards.filter((card) => card.branchCode === branchCode);
    }
    if (status && status !== "all") {
      cards = cards.filter((card) => card.cardStatus === status);
    }
    if (pan) {
      cards = cards.filter((card) => card.last4.includes(pan));
    }
    if (startExpirationDate) {
      cards = cards.filter((card) => card.expirationDate >= startExpirationDate);
    }
    if (endExpirationDate) {
      cards = cards.filter((card) => card.expirationDate <= endExpirationDate);
    }
    if (startActivationDate) {
      cards = cards.filter((card) => card.activationDate >= startActivationDate);
    }

    if (endActivationDate) {
      cards = cards.filter((card) => card.activationDate <= endActivationDate);
    }

    const paginatedCards = cards.slice(offset, offset + limit);

    return HttpResponse.json({
      cards: paginatedCards,
      total: cards.length,
    });

    //return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }),
];
