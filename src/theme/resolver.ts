import { type CSSVariablesResolver } from "@mantine/core";

import { colors, darkColors, lightColors } from "./colors";

export const resolver: CSSVariablesResolver = () => ({
  variables: {
    "--app-primary": colors.primary,

    "--app-success": colors.success,
    "--app-warning": colors.warning,
    "--app-danger": colors.danger,
    "--app-info": colors.info,

    "--app-radius-xs": "4px",
    "--app-radius-sm": "6px",
    "--app-radius-md": "16px",
    "--app-radius-lg": "12px",
    "--app-radius-xl": "32px",
  },
  dark: {
    "--app-background": darkColors.background,

    "--app-surface": darkColors.surface,
    "--app-surface-hover": darkColors.surfaceHover,

    "--app-border": darkColors.border,
    "--app-divider": darkColors.divider,

    "--app-heading": darkColors.heading,
    "--app-text": darkColors.text,
    "--app-text-secondary": darkColors.textSecondary,
    "--app-placeholder": darkColors.placeholder,
  },
  light: {
    "--app-background": lightColors.background,

    "--app-surface": lightColors.surface,
    "--app-surface-hover": lightColors.surfaceHover,

    "--app-border": lightColors.border,
    "--app-divider": lightColors.divider,

    "--app-heading": lightColors.heading,
    "--app-text": lightColors.text,
    "--app-text-secondary": lightColors.textSecondary,
    "--app-placeholder": lightColors.placeholder,
  },
});
