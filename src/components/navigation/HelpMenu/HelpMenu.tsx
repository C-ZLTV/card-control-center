import { CircleQuestionMark } from "lucide-react";

import { ActionIcon, Group, HoverCard } from "@mantine/core";
import { infoNavItems } from "../../../app/navigation";
import { NavigationItem } from "../../navigation/NavigationItem/NavigationItem";

import "./HelpMenu.css";

export function HelpMenu() {
  return (
    <Group justify="center">
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
          <ActionIcon className="header__help" variant="subtle" aria-label="Help">
            <CircleQuestionMark color="var(--app-text)" size={20} strokeWidth={1.5} />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <div className="help__navigation">
            {infoNavItems.map((item) => {
              console.log("passo className:", "navigation__item--help");

              return (
                <NavigationItem
                  className={"navigation__item--help"}
                  icon={item.icon}
                  title={item.label}
                  to={item.path}
                />
              );
            })}
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
