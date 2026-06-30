import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Navbar({ handleDrawerToggle }) {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (

    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        width: {
          xs: "100%",
          md: "calc(100% - 260px)",
        },
        ml: {
          md: "260px",
        },
        backdropFilter: "blur(18px)",
        bgcolor: "rgba(255,255,255,0.92)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >

      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 76,
          py: 1,
        }}
      >

        {/* LEFT */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >

          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box>

            <Typography
              sx={{
                color: "#2563EB",
                fontWeight: 700,
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.2,
                mb: 0.3,
              }}
            >
              {greeting} 👋
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.8rem",
                  md: "2rem",
                },
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
              }}
            >
              AI Resume Screening
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.9rem",
                mt: 0.2,
              }}
            >
              {today}
            </Typography>

          </Box>

        </Box>

        {/* RIGHT */}

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2.5,
            py: 1.2,
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
            transition: "0.25s",

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
            },
          }}
        >

          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#2563EB",
              fontWeight: 700,
              fontSize: "1.2rem",
            }}
          >
            M
          </Avatar>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                lineHeight: 1.2,
              }}
            >
              Muhammad Salih
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.85rem",
              }}
            >
              Recruiter
            </Typography>

          </Box>

        </Paper>

      </Toolbar>

    </AppBar>

  );

}