import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function ATSHistoryTable({
  rows,
  onDelete,
}) {

  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  function handleOpen(id) {

    setSelectedId(id);

    setOpen(true);

  }

  function handleDelete() {

    onDelete(selectedId);

    setOpen(false);

  }

  const columns = [

    {
      field: "candidateName",
      headerName: "Candidate",
      flex: 1.5,
      minWidth: 180,
    },

    {
      field: "jobTitle",
      headerName: "Job",
      flex: 1.5,
      minWidth: 180,
    },

    {
      field: "matchPercentage",
      headerName: "ATS Score",
      flex: 1,

      renderCell: (params) => (

        <Typography
          fontWeight="bold"
          color={
            params.value >= 75
              ? "success.main"
              : params.value >= 50
              ? "warning.main"
              : "error.main"
          }
        >
          {params.value}%
        </Typography>

      ),

    },

    {
      field: "status",
      headerName: "Status",
      flex: 1.4,

      renderCell: (params) => {

        let color = "default";

        switch (params.value) {

          case "Excellent Match":
            color = "success";
            break;

          case "Highly Recommended":
            color = "primary";
            break;

          case "Recommended":
            color = "info";
            break;

          case "Partially Suitable":
            color = "warning";
            break;

          default:
            color = "error";

        }

        return (

          <Chip
            label={params.value}
            color={color}
            size="small"
            sx={{
              fontWeight: 600,
            }}
          />

        );

      },

    },

    {
      field: "createdAt",
      headerName: "Created On",
      flex: 1.4,

      renderCell: (params) =>

        params.value
          ? new Date(params.value).toLocaleString()
          : "",

    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,

      sortable: false,

      renderCell: (params) => (

        <Button
          color="error"
          variant="contained"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => handleOpen(params.row.id)}
          sx={{
            borderRadius: 2,
          }}
        >
          Delete
        </Button>

      ),

    },

  ];
    if (rows.length === 0) {

    return (

      <Box
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >

        <Typography
          variant="h6"
          color="text.secondary"
        >
          No ATS Reports Found
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
        >
          Calculate an ATS score to generate reports.
        </Typography>

      </Box>

    );

  }

  return (

    <>

      <Box
        sx={{
          height: 550,
          width: "100%",
        }}
      >

        <DataGrid

          rows={rows}

          columns={columns}

          pageSizeOptions={[5, 10, 20]}

          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}

          disableRowSelectionOnClick

          sx={{

            borderRadius: 4,

            border: "1px solid #E2E8F0",

            bgcolor: "#fff",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8FAFC",
              fontWeight: 700,
              borderBottom: "2px solid #E2E8F0",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F1F5F9",
              display: "flex",
              alignItems: "center",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F8FAFC",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #E2E8F0",
            },

          }}

        />

      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >

        <DialogTitle>
          Delete ATS Report
        </DialogTitle>

        <DialogContent>

          <DialogContentText>

            Are you sure you want to delete this ATS report?

            <br />

            This action cannot be undone.

          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{
              borderRadius: 2,
            }}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </>

  );

}