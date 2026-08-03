import { ActionIcon } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant="outline" onClick={toggleColorScheme}>
      {colorScheme === "dark" ? (
        <Sun color="var(--app-text)" size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </ActionIcon>
  );
}
