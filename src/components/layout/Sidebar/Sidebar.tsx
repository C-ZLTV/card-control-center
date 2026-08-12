import "./Sidebar.css";
import { NavigationItems } from "../../navigation/NavigationItems/NavigationItems";
import { OperatorMenu } from "../../navigation/OperatorMenu/OperatorMenu";

export function Sidebar() {
  return (
    <aside className="sidebar container">
      <NavigationItems />
      <OperatorMenu />
    </aside>
  );
}
