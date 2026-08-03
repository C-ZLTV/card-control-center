import "./App.css";

import { Button, TextInput } from "@mantine/core";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";

function App() {
  return (
    <div
      className="App"
      style={{
        background: "var(--app-surface)",
        color: "var(--app-text)",
        padding: "20px",
      }}
    >
      <ThemeToggle />
      <TextInput
        style={{
          marginBottom: "20px",
        }}
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      />
      <Button variant="filled" color="brand">
        Click Me
      </Button>
    </div>
  );
}

export default App;
