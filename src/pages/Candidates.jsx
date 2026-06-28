import { useEffect, useState } from "react";

import Layout from "../components/common/Layout";
import CandidateTable from "../components/candidate/CandidateTable";
import CandidateDialog from "../components/candidate/CandidateDialog";

import {
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Visibility,
  Delete,
} from "@mui/icons-material";

import {
  getCandidates,
  deleteCandidate,
} from "../services/candidateService";

export default function Candidates() {

  const [rows, setRows] = useState([]);

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

    if (!window.confirm("Delete this Candidate?")) return;

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

  const columns = [

    {
      field: "fullName",
      headerName: "Name",
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

      renderCell: (params) =>
        params.row.skills?.join(", "),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,

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

      <Typography
        variant="h4"
        mb={3}
      >
        Candidates
      </Typography>

      <CandidateTable
        rows={rows}
        columns={columns}
      />

      <CandidateDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        candidate={selectedCandidate}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >

        <Alert severity="success">

          Candidate Deleted Successfully

        </Alert>

      </Snackbar>

    </Layout>

  );

}