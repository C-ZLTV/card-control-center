import { useQuery } from "@tanstack/react-query";
import { getOperatorInfo } from "../../api/operator-info";

export function useOperatorInfo() {
  return useQuery({
    queryKey: ["operatorInfo"],
    queryFn: getOperatorInfo,
    retry: 2,
  });
}
