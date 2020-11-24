import React, { memo } from "react";
import { Box, CircularProgress, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    spinner: {
        paddingTop: 10,
        paddingBottom: 10,
    },
  }),
);

export const Loading = memo(() => {
    const classes = useStyles();

    return <Box className={classes.spinner} display='flex' flexDirection='column' alignItems='center'>
        <CircularProgress color="secondary" />
    </Box>
})