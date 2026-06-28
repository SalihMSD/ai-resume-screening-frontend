import { useEffect, useState } from "react";

import Layout from "../components/common/Layout";
import ATSResultCard from "../components/ats/ATSResultCard";
import ATSHistoryTable from "../components/ats/ATSHistoryTable";

import {
    Typography,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Snackbar,
    Alert,
    Chip,
    TextField,
    Box,
} from "@mui/material";

import {
    getCandidates,
    getJobs,
} from "../services/dashboardService";

import { calculateATS } from "../services/atsService";

import {
    getAllMatches,
    deleteMatch,
} from "../services/matchService";

export default function ATSResults() {

    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [candidateId, setCandidateId] = useState("");
    const [jobId, setJobId] = useState("");

    const [result, setResult] = useState(null);
    const [matches, setMatches] = useState([]);

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
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
            );

        } catch (error) {

            console.log(error);

        }

    }

    const filteredMatches = matches.filter((match) => {

        const text = search.toLowerCase();

        return (
            match.candidateName.toLowerCase().includes(text) ||
            match.jobTitle.toLowerCase().includes(text) ||
            match.status.toLowerCase().includes(text)
        );

    });
    const excellent = matches.filter(
        m => m.status === "Excellent Match"
    ).length;

    const recommended = matches.filter(
        m =>
            m.status === "Highly Recommended" ||
            m.status === "Recommended"
    ).length;

    const partial = matches.filter(
        m => m.status === "Partially Suitable"
    ).length;

    const rejected = matches.filter(
        m => m.status === "Not Recommended"
    ).length;

    async function handleCalculate() {

        if (!candidateId || !jobId) {

            setSnackbar({
                open: true,
                severity: "warning",
                message: "Please select Candidate and Job",
            });

            return;

        }

        try {

            const response = await calculateATS(
                candidateId,
                jobId
            );

            setResult(response.data);

            loadMatches();

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
                message: "Failed to calculate ATS.",
            });

        }

    }

    async function handleDelete(id) {

        try {

            await deleteMatch(id);

            loadMatches();

            setSnackbar({
                open: true,
                severity: "success",
                message: "ATS result deleted successfully.",
            });

        } catch (error) {

            console.log(error);

            setSnackbar({
                open: true,
                severity: "error",
                message: "Failed to delete ATS result.",
            });

        }

    }

    return (

        <Layout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                ATS Results
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    mb: 4,
                }}
            >

                <Stack spacing={3}>

                    <FormControl fullWidth>

                        <InputLabel>
                            Candidate
                        </InputLabel>

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

                    <FormControl fullWidth>

                        <InputLabel>
                            Job
                        </InputLabel>

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

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleCalculate}
                    >
                        Calculate ATS
                    </Button>

                </Stack>

            </Paper>

            {result && (

                <ATSResultCard
                    result={result}
                />

            )}
            <Paper
                elevation={3}
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 3,
                }}

            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >
                        ATS History
                    </Typography>

                    <Chip
                        label={`Total Reports : ${matches.length}`}
                        color="primary"
                        sx={{
                            fontWeight: "bold",
                            px: 1,
                            borderRadius: 5,
                        }}
                    />

                </Box>

                <TextField
                    fullWidth
                    label="Search Candidate or Job"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 3 }}
                />
                <Stack
                    direction="row"
                    spacing={2}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2 }}
                >

                    <Chip
                        color="success"
                        label={`Excellent : ${excellent}`}
                        size="small"
                    />

                    <Chip
                        color="info"
                        label={`Recommended : ${recommended}`}
                        size="small"
                    />

                    <Chip
                        color="warning"
                        label={`Partial : ${partial}`}
                        size="small"
                    />

                    <Chip
                        color="error"
                        label={`Rejected : ${rejected}`}
                        size="small"
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
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
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

        </Layout>

    );

}