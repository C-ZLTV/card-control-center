import "./MainNavigation.css";

import { NavigationItem } from "../NavigationItem/NavigationItem";
import { mainNavItems } from "../../../app/navigation";

export function MainNavigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <ul className="nav__list">
          {mainNavItems.map((item) => {
            return (
              <li key={item.label}>
                <NavigationItem
                  icon={item.icon}
                  title={item.label}
                  to={item.path}
                  onNavigate={onNavigate}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
