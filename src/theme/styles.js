import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      800: "#636363",
      700: "#1f2733",
      600: "#ADB8CC",
      500: "#344054",
      400: "#667085",
      300: "#8E9BAA",
      200: "#F0F0F0",
    },

    primary: {
      800: "#739306",
      700: "#A6CE39",
      100: "#FAFFEE",
      200: "#FCFFF3",
    },

    secondary: {
      500: "#F08F1A",
      100: "#FEF4E8",
    },

    border_light: {
      100: "#E2E8F0",
    },
  },
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
    mono: "'Poppins', monospace",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: "'Poppins', sans-serif",
      },
      html: {
        fontFamily: "'Poppins', sans-serif",
      },
    }),
  },
};
