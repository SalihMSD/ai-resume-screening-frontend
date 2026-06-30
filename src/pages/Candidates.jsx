import { useEffect, useMemo, useState } from "react";

import CandidateTable from "../components/candidate/CandidateTable";
import CandidateDialog from "../components/candidate/CandidateDialog";

import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import {
  Delete,
  Refresh,
  Search,
  Visibility,
} from "@mui/icons-material";

import {
  deleteCandidate,
  getCandidates,
} from "../services/candidateService";

export default function Candidates() {

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    loadCandidates();
  }, []);

  async function loadCandidates() {

    try {

      const response = await getCandidates();

      setRows(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  async function handleDelete(id) {

    if (!window.confirm("Delete this candidate?")) return;

    try {

      await deleteCandidate(id);

      loadCandidates();

      setOpenSnackbar(true);

    } catch (error) {

      console.log(error);

    }

  }

  function handleView(candidate) {

    setSelectedCandidate(candidate);

    setOpenDialog(true);

  }

  const filteredRows = useMemo(() => {

    return rows.filter((candidate) => {

      const keyword = search.toLowerCase();

      return (

        candidate.fullName?.toLowerCase().includes(keyword) ||

        candidate.email?.toLowerCase().includes(keyword) ||

        candidate.phone?.includes(keyword)

      );

    });

  }, [rows, search]);

  const columns = [

    {
      field: "fullName",
      headerName: "Candidate",
      flex: 1.2,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },

    {
      field: "skills",
      headerName: "Skills",
      flex: 2,

      renderCell: (params) => (
        <Typography
          variant="body2"
          noWrap
        >
          {params.row.skills?.join(", ")}
        </Typography>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,

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

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Candidates
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Manage all uploaded resumes.
        </Typography>

      </Box>

      {/* Search & Refresh */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
          flexWrap: "wrap",
        }}
      >

        <TextField
          placeholder="Search candidates..."
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
          onClick={loadCandidates}
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

      <CandidateTable
        rows={filteredRows}
        columns={columns}
      />

      {/* View Dialog */}

      <CandidateDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        candidate={selectedCandidate}
      />

      {/* Snackbar */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >

        <Alert severity="success">
          Candidate deleted successfully.
        </Alert>

      </Snackbar>

    </>

  );

}