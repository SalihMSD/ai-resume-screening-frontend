import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";

import {
  Work,
  Business,
  LocationOn,
  AttachMoney,
  Psychology,
  Description,
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
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>

        Job Details

      </DialogTitle>

      <DialogContent dividers>

        <Stack spacing={3}>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
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

            <Stack>

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {job.jobTitle}
              </Typography>

              <Typography color="text.secondary">
                {job.companyName}
              </Typography>

            </Stack>

          </Stack>

          <Divider />

          <Stack spacing={2}>

            <Stack direction="row" spacing={1}>

              <Business color="primary" />

              <Typography>

                <strong>Company:</strong> {job.companyName}

              </Typography>

            </Stack>

            <Stack direction="row" spacing={1}>

              <LocationOn color="primary" />

              <Typography>

                <strong>Location:</strong> {job.location}

              </Typography>

            </Stack>

            <Stack direction="row" spacing={1}>

              <AttachMoney color="primary" />

              <Typography>

                <strong>Salary:</strong> {job.salary}

              </Typography>

            </Stack>

            <Stack direction="row" spacing={1}>

              <Psychology color="primary" />

              <Typography>

                <strong>Experience:</strong> {job.experience}

              </Typography>

            </Stack>

          </Stack>

          <Divider />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Required Skills
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{
              flexWrap: "wrap",
            }}
          >

            {(job.requiredSkills || []).map((skill) => (

              <Chip
                key={skill}
                label={skill}
                color="primary"
              />

            ))}

          </Stack>

          <Divider />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Job Description
          </Typography>

          <Stack direction="row" spacing={1}>

            <Description color="primary" />

            <Typography>

              {job.description || "No description available."}

            </Typography>

          </Stack>

        </Stack>

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