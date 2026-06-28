import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Avatar,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import {
  Business,
  Work,
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

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Recent Jobs
        </Typography>

        <List>

          {jobs.length === 0 ? (

            <Typography color="text.secondary">
              No Jobs Available
            </Typography>

          ) : (

            jobs.map((job, index) => (

              <Box key={job.id}>

                <ListItem
                  sx={{
                    borderRadius: 3,

                    transition: ".3s",

                    "&:hover": {
                      bgcolor: "#F8FAFC",
                    },
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
                      }}
                    >
                      <Work />
                    </Avatar>

                    <Box flex={1}>

                      <Typography
                        fontWeight="bold"
                      >
                        {job.jobTitle}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >

                        <Business
                          sx={{
                            fontSize: 18,
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

                    </Box>

                  </Stack>

                </ListItem>

                {index !== jobs.length - 1 && (
                  <Divider />
                )}

              </Box>

            ))

          )}

        </List>

      </CardContent>

    </Card>

  );

}