import { createBrowserRouter } from "react-router-dom";

import { AppShell } from "./AppShell/AppShell.tsx";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage.tsx";
import { WipPage } from "../pages/WipPage/WipPage.tsx";
import { routes } from "./navigation.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: routes.CLIENTS,
        element: <WipPage />,
      },
      {
        path: routes.BRANCHES,
        element: <WipPage />,
      },
      {
        path: routes.REQUESTS,
        element: <WipPage />,
      },
      {
        path: routes.TRANSACTIONS,
        element: <WipPage />,
      },
      {
        path: routes.SETTINGS,
        element: <WipPage />,
      },
      {
        path: routes.DOCUMENTATION,
        element: <WipPage />,
      },
      {
        path: routes.CONTACTS,
        element: <WipPage />,
      },
      {
        path: routes.OPERATOR,
        element: <WipPage />,
      },
    ],
  },
]);
