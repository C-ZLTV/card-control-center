import { type RouteMeta } from "../types/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  CreditCard,
  Settings,
  File,
  Headset,
} from "lucide-react";

export const routes = {
  DASHBOARD: "/",
  CLIENTS: "/clients",
  BRANCHES: "/branches",
  REQUESTS: "/requests",
  TRANSACTIONS: "/transactions",
  SETTINGS: "/settings",
  DOCUMENTATION: "/support",
  CONTACTS: "/contacts",
  OPERATOR: "/operator",
};

export const routeMeta: RouteMeta[] = [
  {
    label: "Dashboard",
    path: routes.DASHBOARD,
    icon: LayoutDashboard,
    category: "main",
  },
  {
    label: "Clients",
    path: routes.CLIENTS,
    icon: Users,
    category: "main",
  },
  {
    label: "Branches",
    path: routes.BRANCHES,
    icon: Building,
    category: "main",
  },
  {
    label: "Requests",
    path: routes.REQUESTS,
    icon: FileText,
    category: "main",
  },
  {
    label: "Transactions",
    path: routes.TRANSACTIONS,
    icon: CreditCard,
    category: "main",
  },
  {
    label: "Settings",
    path: routes.SETTINGS,
    icon: Settings,
    category: "main",
  },

  {
    label: "Documentation",
    path: routes.DOCUMENTATION,
    icon: File,
    category: "info",
  },
  {
    label: "Contact support",
    path: routes.CONTACTS,
    icon: Headset,
    category: "info",
  },
  {
    label: "Operation Information",
    path: routes.OPERATOR,
    category: "utility",
  },
];

export const mainNavItems = routeMeta.filter((route) => route.category === "main");

export const infoNavItems = routeMeta.filter((route) => route.category === "info");
