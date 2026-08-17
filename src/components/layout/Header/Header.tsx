import { Menu, BellDot } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { ThemeToggle } from "../../theme/ThemeToggle/ThemeToggle";
import { Avatar, ActionIcon, Drawer, Group, HoverCard } from "@mantine/core";
import "./Header.css";
import { MainNavigation } from "../../navigation/MainNavigation/MainNavigation";
import { useCurrentRoute } from "../../../hooks/useCurrentRoutes";
import { HelpMenu } from "../../navigation/HelpMenu/HelpMenu";
import { OperatorMenu } from "../../navigation/OperatorMenu/OperatorMenu";

export function Header() {
  const [opened, { open, close }] = useDisclosure(false);

  const { label } = useCurrentRoute();

  return (
    <header className="container header">
      <div className="header__menu">
        <ActionIcon variant="subtle" aria-label="Open menu" onClick={open}>
          <Menu color="var(--app-text)" />
        </ActionIcon>
      </div>

      <div className="header__title">{label}</div>

      <div className="header__actions">
        <Group justify="center">
          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <ActionIcon
                className="header__notification"
                variant="subtle"
                aria-label="Notifications"
              >
                <BellDot color="var(--app-text)" size={20} strokeWidth={1.5} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              TODO: Add notification content on step 8 Mock API (MSW)
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <HelpMenu />
        <div className="header__avatar">
          <OperatorMenu onlyIcon iconSize="sm" />
        </div>
        <div className="header__theme">
          <ThemeToggle />
        </div>
      </div>
      <Drawer opened={opened} onClose={close}>
        <MainNavigation onNavigate={close} />
      </Drawer>
    </header>
  );
}
