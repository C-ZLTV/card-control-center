import { useLocation } from "react-router-dom";

import { routeMeta } from "../app/navigation";

export function useCurrentRoute() {
  const { pathname } = useLocation();

  const currentRoute = routeMeta.find((item) => item.path === pathname);

  return {
    pathname,
    label: currentRoute?.label ?? "",
  };
}
