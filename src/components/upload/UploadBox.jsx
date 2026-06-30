import { CloudUpload, Description } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function UploadBox({
  file,
  setFile,
  onUpload,
}) {

  function handleDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }

  function handleBrowse(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >

      <Paper
        elevation={3}
        sx={{
          width: {
            xs: "100%",
            md: "70%",
          },
          borderRadius: 5,
          p: 4,
          bgcolor: "#fff",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >

        <Box
          sx={{
            border: "2px dashed #CBD5E1",
            borderRadius: 4,
            minHeight: 420,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Stack
            spacing={3}
            alignItems="center"
            textAlign="center"
          >

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CloudUpload
                sx={{
                  fontSize: 85,
                  color: "#2563EB",
                }}
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Drag & Drop Resume
            </Typography>

            <Typography
              color="text.secondary"
            >
              Upload PDF or DOCX files for AI Resume Screening
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              <Button
                component="label"
                variant="contained"
                size="large"
                sx={{
                  width: 180,
                  borderRadius: 3,
                }}
              >
                Browse File

                <input
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleBrowse}
                />

              </Button>

              <Button
                variant="contained"
                color="success"
                size="large"
                disabled={!file}
                onClick={onUpload}
                sx={{
                  width: 180,
                  borderRadius: 3,
                }}
              >
                Upload Resume
              </Button>

            </Stack>

            {file && (

              <Paper
                elevation={0}
                sx={{
                  px: 3,
                  py: 2,
                  bgcolor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: 3,
                }}
              >

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >

                  <Description color="primary" />

                  <Typography fontWeight={600}>
                    {file.name}
                  </Typography>

                </Stack>

              </Paper>

            )}

          </Stack>

        </Box>

      </Paper>

    </Box>

  );

}