import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  Cancel,
  CheckCircle,
  Download,
  Work,
} from "@mui/icons-material";

import { generateATSReport } from "../../utils/pdfGenerator";

export default function ATSResultCard({ result }) {

  if (!result) return null;

  const progressColor =
    result.matchPercentage >= 75
      ? "success"
      : result.matchPercentage >= 50
      ? "warning"
      : "error";

  return (

    <Paper
      elevation={2}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 4,
        border: "1px solid #E2E8F0",
      }}
    >

      <Stack
        direction={{
          xs: "column",
          lg: "row",
        }}
        spacing={5}
      >

        {/* LEFT PANEL */}

        <Box
          sx={{
            width: {
              xs: "100%",
              lg: 300,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#2563EB",
              fontSize: 34,
              fontWeight: 700,
              mb: 2,
            }}
          >
            {result.candidateName?.charAt(0)}
          </Avatar>

          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
          >
            {result.candidateName}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mt={1}
            mb={4}
          >
            <Work
              fontSize="small"
              color="action"
            />

            <Typography color="text.secondary">
              {result.jobTitle}
            </Typography>

          </Stack>

          <Box
            sx={{
              position: "relative",
              width: 160,
              height: 160,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <CircularProgress
              variant="determinate"
              value={100}
              size={160}
              thickness={4}
              sx={{
                color: "#E5E7EB",
                position: "absolute",
              }}
            />

            <CircularProgress
              variant="determinate"
              value={result.matchPercentage}
              size={160}
              thickness={4}
              color={progressColor}
            />

            <Box
              sx={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >

              <Typography
                variant="h4"
                fontWeight={700}
              >
                {result.matchPercentage}%
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Match
              </Typography>

            </Box>

          </Box>

          <Chip
            label={result.status}
            color={progressColor}
            sx={{
              mt: 4,
              fontWeight: 700,
              px: 2,
            }}
          />

        </Box>

        <Divider
          orientation="vertical"
          flexItem
        />

        {/* RIGHT PANEL */}

        <Box flex={1}>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
          >
            Skill Analysis
          </Typography>

          {/* MATCHED */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              mb: 3,
            }}
          >

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={2}
            >

              <CheckCircle color="success" />

              <Typography
                variant="h6"
                fontWeight={600}
              >
                Matched Skills
              </Typography>

            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >

              {result.matchedSkills?.length ? (

                result.matchedSkills.map((skill) => (

                  <Chip
                    key={skill}
                    label={skill}
                    color="success"
                    sx={{
                      fontWeight: 600,
                    }}
                  />

                ))

              ) : (

                <Typography color="text.secondary">
                  No matched skills found.
                </Typography>

              )}

            </Stack>

          </Paper>

          {/* MISSING */}

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={2}
            >

              <Cancel color="error" />

              <Typography
                variant="h6"
                fontWeight={600}
              >
                Missing Skills
              </Typography>

            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >

              {result.missingSkills?.length ? (

                result.missingSkills.map((skill) => (

                  <Chip
                    key={skill}
                    label={skill}
                    color="error"
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                    }}
                  />

                ))

              ) : (

                <Typography color="text.secondary">
                  No missing skills 🎉
                </Typography>

              )}

            </Stack>

          </Paper>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >

            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              onClick={() => generateATSReport(result)}
              sx={{
                px: 5,
                py: 1.4,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
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