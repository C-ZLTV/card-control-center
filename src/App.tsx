import "./App.css";

import { Button, TextInput } from "@mantine/core";
import { Header } from "./components/layout/Header/Header";
import { Sidebar } from "./components/layout/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app__layout">
        <Sidebar />
        <main className="app__content container">
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
        </main>
      </div>
    </div>
  );
}

export default App;
