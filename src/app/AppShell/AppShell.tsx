import { Outlet } from "react-router-dom";

import "./AppShell.css";

import { Header } from "../../components/layout/Header/Header";
import { Sidebar } from "../../components/layout/Sidebar/Sidebar";

export function AppShell() {
  return (
    <div className="Shell">
      <Header />
      <div className="shell__layout">
        <Sidebar />
        <main className="shell__content container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
