import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Stack,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";

import {
  Person,
  Email,
  Phone,
  School,
  Work,
  Folder,
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
    >

      <DialogTitle>

        Candidate Details

      </DialogTitle>

      <DialogContent dividers>

        <Stack spacing={3}>

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
              <Person fontSize="large" />
            </Avatar>

            <div>

              <Typography variant="h5" fontWeight="bold">

                {candidate.fullName}

              </Typography>

              <Typography color="text.secondary">

                Candidate Profile

              </Typography>

            </div>

          </Stack>

          <Divider />

          <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 6 }}>

              <Stack spacing={2}>

                <Stack direction="row" spacing={1}>

                  <Email color="primary" />

                  <Typography>

                    {candidate.email}

                  </Typography>

                </Stack>

                <Stack direction="row" spacing={1}>

                  <Phone color="primary" />

                  <Typography>

                    {candidate.phone}

                  </Typography>

                </Stack>

              </Stack>

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

              <Stack spacing={2}>

                <Stack direction="row" spacing={1}>

                  <School color="primary" />

                  <Typography>

                    {candidate.education || "Not Available"}

                  </Typography>

                </Stack>

                <Stack direction="row" spacing={1}>

                  <Work color="primary" />

                  <Typography>

                    {candidate.experience || "Not Available"}

                  </Typography>

                </Stack>

              </Stack>

            </Grid>

          </Grid>

          <Divider />

          <Typography variant="h6">

            Skills

          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >

            {candidate.skills?.map((skill, index) => (

              <Chip

                key={index}

                label={skill}

                color="primary"

                variant="outlined"

              />

            ))}

          </Stack>

          <Divider />

          <Typography variant="h6">

            Projects

          </Typography>

          <Stack spacing={1}>

            {candidate.projects?.map((project, index) => (

              <Stack
                key={index}
                direction="row"
                spacing={1}
              >

                <Folder color="primary" />

                <Typography>

                  {project}

                </Typography>

              </Stack>

            ))}

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