import { type LucideIcon } from "lucide-react";

export type RouteCategory = "main" | "info" | "utility";

export type RouteMeta = {
  label: string;
  path: string;
  icon?: LucideIcon;
  category: RouteCategory;
};
