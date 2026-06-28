import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { useState } from "react";

export default function JobDialog({ open, onClose, onSave }) {

  const [job, setJob] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    experience: "",
    salary: "",
    description: "",
    requiredSkills: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {

    onSave({
      ...job,
      requiredSkills: job.requiredSkills
        .split(",")
        .map((s) => s.trim()),
    });

    onClose();

    setJob({
      jobTitle: "",
      companyName: "",
      location: "",
      experience: "",
      salary: "",
      description: "",
      requiredSkills: "",
    });

  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Job</DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <TextField
            label="Job Title"
            name="jobTitle"
            value={job.jobTitle}
            onChange={handleChange}
          />

          <TextField
            label="Company"
            name="companyName"
            value={job.companyName}
            onChange={handleChange}
          />

          <TextField
            label="Location"
            name="location"
            value={job.location}
            onChange={handleChange}
          />

          <TextField
            label="Experience"
            name="experience"
            value={job.experience}
            onChange={handleChange}
          />

          <TextField
            label="Salary"
            name="salary"
            value={job.salary}
            onChange={handleChange}
          />

          <TextField
            label="Required Skills (comma separated)"
            name="requiredSkills"
            value={job.requiredSkills}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            name="description"
            value={job.description}
            onChange={handleChange}
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}