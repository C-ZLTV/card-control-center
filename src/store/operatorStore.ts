import { create } from "zustand";
import type { OperatorInfo } from "../types/operator";

interface OperatorStore {
  operator: OperatorInfo | null;
  setOperator: (operator: OperatorInfo) => void;
  clearOperator: () => void;
}

export const useOperatorStore = create<OperatorStore>((set) => ({
  operator: null,

  setOperator: (operator) => set({ operator }),

  clearOperator: () => set({ operator: null }),
}));
