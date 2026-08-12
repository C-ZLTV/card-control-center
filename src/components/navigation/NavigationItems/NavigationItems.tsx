import "./NavigationItems.css";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  CreditCard,
  Settings,
  BellDot,
  type LucideIcon,
} from "lucide-react";

type NavigationItemProps = {
  icon: LucideIcon;
  title: string;
};

function NavigationItem({ icon: Icon, title }: NavigationItemProps) {
  return (
    <a href="/dashboard">
      <div className="nav__item">
        <Icon className="nav__icon" size={20} strokeWidth={1.5} />
        <div>{title}</div>
      </div>
    </a>
  );
}

export function NavigationItems() {
  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <ul className="nav__list">
          <li>
            <NavigationItem icon={LayoutDashboard} title="Dashboard" />
          </li>
          <li>
            <NavigationItem icon={Users} title="Clients" />
          </li>
          <li>
            <NavigationItem icon={Building} title="Branches" />
          </li>
          <li>
            <NavigationItem icon={FileText} title="Requests" />
          </li>
          <li>
            <NavigationItem icon={CreditCard} title="Transactions" />
          </li>
          <li>
            <NavigationItem icon={Settings} title="Settings" />
          </li>
        </ul>
      </nav>
    </>
  );
}
