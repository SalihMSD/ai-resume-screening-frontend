import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Paper,
} from "@mui/material";

export default function Navbar() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: "blur(10px)",
        bgcolor: "rgba(255,255,255,0.9)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >

      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >

        <Box>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            AI Resume Screening System
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {today}
          </Typography>

        </Box>

        <Paper
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1,
            borderRadius: 5,
          }}
        >

          <Avatar
            sx={{
              bgcolor: "#2563EB",
            }}
          >
            S
          </Avatar>

          <Box>

            <Typography
              fontWeight="bold"
            >
              Muhammad Salih
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Recruiter
            </Typography>

          </Box>

        </Paper>

      </Toolbar>

    </AppBar>

  );

}