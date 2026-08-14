import "./OperatorMenu.css";
import { Avatar, ActionIcon } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { routes } from "../../../app/navigation";
import { Link } from "react-router-dom";

type OperatorMenuProps = {
  onlyIcon?: boolean;
  iconSize?: "sm" | "md" | "xl";
};

export function OperatorMenu({ onlyIcon = false, iconSize = "md" }: OperatorMenuProps) {
  return (
    <Link className="operator" to={routes.OPERATOR}>
      <Avatar color="cyan" radius="xl" size={iconSize}>
        RF
      </Avatar>
      {!onlyIcon && (
        <>
          <div>
            <div className="operator__name">Raffaele Ferrari</div>
            <div className="operator__role">Operator</div>
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
