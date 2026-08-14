import { Button, TextInput } from "@mantine/core";

export function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
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
    </>
  );
}
