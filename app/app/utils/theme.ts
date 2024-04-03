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
    fontFamily: [
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "sans-serif"
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h5: {
      fontSize: "1.25rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1.25em",
          textTransform: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/paper_texture.jpg")',
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
      },
    },
  },
});
