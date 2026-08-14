import "./Sidebar.css";
import { MainNavigation } from "../../navigation/MainNavigation/MainNavigation";
import { OperatorMenu } from "../../navigation/OperatorMenu/OperatorMenu";

export function Sidebar() {
  return (
    <aside className="sidebar container">
      <MainNavigation />
      <OperatorMenu />
    </aside>
  );
}
