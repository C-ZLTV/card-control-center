import { apiClient } from "./client";
import type { OperatorInfo } from "../types/operator";

export async function getOperatorInfo(): Promise<OperatorInfo> {
  const response = await apiClient.get<OperatorInfo>("/operator-info");

  return response.data;
}
