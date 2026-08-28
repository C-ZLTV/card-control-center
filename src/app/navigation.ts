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
    label: "Lista carte",
    path: routes.DASHBOARD,
    icon: LayoutDashboard,
    category: "main",
  },
  {
    label: "Clienti",
    path: routes.CLIENTS,
    icon: Users,
    category: "main",
  },
  {
    label: "Filiali",
    path: routes.BRANCHES,
    icon: Building,
    category: "main",
  },
  {
    label: "Richieste",
    path: routes.REQUESTS,
    icon: FileText,
    category: "main",
  },
  {
    label: "Transazioni",
    path: routes.TRANSACTIONS,
    icon: CreditCard,
    category: "main",
  },
  {
    label: "Impostazioni",
    path: routes.SETTINGS,
    icon: Settings,
    category: "main",
  },

  {
    label: "Documentazione",
    path: routes.DOCUMENTATION,
    icon: File,
    category: "info",
  },
  {
    label: "Contacttaci",
    path: routes.CONTACTS,
    icon: Headset,
    category: "info",
  },
  {
    label: "Operatore",
    path: routes.OPERATOR,
    category: "utility",
  },
];

export const mainNavItems = routeMeta.filter((route) => route.category === "main");

export const infoNavItems = routeMeta.filter((route) => route.category === "info");
