import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function JobDialog({
  open,
  onClose,
  onSave,
}) {

  const initialState = {
    jobTitle: "",
    companyName: "",
    location: "",
    experience: "",
    salary: "",
    requiredSkills: "",
    description: "",
  };

  const [job, setJob] = useState(initialState);

  function handleChange(e) {

    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });

  }

  function handleSave() {

    onSave({
      ...job,
      requiredSkills: job.requiredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });

    setJob(initialState);

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          Add New Job
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Fill in the job details below.
        </Typography>

      </DialogTitle>

      <DialogContent dividers>

        <Grid
          container
          spacing={2}
          mt={1}
        >

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={job.jobTitle}
              onChange={handleChange}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={job.companyName}
              onChange={handleChange}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Location"
              name="location"
              value={job.location}
              onChange={handleChange}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Experience"
              name="experience"
              value={job.experience}
              onChange={handleChange}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={job.salary}
              onChange={handleChange}
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Required Skills"
              helperText="Separate skills with commas"
              name="requiredSkills"
              value={job.requiredSkills}
              onChange={handleChange}
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              multiline
              rows={5}
              label="Job Description"
              name="description"
              value={job.description}
              onChange={handleChange}
            />

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
        }}
      >

        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Job
        </Button>

      </DialogActions>

    </Dialog>

  );

}