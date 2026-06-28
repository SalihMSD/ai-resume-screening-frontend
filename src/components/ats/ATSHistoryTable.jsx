import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import {
    Chip,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function ATSHistoryTable({
    rows,
    onDelete,
}) {

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const columns = [

        {
            field: "candidateName",
            headerName: "Candidate",
            flex: 1.5,
        },

        {
            field: "jobTitle",
            headerName: "Job",
            flex: 1.5,
        },

        {
            field: "matchPercentage",
            headerName: "ATS Score",
            flex: 0.9,

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
            flex: 1.5,

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
                    />

                );

            },

        },

        {
            field: "createdAt",
            headerName: "Created",
            flex: 1.6,

            renderCell: (params) => {

                if (!params.value) return "";

                return new Date(params.value).toLocaleString();

            },

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
                    onClick={() => {

                        setSelectedId(params.row.id);

                        setOpen(true);

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
                    py: 8,
                    textAlign: "center",
                }}
            >

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    No ATS Reports Found
                </Typography>

            </Box>

        );

    }

    return (

        <>

            <Box
                sx={{
                    height: 500,
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

                    sx={{

                        borderRadius: 3,

                        border: "1px solid #E2E8F0",

                        "& .MuiDataGrid-columnHeaders": {

                            backgroundColor: "#F8FAFC",

                            fontWeight: "bold",

                        },

                        "& .MuiDataGrid-row:hover": {

                            backgroundColor: "#F8FAFC",

                        },

                    }}

                />

            </Box>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >

                <DialogTitle>

                    Delete ATS Report

                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this ATS report?

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
                        size="small"
                        startIcon={<DeleteIcon />}
                        sx={{
                            minWidth: 90,
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