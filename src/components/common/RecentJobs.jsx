import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForward,
  Business,
  Work,
  LocationOn,
} from "@mui/icons-material";

export default function RecentJobs({ jobs }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E2E8F0",
        height: "100%",
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Recent Jobs
          </Typography>

          {/* <Chip
            label={`${jobs.length} Recent`}
            color="success"
            size="small"
          /> */}
        </Stack>

        {jobs.length === 0 ? (

          <Typography color="text.secondary">
            No Jobs Found
          </Typography>

        ) : (

          <List disablePadding>

            {jobs.map((job, index) => (

              <Box key={job.id}>

                <ListItem
                  sx={{
                    px: 0,
                    py: 2,
                  }}
                >

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    width="100%"
                  >

                    <Avatar
                      sx={{
                        bgcolor: "#16A34A",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Work />
                    </Avatar>

                    <Box flex={1}>

                      <Typography
                        fontWeight={700}
                      >
                        {job.jobTitle}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mt={0.5}
                      >
                        <Business
                          sx={{
                            fontSize: 16,
                            color: "#64748B",
                          }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {job.companyName}
                        </Typography>

                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mt={1}
                        flexWrap="wrap"
                        useFlexGap
                      >

                        <Chip
                          icon={<LocationOn />}
                          label={job.location || "Remote"}
                          size="small"
                          variant="outlined"
                        />

                        <Chip
                          label={job.experience || "Fresher"}
                          color="success"
                          size="small"
                          variant="outlined"
                        />

                      </Stack>

                    </Box>

                    <ArrowForward
                      sx={{
                        color: "#94A3B8",
                      }}
                    />

                  </Stack>

                </ListItem>

                {index !== jobs.length - 1 && (
                  <Divider />
                )}

              </Box>

            ))}

          </List>

        )}

      </CardContent>
    </Card>
  );
}