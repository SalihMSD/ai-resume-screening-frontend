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
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  Business,
  Description,
  LocationOn,
  AttachMoney,
  Psychology,
  Work,
} from "@mui/icons-material";

export default function JobDetailsDialog({
  open,
  onClose,
  job,
}) {

  if (!job) return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle>

        Job Details

      </DialogTitle>

      <DialogContent dividers>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            mb: 3,
          }}
        >

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >

            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "primary.main",
              }}
            >
              <Work fontSize="large" />
            </Avatar>

            <Box>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                {job.jobTitle}
              </Typography>

              <Typography color="text.secondary">

                {job.companyName}

              </Typography>

            </Box>

          </Stack>

        </Paper>

        <Stack spacing={2}>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >

            <Stack direction="row" spacing={2}>

              <Business color="primary" />

              <Box>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Company
                </Typography>

                <Typography>

                  {job.companyName}

                </Typography>

              </Box>

            </Stack>

          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >

            <Stack direction="row" spacing={2}>

              <LocationOn color="primary" />

              <Box>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Location
                </Typography>

                <Typography>

                  {job.location}

                </Typography>

              </Box>

            </Stack>

          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >

            <Stack direction="row" spacing={2}>

              <AttachMoney color="success" />

              <Box>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Salary
                </Typography>

                <Typography>

                  {job.salary}

                </Typography>

              </Box>

            </Stack>

          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >

            <Stack direction="row" spacing={2}>

              <Psychology color="warning" />

              <Box>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Experience
                </Typography>

                <Typography>

                  {job.experience}

                </Typography>

              </Box>

            </Stack>

          </Paper>

        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Required Skills
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
        >

          {(job.requiredSkills || []).map((skill) => (

            <Chip
              key={skill}
              label={skill}
              color="primary"
              variant="outlined"
            />

          ))}

        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Job Description
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 3,
          }}
        >

          <Stack direction="row" spacing={2}>

            <Description color="primary" />

            <Typography>

              {job.description || "No description available."}

            </Typography>

          </Stack>

        </Paper>

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