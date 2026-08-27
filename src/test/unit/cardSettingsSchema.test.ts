import { describe, expect, it } from "vitest";
import { cardSettingsSchema } from "../../schemas/cardSettings.schema";

describe("cardSettingsSchema", () => {
  it("accepts valid card settings", () => {
    const validSettings = {
      cardBlocked: false,
      contactlessEnabled: true,
      onlinePaymentsEnabled: true,
      dailyLimitEnabled: true,
      dailyLimit: 1000,
    };

    const result = cardSettingsSchema.safeParse(validSettings);

    expect(result.success).toBe(true);
  });

  it("rejects a daily limit below the minimum", () => {
    const invalidSettings = {
      cardBlocked: false,
      contactlessEnabled: true,
      onlinePaymentsEnabled: true,
      dailyLimitEnabled: true,
      dailyLimit: 49,
    };

    const result = cardSettingsSchema.safeParse(invalidSettings);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Il limite minimo è di 50 €");
    }
  });

  it("rejects a daily limit above the maximum", () => {
    const invalidSettings = {
      cardBlocked: false,
      contactlessEnabled: true,
      onlinePaymentsEnabled: true,
      dailyLimitEnabled: true,
      dailyLimit: 5001,
    };

    const result = cardSettingsSchema.safeParse(invalidSettings);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Il limite massimo è di 5.000 €");
    }
  });

  it("accepts the minimum daily limit", () => {
    const settings = {
      cardBlocked: false,
      contactlessEnabled: true,
      onlinePaymentsEnabled: true,
      dailyLimitEnabled: true,
      dailyLimit: 50,
    };

    expect(cardSettingsSchema.safeParse(settings).success).toBe(true);
  });

  it("accepts the maximum daily limit", () => {
    const settings = {
      cardBlocked: false,
      contactlessEnabled: true,
      onlinePaymentsEnabled: true,
      dailyLimitEnabled: true,
      dailyLimit: 5000,
    };

    expect(cardSettingsSchema.safeParse(settings).success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const incompleteSettings = {
      cardBlocked: false,
      contactlessEnabled: true,
    };

    const result = cardSettingsSchema.safeParse(incompleteSettings);

    expect(result.success).toBe(false);
  });
});
