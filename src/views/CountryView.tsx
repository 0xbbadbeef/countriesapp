import React, { memo, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Box,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Button,
} from "@material-ui/core";

import { countriesContext } from "countriesProvider/context";
import { Routes } from "consts";
import { Loading } from "components";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
        width: '40rem',
        maxWidth: '100%',
    },
    flagContainer: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    table: {
        width: '50%',
        marginTop: 10,
        marginBottom: 10,
    },
    backButton: {
        marginBottom: 10,
    }
  }),
);

export const CountryView = memo(() => {
    const { country } = useParams<{ country: string }>();
    const countryData = useContext(countriesContext);
    const classes = useStyles();

    const data = (countryData || []).find(item => item.name === country);

    const countryInfo = {
        Population: data?.population,
        Demonym: data?.demonym
    }

    return <Grid item xs={8}>
        <Box>
            <Button
                variant='contained'
                color='secondary'
                aria-label='previous'
                component={Link}
                to={Routes.Home}
                className={classes.backButton}
            >
                Back
            </Button>
        </Box>
        <Box className={classes.container}>
            <Paper>
                {Boolean(data)
                    ? <>
                    <Box display='flex' alignItems='center' flexDirection='column' className={classes.flagContainer}>
                        <img src={data?.flag} alt={`${data?.name}'s flag`} width={256} height={128} />
                        <Typography>{data?.name}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <TableContainer component={Paper} className={classes.table}>
                            <Table>
                                <TableBody>
                                    {Object.keys(countryInfo).map((item) => (
                                        <TableRow key={item}>
                                            <TableCell component="th" scope="row">
                                                {item}
                                            </TableCell>
                                            <TableCell align="right">{countryInfo[item as keyof typeof countryInfo]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    </>
                    : <Loading />
                }
            </Paper>
        </Box>
    </Grid>;
})