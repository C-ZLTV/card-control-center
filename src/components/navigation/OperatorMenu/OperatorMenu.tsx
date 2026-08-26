import "./OperatorMenu.css";
import { Avatar, ActionIcon } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { routes } from "../../../app/navigation";
import { Link } from "react-router-dom";
import { useOperatorStore } from "../../../store/operatorStore";
type OperatorMenuProps = {
  onlyIcon?: boolean;
  iconSize?: "sm" | "md" | "xl";
};

export function OperatorMenu({ onlyIcon = false, iconSize = "md" }: OperatorMenuProps) {
  const operator = useOperatorStore((state) => state.operator);

  return (
    <Link className="operator" to={routes.OPERATOR}>
      <Avatar color="cyan" radius="xl" size={iconSize}>
        {operator?.firstName && operator?.lastName
          ? operator?.firstName[0] + operator?.lastName[0]
          : "0P"}
      </Avatar>
      {!onlyIcon && (
        <>
          <div>
            <div className="operator__name">
              {operator?.firstName} {operator?.lastName}
            </div>
            <div className="operator__role">{operator?.role}</div>
          </div>
          <ActionIcon variant="subtle" aria-label="Operator Settings">
            <ChevronRight color="var(--app-text)" size={20} />
          </ActionIcon>
        </>
      )}
      {/* TODO: Add operator status or other highly relevant information here.
       */}
    </Link>
  );
}
