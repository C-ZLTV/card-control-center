export type TransactionStatus = "completed" | "pending" | "declined";
export type TransactionDirection = "debit" | "credit";

export type MerchantCategory =
  | "accommodation"
  | "airlines"
  | "automotive"
  | "billsAndUtilities"
  | "cashWithdrawal"
  | "education"
  | "entertainment"
  | "financialServices"
  | "groceryStores"
  | "healthcare"
  | "insurance"
  | "restaurants"
  | "retail"
  | "telecommunications"
  | "transportation"
  | "travel"
  | "governmentServices"
  | "professionalServices"
  | "sportsAndRecreation"
  | "charity"
  | "other";

export type TransactionType =
  | "cardPayment"
  | "cashWithdrawal"
  | "bankTransfer"
  | "directDebit"
  | "recurringPayment"
  | "refund"
  | "fee"
  | "adjustment";

export interface Transaction {
  id: string;
  cardId: string;
  date: string;
  time: string;
  merchantName: string;
  merchantCategory: MerchantCategory;
  amount: number;
  currency: string;
  transactionType: TransactionType;
  direction: TransactionDirection;
  status: TransactionStatus;
  location: string;
  cardLast4: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
}
