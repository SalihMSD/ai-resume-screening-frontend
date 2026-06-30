import { useEffect, useMemo, useState } from "react";

import JobTable from "../components/job/JobTable";
import JobDialog from "../components/job/JobDialog";
import JobDetailsDialog from "../components/job/JobDetailsDialog";

import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Delete,
  Refresh,
  Search,
  Visibility,
} from "@mui/icons-material";

import {
  createJob,
  deleteJob,
  getJobs,
} from "../services/jobService";

export default function Jobs() {

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

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

      setOpenDialog(false);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Job Added Successfully",
      });

    } catch {

      setSnackbar({
        open: true,
        severity: "error",
        message: "Unable to Add Job",
      });

    }

  }

  async function handleDelete(id) {

    if (!window.confirm("Delete this Job?")) return;

    try {

      await deleteJob(id);

      loadJobs();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Job Deleted Successfully",
      });

    } catch {

      setSnackbar({
        open: true,
        severity: "error",
        message: "Delete Failed",
      });

    }

  }

  function handleView(job) {

    setSelectedJob(job);

    setOpenDetails(true);

  }

  const filteredRows = useMemo(() => {

    return rows.filter((job) => {

      const keyword = search.toLowerCase();

      return (

        job.jobTitle?.toLowerCase().includes(keyword) ||

        job.companyName?.toLowerCase().includes(keyword) ||

        job.location?.toLowerCase().includes(keyword)

      );

    });

  }, [rows, search]);

  const columns = [

    {
      field: "jobTitle",
      headerName: "Job Title",
      flex: 1.3,
    },

    {
      field: "companyName",
      headerName: "Company",
      flex: 1.3,
    },

    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },

    {
      field: "experience",
      headerName: "Experience",
      flex: 0.9,
    },

    {
      field: "salary",
      headerName: "Salary",
      flex: 0.9,
    },

    {
      field: "requiredSkills",
      headerName: "Skills",
      flex: 2,

      renderCell: (params) => (

        <Typography
          variant="body2"
          noWrap
        >
          {params.row.requiredSkills?.join(", ")}
        </Typography>

      ),

    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.6,
      sortable: false,

      renderCell: (params) => (

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >

          <Button
            size="small"
            variant="contained"
            startIcon={<Visibility />}
            onClick={() => handleView(params.row)}
          >
            View
          </Button>

          <Button
            size="small"
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>

        </Box>

      ),

    },

  ];

  return (

    <>

      {/* Header */}

      <Box mb={3}>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >

          <Box>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              Jobs
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
            >
              Manage all available job postings.
            </Typography>

          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{
              borderRadius: 3,
              px: 3,
            }}
          >
            Add Job
          </Button>

        </Box>

      </Box>

      {/* Search */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >

        <TextField
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            width: {
              xs: "100%",
              sm: 320,
              md: 420,
            },

            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
          InputProps={{
            startAdornment: (
              <Search
                sx={{
                  mr: 1,
                  color: "text.secondary",
                }}
              />
            ),
          }}
        />

        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={loadJobs}
          sx={{
            minWidth: 120,
            height: 40,
            borderRadius: 3,
          }}
        >
          Refresh
        </Button>

      </Box>

      {/* Table */}

      <JobTable
        rows={filteredRows}
        columns={columns}
      />

      {/* Dialog */}

      <JobDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />

      {/* Details */}

      <JobDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        job={selectedJob}
      />

      {/* Snackbar */}

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

    </>

  );

} 