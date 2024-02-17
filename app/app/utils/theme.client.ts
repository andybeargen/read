import { createTheme } from "@mui/material";

/**
 * @returns main theme object for the app
 */
export const CrittersTheme = createTheme({
  palette: {
    primary: {
      main: "#de7d37",
    },
    secondary: {
      main: "#2f84c1",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5em",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h2: {
      fontSize: "2em",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75em",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h4: {
      fontSize: "1.5em",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h5: {
      fontSize: "1.25em",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1.25em",
        },
      },
    },
  },
});
