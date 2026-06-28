import { useEffect, useState } from "react";

import Layout from "../components/common/Layout";
import JobTable from "../components/job/JobTable";
import JobDialog from "../components/job/JobDialog";
import JobDetailsDialog from "../components/job/JobDetailsDialog";

import {
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Add,
  Delete,
  Visibility,
} from "@mui/icons-material";

import {
  getJobs,
  createJob,
  deleteJob,
} from "../services/jobService";

export default function Jobs() {

  const [rows, setRows] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {

    try {

      const response = await getJobs();

      setRows(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  async function handleSave(job) {

    try {

      await createJob(job);

      loadJobs();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Job added successfully.",
      });

      setOpenDialog(false);

    } catch (error) {

      console.log(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to add job.",
      });

    }

  }

  async function handleDelete(id) {

    if (!window.confirm("Delete this job?")) return;

    try {

      await deleteJob(id);

      loadJobs();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Job deleted successfully.",
      });

    } catch (error) {

      console.log(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to delete job.",
      });

    }

  }

  function handleView(job) {

    setSelectedJob(job);

    setOpenDetails(true);

  }

  const columns = [

    {
      field: "jobTitle",
      headerName: "Job Title",
      flex: 1.3,
    },

    {
      field: "companyName",
      headerName: "Company",
      flex: 1.2,
    },

    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },

    {
      field: "experience",
      headerName: "Experience",
      flex: 1,
    },

    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
    },

    {
      field: "requiredSkills",
      headerName: "Skills",
      flex: 2,

      renderCell: (params) =>
        params.row.requiredSkills?.join(", "),

    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.8,

      sortable: false,

      renderCell: (params) => (

        <Stack
          direction="row"
          spacing={1}
        >

          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Visibility />}
            onClick={() => handleView(params.row)}
          >
            View
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Delete />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>

        </Stack>

      ),

    },

  ];

  return (

    <Layout>

      <Stack
        direction="row"
        justifyContent="space-between"
        mb={3}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Jobs
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Job
        </Button>

      </Stack>

      <JobTable
        rows={rows}
        columns={columns}
      />

      <JobDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />

      <JobDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        job={selectedJob}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >

        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </Layout>

  );

}