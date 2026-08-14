import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

import "./NavigationItem.css";

type NavigationItemProps = {
  icon?: LucideIcon;
  title: string;
  to: string;
  onNavigate?: () => void;
  className?: string;
};

export function NavigationItem({
  icon: Icon,
  title,
  to,
  onNavigate,
  className,
}: NavigationItemProps) {
  console.log("NavigationItem className:", className);

  return (
    <Link to={to} onClick={onNavigate}>
      <div className={`navigation__item ${className ?? ""}`}>
        {Icon && <Icon size={20} strokeWidth={1.5} />}
        <div>{title}</div>
      </div>
    </Link>
  );
}
