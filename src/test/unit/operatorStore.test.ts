import { beforeEach, describe, expect, it } from "vitest";
import { useOperatorStore } from "../../store/operatorStore";
import type { OperatorInfo } from "../../types/operator";

describe("useOperatorStore", () => {
  const operator: OperatorInfo = {
    id: "OP-001",
    firstName: "Mario",
    lastName: "Rossi",
    email: "mario.rossi@example.com",
    role: "operator",
    branch: {
      code: "001",
      name: "Main Branch",
      city: "Milan",
    },
    department: "Cards",
    employeeNumber: "EMP-001",
    phoneExtension: "1234",
    locale: "it-IT",
    timezone: "Europe/Rome",
    permissions: ["cards:read", "cards:write"],
    lastLogin: "2026-08-27T09:00:00Z",
  };

  beforeEach(() => {
    useOperatorStore.getState().clearOperator();
  });

  it("has no operator initially", () => {
    expect(useOperatorStore.getState().operator).toBeNull();
  });

  it("sets the operator", () => {
    useOperatorStore.getState().setOperator(operator);

    expect(useOperatorStore.getState().operator).toEqual(operator);
  });

  it("clears the operator", () => {
    useOperatorStore.getState().setOperator(operator);

    useOperatorStore.getState().clearOperator();

    expect(useOperatorStore.getState().operator).toBeNull();
  });
});
