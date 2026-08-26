import { cardHandlers } from "./cards";
import { cardSettingsHandlers } from "./cardSettings";
import { transactionHandlers } from "./transactions";
import { operatorInfoHandlers } from "./operatorInfo";

export const handlers = [
  ...cardHandlers,
  ...cardSettingsHandlers,
  ...transactionHandlers,
  ...operatorInfoHandlers,
];
