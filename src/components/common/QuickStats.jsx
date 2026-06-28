import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

export default function QuickStats({

  candidates,
  jobs,
  matches,

}) {

  return (

    <Card elevation={3}>

      <CardContent>

        <Typography
          variant="h6"
          mb={2}
        >
          Quick Statistics
        </Typography>

        <Stack spacing={2}>

          <Typography>

            👥 Total Candidates : {candidates}

          </Typography>

          <Divider/>

          <Typography>

            💼 Total Jobs : {jobs}

          </Typography>

          <Divider/>

          <Typography>

            ⭐ ATS Matches : {matches}

          </Typography>

          <Divider/>

          <Typography>

            📤 Total Uploads : {candidates}

          </Typography>

        </Stack>

      </CardContent>

    </Card>

  );

}