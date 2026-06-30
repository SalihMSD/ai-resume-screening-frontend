import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Assessment,
  Refresh,
  Search,
} from "@mui/icons-material";

import ATSResultCard from "../components/ats/ATSResultCard";
import ATSHistoryTable from "../components/ats/ATSHistoryTable";

import {
  getCandidates,
  getJobs,
} from "../services/dashboardService";

import { calculateATS } from "../services/atsService";

import {
  deleteMatch,
  getAllMatches,
} from "../services/matchService";

export default function ATSResults() {

  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [candidateId, setCandidateId] = useState("");
  const [jobId, setJobId] = useState("");

  const [matches, setMatches] = useState([]);
  const [result, setResult] = useState(null);

  const [search, setSearch] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    loadData();
    loadMatches();
  }, []);

  async function loadData() {

    try {

      const candidateResponse = await getCandidates();
      const jobResponse = await getJobs();

      setCandidates(candidateResponse.data);
      setJobs(jobResponse.data);

    } catch (error) {

      console.log(error);

    }

  }

  async function loadMatches() {

    try {

      const response = await getAllMatches();

      setMatches(
        response.data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
      );

    } catch (error) {

      console.log(error);

    }

  }

  async function handleCalculate() {

    if (!candidateId || !jobId) {

      setSnackbar({
        open: true,
        severity: "warning",
        message: "Please select both Candidate and Job.",
      });

      return;

    }

    try {

      const response = await calculateATS(
        candidateId,
        jobId
      );

      setResult(response.data);

      await loadMatches();

      setSnackbar({
        open: true,
        severity: "success",
        message: "ATS calculated successfully.",
      });

    } catch (error) {

      console.log(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Unable to calculate ATS.",
      });

    }

  }

  async function handleDelete(id) {

    try {

      await deleteMatch(id);

      await loadMatches();

      setSnackbar({
        open: true,
        severity: "success",
        message: "ATS Report Deleted Successfully.",
      });

    } catch (error) {

      console.log(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Delete Failed.",
      });

    }

  }

  const filteredMatches = useMemo(() => {

    const value = search.toLowerCase();

    return matches.filter((match) =>

      match.candidateName
        ?.toLowerCase()
        .includes(value)

      ||

      match.jobTitle
        ?.toLowerCase()
        .includes(value)

      ||

      match.status
        ?.toLowerCase()
        .includes(value)

    );

  }, [matches, search]);

  const excellent = matches.filter(
    (m) => m.status === "Excellent Match"
  ).length;

  const recommended = matches.filter(
    (m) =>
      m.status === "Highly Recommended" ||
      m.status === "Recommended"
  ).length;

  const partial = matches.filter(
    (m) => m.status === "Partially Suitable"
  ).length;

  const rejected = matches.filter(
    (m) => m.status === "Not Recommended"
  ).length;

  return (
    <>
  {/* Header */}

  <Box mb={4}>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          ATS Results
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Compare candidate resumes against job descriptions using AI-powered
          ATS analysis.
        </Typography>
      </Box>

      <Chip
        color="primary"
        label={`${matches.length} Reports`}
        sx={{
          px: 2,
          height: 36,
          fontWeight: 600,
        }}
      />
    </Stack>
  </Box>

  {/* Calculate ATS */}

  <Paper
    elevation={3}
    sx={{
      p: 4,
      borderRadius: 4,
      mb: 4,
    }}
  >
    <Typography
      variant="h5"
      fontWeight={700}
      mb={3}
    >
      Calculate ATS Score
    </Typography>

    <Grid
      container
      spacing={3}
      alignItems="center"
    >
      <Grid
        size={{
          xs: 12,
          md: 5,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Candidate</InputLabel>

          <Select
            value={candidateId}
            label="Candidate"
            onChange={(e) =>
              setCandidateId(e.target.value)
            }
          >
            {candidates.map((candidate) => (
              <MenuItem
                key={candidate.id}
                value={candidate.id}
              >
                {candidate.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 5,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Job</InputLabel>

          <Select
            value={jobId}
            label="Job"
            onChange={(e) =>
              setJobId(e.target.value)
            }
          >
            {jobs.map((job) => (
              <MenuItem
                key={job.id}
                value={job.id}
              >
                {job.jobTitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<Assessment />}
          onClick={handleCalculate}
          sx={{
            height: 56,
            borderRadius: 2,
          }}
        >
          Calculate
        </Button>
      </Grid>
    </Grid>
  </Paper>

  {/* Result */}

  {result && (
    <ATSResultCard
      result={result}
    />
  )}
        {/* ATS History */}

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          mt: 4,
        }}
      >

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          spacing={2}
          mb={3}
        >

          <Typography
            variant="h5"
            fontWeight={700}
          >
            ATS History
          </Typography>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadMatches}
          >
            Refresh
          </Button>

        </Stack>

        <TextField
          placeholder="Search candidate, job or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: {
              xs: "100%",
              md: 420,
            },
            mb: 3,
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

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          useFlexGap
          mb={3}
        >

          <Chip
            label={`Excellent : ${excellent}`}
            color="success"
          />

          <Chip
            label={`Recommended : ${recommended}`}
            color="primary"
          />

          <Chip
            label={`Partial : ${partial}`}
            color="warning"
          />

          <Chip
            label={`Rejected : ${rejected}`}
            color="error"
          />

        </Stack>

        <ATSHistoryTable
          rows={filteredMatches}
          onDelete={handleDelete}
        />

      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >

        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </>

  );

}