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
  Email,
} from "@mui/icons-material";

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
            Recent Candidates
          </Typography>

          {/* <Chip
            label={`${candidates.length} Recent`}
            color="primary"
            size="small"
          /> */}
        </Stack>

        {candidates.length === 0 ? (
          <Typography color="text.secondary">
            No Candidates Found
          </Typography>
        ) : (
          <List disablePadding>

            {candidates.map((candidate, index) => (

              <Box key={candidate.id}>

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
                        bgcolor: "#2563EB",
                        width: 48,
                        height: 48,
                      }}
                    >
                      {candidate.fullName?.charAt(0)}
                    </Avatar>

                    <Box flex={1}>

                      <Typography
                        fontWeight={700}
                      >
                        {candidate.fullName}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mt={0.5}
                      >
                        <Email
                          sx={{
                            fontSize: 16,
                            color: "#64748B",
                          }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {candidate.email}
                        </Typography>

                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        flexWrap="wrap"
                        useFlexGap
                      >

                        {(candidate.skills || [])
                          .slice(0, 3)
                          .map((skill) => (

                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                            />

                          ))}

                      </Stack>

                    </Box>

                    <ArrowForward
                      sx={{
                        color: "#94A3B8",
                      }}
                    />

                  </Stack>

                </ListItem>

                {index !== candidates.length - 1 && (
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