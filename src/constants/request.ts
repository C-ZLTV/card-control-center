import type { RequestStatus } from "../types/request";

export const RequestStatuses = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const satisfies Record<string, RequestStatus>;
