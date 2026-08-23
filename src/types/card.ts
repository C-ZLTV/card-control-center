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

export type CardFilters = {
  branchCode?: string;
  status?: CardStatus | "all";
  startExpirationDate?: string;
  endExpirationDate?: string;
  startActivationDate?: string;
  endActivationDate?: string;
  pan?: string;
};

export interface CardSettings {
  cardBlocked: boolean;
  contactlessEnabled: boolean;
  onlinePaymentsEnabled: boolean;
  dailyLimitEnabled: boolean;
  dailyLimit: number;
}
