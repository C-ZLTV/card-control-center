import { createTheme } from "@mantine/core";

import { colors, darkColors, lightColors } from "./colors";

export const theme = createTheme({
  fontFamily: "Inter, system-ui, sans-serif",

  headings: {
    fontFamily: "Inter, system-ui, sans-serif",

    fontWeight: "600",
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
