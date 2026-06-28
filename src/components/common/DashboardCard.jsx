import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

export default function DashboardCard({
  title,
  value,
  color,
  icon,
}) {

  return (

    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        height: 190,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #E2E8F0",
        transition: "all .3s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 15px 35px rgba(0,0,0,.12)",
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 6,
          bgcolor: color,
        },
      }}
    >

      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >

          <Box>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mt: 1,
                color,
              }}
            >
              {value}
            </Typography>

          </Box>

          <Box
            sx={{
              width: 65,
              height: 65,
              borderRadius: "50%",
              bgcolor: `${color}20`,
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            {icon}

          </Box>

        </Box>

        <LinearProgress
          variant="determinate"
          value={100}
          sx={{
            height: 8,
            borderRadius: 5,
            bgcolor: "#E2E8F0",

            "& .MuiLinearProgress-bar": {
              bgcolor: color,
            },
          }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 2,
          }}
        >
          Total Records
        </Typography>

      </CardContent>

    </Card>

  );

}