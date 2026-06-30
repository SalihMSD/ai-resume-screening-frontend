import { useEffect, useState } from "react";

import DashboardCard from "../components/common/DashboardCard";
import RecentCandidates from "../components/common/RecentCandidates";
import RecentJobs from "../components/common/RecentJobs";

import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  Assessment,
  People,
  UploadFile,
  Work,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import {
  getCandidates,
  getJobs,
  getMatches,
  getRecentCandidates,
  getRecentJobs,
} from "../services/dashboardService";

export default function Dashboard() {

  const [candidateCount, setCandidateCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  const [recentCandidates, setRecentCandidates] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    try {

      const candidateResponse = await getCandidates();
      const jobResponse = await getJobs();
      const matchResponse = await getMatches();

      const recentCandidateResponse = await getRecentCandidates();
      const recentJobResponse = await getRecentJobs();

      setCandidateCount(candidateResponse.data.length);
      setJobCount(jobResponse.data.length);
      setMatchCount(matchResponse.data.length);

      setRecentCandidates(
        recentCandidateResponse.data
          .slice(-5)
          .reverse()
      );

      setRecentJobs(
        recentJobResponse.data
          .slice(-5)
          .reverse()
      );

    } catch (error) {
      console.log(error);
    }

  }

  return (

    <>

      <Box
        sx={{
          mb: 4,
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Dashboard
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          mt={1}
        >
          Welcome back, Muhammad 👋
          <br />
          Here's today's recruitment overview.
        </Typography>

      </Box>

      <Grid
        container
        spacing={3}
      >

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >

          <DashboardCard
            title="Candidates"
            value={candidateCount}
            color="#2563EB"
            icon={<People fontSize="large" />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >

          <DashboardCard
            title="Jobs"
            value={jobCount}
            color="#16A34A"
            icon={<Work fontSize="large" />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >

          <DashboardCard
            title="ATS Matches"
            value={matchCount}
            color="#EA580C"
            icon={<Assessment fontSize="large" />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >

          <DashboardCard
            title="Uploads"
            value={candidateCount}
            color="#7C3AED"
            icon={<UploadFile fontSize="large" />}
          />

        </Grid>

        <Grid size={12}>

          <Typography
            variant="h5"
            fontWeight={700}
            mt={2}
            mb={2}
          >
            Quick Actions
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            flexWrap="wrap"
            useFlexGap
            mb={4}
          >

            <Button
              component={Link}
              to="/upload"
              variant="contained"
              startIcon={<UploadFile />}
            >
              Upload Resume
            </Button>

            <Button
              component={Link}
              to="/jobs"
              variant="contained"
              color="success"
              startIcon={<Work />}
            >
              Add Job
            </Button>

            <Button
              component={Link}
              to="/candidates"
              variant="outlined"
              startIcon={<People />}
            >
              Candidates
            </Button>

            <Button
              component={Link}
              to="/ats"
              variant="outlined"
              color="warning"
              startIcon={<Assessment />}
            >
              ATS Results
            </Button>

          </Stack>

        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >

          <RecentCandidates
            candidates={recentCandidates}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >

          <RecentJobs
            jobs={recentJobs}
          />

        </Grid>

      </Grid>

    </>

  );

}