import { useState } from "react";

import Layout from "../components/common/Layout";
import UploadBox from "../components/upload/UploadBox";

import {
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
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

    <Layout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Upload Resume
      </Typography>

      {loading ? (

        <Box
          display="flex"
          justifyContent="center"
          mt={10}
        >
          <CircularProgress size={70} />
        </Box>

      ) : (

        <UploadBox
          file={file}
          setFile={setFile}
          onUpload={handleUpload}
        />

      )}

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

    </Layout>

  );

}