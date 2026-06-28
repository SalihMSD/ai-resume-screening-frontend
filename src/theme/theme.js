import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#16A34A",
    },
    error: {
      main: "#DC2626",
    },
    warning: {
      main: "#EA580C",
    },
    background: {
      default: "#F8FAFC",
    },
  },

  typography: {
    fontFamily: "Poppins, Roboto, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 10,
  },
});

export default theme;