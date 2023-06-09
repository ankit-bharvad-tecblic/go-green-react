import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
      600: "#ADB8CC",
      800: "#636363",
    },

    primary: {
      700: "#A6CE39",
      100: "#FAFFEE",
    },

    secondary: {
      500: "#F08F1A",
      100: "#FEF4E8",
    },

    border_light: {
      100: "#E2E8F0",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: "'Roboto', sans-serif",
      },
      html: {
        fontFamily: "'Roboto', sans-serif",
      },
    }),
  },
};
