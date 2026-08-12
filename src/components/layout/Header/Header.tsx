import { Menu, BellDot, CircleQuestionMark } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { ThemeToggle } from "../../../theme/ThemeToggle";
import { Avatar, ActionIcon, Drawer, Group, HoverCard, Text } from "@mantine/core";
import "./Header.css";
import { NavigationItems } from "../../navigation/NavigationItems/NavigationItems";
export function Header() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <header className="container header">
      <div className="header__menu">
        <ActionIcon variant="subtle" aria-label="Open menu" onClick={open}>
          <Menu color="var(--app-text)" />
        </ActionIcon>
      </div>

      <div className="header__title">Dashboard</div>

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
        <Group justify="center">
          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <ActionIcon className="header__help" variant="subtle" aria-label="Help">
                <CircleQuestionMark color="var(--app-text)" size={20} strokeWidth={1.5} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">
                TODO: Add help redirects on step 4 Routing + App Shell (Keyboard shortcuts Help &
                Support Documentation Contact support)
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        {/*         TODO: Add avatar redirects on step 3 Routing + App Shell
         */}
        <div className="header__avatar">
          <Avatar color="cyan" radius="xl" size="sm">
            RF
          </Avatar>
        </div>
        <div className="header__theme">
          <ThemeToggle />
        </div>
      </div>

      <Drawer opened={opened} onClose={close}>
        <NavigationItems />
      </Drawer>
    </header>
  );
}
