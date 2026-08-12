import "./OperatorMenu.css";
import { Avatar, ActionIcon } from "@mantine/core";
import { ChevronRight } from "lucide-react";

export function OperatorMenu() {
  return (
    <div className="operator">
      <Avatar color="cyan" radius="xl" size="md">
        RF
      </Avatar>
      <div>
        <div className="operator__name">Raffaele Ferrari</div>
        <div className="operator__role">Operator</div>
      </div>
      <ActionIcon variant="subtle" aria-label="Operator Settings">
        <ChevronRight color="var(--app-text)" size={20} />
      </ActionIcon>
      {/* TODO: Add operator status or other highly relevant information here.
       */}
    </div>
  );
}
