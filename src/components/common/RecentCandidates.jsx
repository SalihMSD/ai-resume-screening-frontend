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

import { Email } from "@mui/icons-material";

export default function RecentCandidates({ candidates }) {

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
          Recent Candidates
        </Typography>

        <List>

          {candidates.length === 0 ? (

            <Typography color="text.secondary">
              No Candidates Available
            </Typography>

          ) : (

            candidates.map((candidate, index) => (

              <Box key={candidate.id}>

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
                        bgcolor: "#2563EB",
                      }}
                    >
                      {candidate.fullName?.charAt(0)}
                    </Avatar>

                    <Box flex={1}>

                      <Typography
                        fontWeight="bold"
                      >
                        {candidate.fullName}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >

                        <Email
                          sx={{
                            fontSize: 18,
                            color: "#64748B",
                          }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {candidate.email}
                        </Typography>

                      </Stack>

                    </Box>

                  </Stack>

                </ListItem>

                {index !== candidates.length - 1 && (
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