import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";

export default function UploadBox({
  file,
  setFile,
  onUpload,
}) {

  const handleChange = (e) => {

    if (e.target.files.length > 0) {

      setFile(e.target.files[0]);

    }

  };

  return (

    <Paper
      elevation={0}
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 6,
        borderRadius: 5,
        border: "2px dashed #2563EB",
        bgcolor: "#fff",
        textAlign: "center",
        transition: ".3s",

        "&:hover": {
          boxShadow: "0 12px 25px rgba(0,0,0,.08)",
        },
      }}
    >

      <CloudUploadIcon
        sx={{
          fontSize: 90,
          color: "#2563EB",
        }}
      />

      <Typography
        variant="h4"
        fontWeight="bold"
        mt={2}
      >
        Upload Resume
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
        mb={4}
      >
        Drag & Drop your PDF resume or browse from your computer.
      </Typography>

      <Button
        variant="outlined"
        component="label"
        size="large"
        sx={{
          minWidth: 200,
          borderRadius: 3,
        }}
      >

        Browse PDF

        <input
          hidden
          type="file"
          accept=".pdf"
          onChange={handleChange}
        />

      </Button>

      {file && (

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 3,
            bgcolor: "#F8FAFC",
            border: "1px solid #E2E8F0",
          }}
        >

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >

            <DescriptionIcon
              sx={{
                fontSize: 40,
                color: "#2563EB",
              }}
            />

            <Box textAlign="left">

              <Typography fontWeight="bold">

                {file.name}

              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >

                {(file.size / 1024).toFixed(2)} KB

              </Typography>

            </Box>

          </Stack>

          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              width: "100%",
              borderRadius: 3,
            }}
            onClick={onUpload}
          >

            Upload Resume

          </Button>

        </Paper>

      )}

    </Paper>

  );

}