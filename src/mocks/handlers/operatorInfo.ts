import { http, HttpResponse } from "msw";
import operatorInfo from "../data/operator-info.json";
import type { OperatorInfo } from "../../types/operator";

export const operatorInfoHandlers = [
  http.get("/api/operator-info", () => {
    return HttpResponse.json(operatorInfo as OperatorInfo);
  }),
];
