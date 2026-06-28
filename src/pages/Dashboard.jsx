import { useEffect, useState } from "react";

import Layout from "../components/common/Layout";
import DashboardCard from "../components/common/DashboardCard";
import RecentCandidates from "../components/common/RecentCandidates";
import RecentJobs from "../components/common/RecentJobs";

import {
  Grid,
  Typography,
} from "@mui/material";

import {
  People,
  Work,
  Assessment,
  UploadFile,
} from "@mui/icons-material";

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

      const recentCandidateResponse =
        await getRecentCandidates();

      const recentJobResponse =
        await getRecentJobs();

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

    <Layout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 3 }}>

          <DashboardCard
            title="Candidates"
            value={candidateCount}
            color="#2563EB"
            icon={<People fontSize="large" />}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <DashboardCard
            title="Jobs"
            value={jobCount}
            color="#16A34A"
            icon={<Work fontSize="large" />}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <DashboardCard
            title="ATS Matches"
            value={matchCount}
            color="#EA580C"
            icon={<Assessment fontSize="large" />}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <DashboardCard
            title="Uploads"
            value={candidateCount}
            color="#7C3AED"
            icon={<UploadFile fontSize="large" />}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <RecentCandidates
            candidates={recentCandidates}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <RecentJobs
            jobs={recentJobs}
          />

        </Grid>

      </Grid>

    </Layout>

  );

}