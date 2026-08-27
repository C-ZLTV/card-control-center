import { setupServer } from "msw/node";
import { cardHandlers } from "./handlers/cards";
import { transactionHandlers } from "./handlers/transactions";
import { cardSettingsHandlers } from "./handlers/cardSettings";

export const server = setupServer(...cardHandlers, ...transactionHandlers, ...cardSettingsHandlers);
