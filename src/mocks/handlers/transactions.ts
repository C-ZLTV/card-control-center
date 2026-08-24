import { http, HttpResponse } from "msw";
import transactionData from "../data/transaction-list.json";
import type { Transaction } from "../../types/transaction";

export const transactionHandlers = [
  http.get("/api/transactions/:cardId", ({ request, params }) => {
    const url = new URL(request.url);

    const { cardId } = params;
    const limit = Number(url.searchParams.get("limit") ?? 10);
    const offset = Number(url.searchParams.get("offset") ?? 0);

    const transactions = transactionData.transactions.filter(
      (transaction) => transaction.cardId === cardId,
    ) as Transaction[];

    const paginatedTransactions = transactions.slice(offset, offset + limit);

    /*  return HttpResponse.json({
      transactions: paginatedTransactions,
      total: paginatedTransactions.length,
    }); */

    return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }),
];
