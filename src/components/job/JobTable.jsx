import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";

export default function JobTable({ rows, columns }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E2E8F0",
      }}
    >
      <Box
        sx={{
          height: 650,
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8FAFC",
              fontWeight: "bold",
              fontSize: 15,
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-row": {
              transition: ".2s",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F1F5F9",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F1F5F9",
            },

            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#FAFAFA",
            },
          }}
        />
      </Box>
    </Paper>
  );
}