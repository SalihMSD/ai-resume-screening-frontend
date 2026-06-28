import {
  Paper,
  Stack,
  Avatar,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";

import {
  Download,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

import { generateATSReport } from "../../utils/pdfGenerator";

export default function ATSResultCard({ result }) {

  if (!result) return null;

  return (

    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 4,
      }}
    >

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
      >

        {/* Left */}

        <Box
          sx={{
            width: {
              xs: "100%",
              md: 300,
            },
            textAlign: "center",
          }}
        >

          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#1976d2",
              fontSize: 32,
              mx: "auto",
              mb: 2,
            }}
          >
            {result.candidateName.charAt(0)}
          </Avatar>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {result.candidateName}
          </Typography>

          <Typography
            color="text.secondary"
            mb={3}
          >
            {result.jobTitle}
          </Typography>

          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
            }}
          >

            <CircularProgress
              variant="determinate"
              value={result.matchPercentage}
              size={140}
              thickness={5}
              color={
                result.matchPercentage >= 75
                  ? "success"
                  : result.matchPercentage >= 50
                  ? "warning"
                  : "error"
              }
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {result.matchPercentage}%
              </Typography>

            </Box>

          </Box>

          <Chip
            label={result.status}
            color={
              result.matchPercentage >= 75
                ? "success"
                : result.matchPercentage >= 50
                ? "warning"
                : "error"
            }
            sx={{
              mt: 3,
              fontWeight: "bold",
            }}
          />

        </Box>

        <Divider
          orientation="vertical"
          flexItem
        />

        {/* Right */}

        <Box
          sx={{
            flex: 1,
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            Skill Analysis
          </Typography>

          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >

            <CheckCircle color="success" />

            Matched Skills

          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 4,
            }}
          >

            {result.matchedSkills.length === 0 ? (

              <Typography color="text.secondary">

                No matched skills

              </Typography>

            ) : (

              result.matchedSkills.map((skill) => (

                <Chip
                  key={skill}
                  label={skill}
                  color="success"
                />

              ))

            )}

          </Box>

          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >

            <Cancel color="error" />

            Missing Skills

          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 5,
            }}
          >

            {result.missingSkills.length === 0 ? (

              <Typography color="text.secondary">

                No missing skills

              </Typography>

            ) : (

              result.missingSkills.map((skill) => (

                <Chip
                  key={skill}
                  label={skill}
                  color="error"
                  variant="outlined"
                />

              ))

            )}

          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >

            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              onClick={() => generateATSReport(result)}
              sx={{
                px: 5,
                borderRadius: 3,
              }}
            >

              Download ATS Report

            </Button>

          </Box>

        </Box>

      </Stack>

    </Paper>

  );

}