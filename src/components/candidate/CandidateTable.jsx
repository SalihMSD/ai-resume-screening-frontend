import { Box, Paper } from "@mui/material";

import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";

export default function CandidateTable({ rows, columns }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E2E8F0",
      }}
    >
      <Box
        sx={{
          height: 600,
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8FAFC",
              fontWeight: 700,
              fontSize: "15px",
              borderBottom: "2px solid #E2E8F0",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-row": {
              transition: "all .2s ease",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F8FAFC",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F1F5F9",
              display: "flex",
              alignItems: "center",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #E2E8F0",
            },

            "& .MuiDataGrid-toolbarContainer": {
              p: 2,
              borderBottom: "1px solid #E2E8F0",
            },

            "& .MuiButton-root": {
              textTransform: "none",
            },
          }}
        />
      </Box>
    </Paper>
  );
}