import {
  Card,
  CardContent,
  Typography,
  Box,
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
        border: "1px solid #E2E8F0",
        transition: ".3s",
        overflow: "hidden",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 15px 40px rgba(0,0,0,.10)",
        },
      }}
    >
      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <Box>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                color,
                mt: 1,
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
              bgcolor: `${color}15`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color,
            }}
          >
            {icon}
          </Box>

        </Box>

        <Box
          sx={{
            mt: 3,
            height: 6,
            bgcolor: "#EEF2FF",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: color,
            }}
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 2,
            display: "block",
          }}
        >
          Updated just now
        </Typography>

      </CardContent>
    </Card>
  );
}