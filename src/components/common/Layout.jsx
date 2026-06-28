import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F1F5F9",
      }}
    >

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Navbar />

        <Box
          sx={{
            flexGrow: 1,
            p: {
              xs: 2,
              md: 4,
            },
          }}
        >

          {children}

        </Box>

      </Box>

    </Box>

  );

}