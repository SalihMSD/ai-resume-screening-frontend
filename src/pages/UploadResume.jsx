import { useState } from "react";

import UploadBox from "../components/upload/UploadBox";

import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";

import { uploadResume } from "../services/resumeService";

export default function UploadResume() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  async function handleUpload() {

    if (!file) return;

    try {

      setLoading(true);

      await uploadResume(file);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Resume uploaded successfully!",
      });

      setFile(null);

    } catch (error) {

      console.log(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to upload resume.",
      });

    } finally {

      setLoading(false);

    }

  }

  return (

    <>

      {/* Header */}

      <Box mb={4}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Upload Resume
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Upload candidate resumes for AI-powered screening and analysis.
        </Typography>

      </Box>

      {/* Upload Area */}

      {loading ? (

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 10,
          }}
        >

          <CircularProgress size={70} />

          <Typography
            mt={3}
            variant="h6"
            fontWeight={600}
          >
            Uploading Resume...
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Please wait while we process your file.
          </Typography>

        </Box>

      ) : (

        <UploadBox
          file={file}
          setFile={setFile}
          onUpload={handleUpload}
        />

      )}

      {/* Snackbar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </>

  );

}