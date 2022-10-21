import { Grid, Typography, Button } from "@mui/material";

export const displayError = (onClick: () => void) => (
    <Grid>
      <Typography color="red" component="h2">
        Something went wrong!
      </Typography>
      <Button onClick={onClick}>Retry</Button>
    </Grid>
  )