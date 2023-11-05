import { MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  fontFamily: "Manrope, sans-serif",
  headings: { fontFamily: "Manrope, sans-serif" },
  primaryColor: "brand",
  colors: {
    brand: [
      "#b366d8",
      "#a74dd2",
      "#9a33cb",
      "#8e1ac5",
      "#8100be",
      "#7400ab",
      "#670098",
      "#5a0085",
      "#4d0072",
      "#41005f",
    ],
    dark: [
      "#C8C8C9",
      "#C8C8C9",
      "#C8C8C9",
      "#C8C8C9",
      "#1e1e24",
      "#2A2F37",
      "#2A2F37",
      "#1e1e24",
      "red",
      "red",
    ],
  },
};

export default theme;
