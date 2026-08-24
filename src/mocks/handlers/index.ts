import { cardHandlers } from "./cards";
import { cardSettingsHandlers } from "./cardSettings";
import { transactionHandlers } from "./transactions";

export const handlers = [...cardHandlers, ...transactionHandlers, ...cardSettingsHandlers];
