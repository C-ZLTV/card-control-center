import { ActionIcon } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    //TODO: add a switch to toggle between light and dark mode
    /*   <>
      <Switch
        onClick={toggleColorScheme}
        size="md"
        color={colorScheme === "dark" ? "var(--app-warning)" : "var(--app-divider)"}
        offLabel={<Sun color="var(--mantine-color-blue-6)" size={16} strokeWidth={1.5} />}
        onLabel={<Moon color="var(--mantine-color-yellow-4)" size={16} strokeWidth={1.5} />}
      />
    </> */
    <ActionIcon variant="outline" onClick={toggleColorScheme}>
      {colorScheme === "dark" ? (
        <Sun color="var(--app-text)" size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </ActionIcon>
  );
}
