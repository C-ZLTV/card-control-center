import { createTheme, Card, Select, TextInput, Modal } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { colors, darkColors, lightColors } from "./colors";

const inputStyles = {
  input: {
    backgroundColor: "var(--app-surface)",
    borderColor: "var(--app-border)",
    color: "var(--app-text)",
  },

  label: {
    color: "var(--app-text)",
  },
};

export const theme = createTheme({
  fontFamily: "Inter, system-ui, sans-serif",

  headings: {
    fontFamily: "Inter, system-ui, sans-serif",

    fontWeight: "600",
  },
  components: {
    Card: Card.extend({
      styles: {
        root: {
          backgroundColor: "var(--app-surface)",
          borderColor: "var(--app-border)",
        },
      },
    }),
    Modal: Modal.extend({
      styles: {
        content: {
          backgroundColor: "var(--app-background)",
          border: "1px solid var(--app-border)",
        },

        header: {
          backgroundColor: "var(--app-background)",
        },

        body: {
          backgroundColor: "var(--app-background)",
        },

        title: {
          color: "var(--app-heading)",
        },

        close: {
          color: "var(--app-text-secondary)",
        },
      },
    }),
    TextInput: TextInput.extend({
      styles: inputStyles,
    }),

    Select: Select.extend({
      styles: inputStyles,
    }),

    DatePickerInput: DatePickerInput.extend({
      styles: inputStyles,
    }),
  },

  primaryColor: "brand",

  colors: {
    brand: [
      "#EEF2FF",
      "#E0E7FF",
      "#C7D2FE",
      "#A5B4FC",
      "#818CF8",
      colors.primary,
      "#4F46E5",
      "#4338CA",
      "#3730A3",
      "#312E81",
    ],
  },
  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "32px",
  },

  other: {
    dark: darkColors,
    light: lightColors,
  },

  defaultRadius: "md",
});
