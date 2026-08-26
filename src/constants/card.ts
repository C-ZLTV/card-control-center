import { colors } from "../theme/colors";
import { type CardNetwork, type CardSetting, type CardStatus } from "../types/card";

export const Networks = {
  VISA: "Visa",
  MASTERCARD: "Mastercard",
} as const satisfies Record<string, CardNetwork>;

export const CardStatuses = {
  ACTIVE: "active",
  BLOCKED: "blocked",
  EXPIRED: "expired",
  EXPIRING: "expiring",
  PENDING_ACTIVATION: "pendingActivation",
  SUSPENDED: "suspended",
} as const satisfies Record<string, CardStatus>;

export const statusColors = {
  [CardStatuses.ACTIVE]: colors.success,
  [CardStatuses.BLOCKED]: colors.danger,
  [CardStatuses.EXPIRED]: colors.danger,
  [CardStatuses.EXPIRING]: colors.warning,
  [CardStatuses.PENDING_ACTIVATION]: colors.info,
  [CardStatuses.SUSPENDED]: colors.warning,
} as const satisfies Record<CardStatus, string>;

export const AllowedSettings = {
  [CardStatuses.ACTIVE]: [
    "cardBlocked",
    "contactlessEnabled",
    "onlinePaymentsEnabled",
    "dailyLimitEnabled",
    "dailyLimit",
  ],

  [CardStatuses.BLOCKED]: ["cardBlocked"],

  [CardStatuses.EXPIRED]: [],

  [CardStatuses.EXPIRING]: [
    "cardBlocked",
    "contactlessEnabled",
    "onlinePaymentsEnabled",
    "dailyLimitEnabled",
    "dailyLimit",
  ],

  [CardStatuses.PENDING_ACTIVATION]: [],

  [CardStatuses.SUSPENDED]: [],
} as const satisfies Record<CardStatus, readonly CardSetting[]>;
