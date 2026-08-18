export type CardStatus =
  | "active"
  | "blocked"
  | "expired"
  | "expiring"
  | "pendingActivation"
  | "suspended";

export type CardNetwork = "Visa" | "Mastercard";

export interface Card {
  last4: string;
  customerName: string;
  branchCity: string;
  branchCode: string;
  cardNetwork: CardNetwork;
  cardStatus: CardStatus;
  activationDate: string;
  expirationDate: string;
}

export interface CardsResponse {
  cards: Card[];
  total: number;
}
