import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  Email,
  Folder,
  Person,
  Phone,
  School,
  Work,
} from "@mui/icons-material";

export default function CandidateDialog({
  open,
  onClose,
  candidate,
}) {

  if (!candidate) return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >

      <DialogTitle>

        Candidate Profile

      </DialogTitle>

      <DialogContent dividers>

        {/* Header */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          alignItems="center"
          mb={4}
        >

          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#2563EB",
              fontSize: 36,
            }}
          >
            {candidate.fullName?.charAt(0)}
          </Avatar>

          <Box>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {candidate.fullName}
            </Typography>

            <Typography
              color="text.secondary"
            >
              Resume Candidate
            </Typography>

          </Box>

        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Contact */}

        <Grid container spacing={3}>

          <Grid size={{ xs: 12, md: 6 }}>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 3,
              }}
            >

              <Stack spacing={2}>

                <Typography
                  fontWeight={700}
                >
                  Contact Information
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Email color="primary" />
                  <Typography>{candidate.email}</Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Phone color="primary" />
                  <Typography>{candidate.phone}</Typography>
                </Stack>

              </Stack>

            </Paper>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 3,
              }}
            >

              <Stack spacing={2}>

                <Typography
                  fontWeight={700}
                >
                  Career
                </Typography>

                <Stack direction="row" spacing={2}>
                  <School color="primary" />
                  <Typography>
                    {candidate.education || "Not Available"}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Work color="primary" />
                  <Typography>
                    {candidate.experience || "Fresher"}
                  </Typography>
                </Stack>

              </Stack>

            </Paper>

          </Grid>

        </Grid>

        {/* Skills */}

        <Box mt={5}>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Skills
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >

            {(candidate.skills || []).map((skill) => (

              <Chip
                key={skill}
                label={skill}
                color="primary"
                variant="outlined"
              />

            ))}

          </Stack>

        </Box>

        {/* Projects */}

        <Box mt={5}>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Projects
          </Typography>

          <Stack spacing={2}>

            {(candidate.projects || []).length === 0 ? (

              <Typography color="text.secondary">
                No Projects Available
              </Typography>

            ) : (

              candidate.projects.map((project, index) => (

                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 3,
                  }}
                >

                  <Stack
                    direction="row"
                    spacing={2}
                  >

                    <Folder color="primary" />

                    <Typography>

                      {project}

                    </Typography>

                  </Stack>

                </Paper>

              ))

            )}

          </Stack>

        </Box>

      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>

  );

}