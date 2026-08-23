import { type TransactionDirection } from "../types/transaction";
import { colors } from "../theme/colors";

export const Directions = {
  CREDIT: "credit",
  DEBIT: "debit",
} as const satisfies Record<string, TransactionDirection>;

export const directionConfigs = {
  [Directions.CREDIT]: { color: colors.success, symbol: "-" },
  [Directions.DEBIT]: { color: colors.danger, symbol: "+" },
};
