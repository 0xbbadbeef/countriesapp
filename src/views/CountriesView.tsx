import React, { memo, useCallback, useContext, useState } from "react";
import {
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Box,
    Button,
    List,
} from "@material-ui/core";

import { countriesContext } from "countriesProvider/context";
import { CountryListItem, Loading, Search } from "components";
import { PAGE_COUNT } from "consts";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
        width: '40rem',
        maxWidth: '100%',
    },
    controls: {
        justifyContent: 'space-between',
        marginTop: 8,
    },
    list: {
        overflow: 'auto',
        maxHeight: '60vh',
    },
  }),
);

export const CountriesView = memo(() => {
    const data = useContext(countriesContext);
    const classes = useStyles();

    const [ page, setPage ] = useState(0);
    const [ filterText, setFilter ] = useState('');

    const previousPage = useCallback(() => setPage(page - 1), [ page ]);
    const nextPage = useCallback(() => setPage(page + 1), [ page ]);
    const onSearch = useCallback((value: string) => [
        setFilter(value),
        setPage(0),
    ], [])

    const usableData = (data || [])
        .filter(item =>
            item.name.toLowerCase().includes(filterText.toLowerCase())    
        )
        .sort((left, right) => left.name.localeCompare(right.name)) // it should already be sorted, but just to be safe
    const offset = PAGE_COUNT * page;

    return <Grid item xs={8}>
        <Search onSearch={onSearch} />
        <Box className={classes.container}>
            <Paper>
                {Boolean(data)
                    ? <List className={classes.list}>
                        {
                            usableData.slice(0 + offset, PAGE_COUNT + offset).map(country => (
                                <CountryListItem key={country.name} country={country} />
                            ))
                        }
                    </List>
                    : <Loading />
                }
            </Paper>
        </Box>
        <Box display='flex' className={classes.controls}>
            <Box visibility={page === 0 ? 'hidden' : 'visible'}>
                <Button 
                    onClick={previousPage}
                    variant='contained'
                    color='secondary'
                    aria-label='previous'
                >
                    Previous
                </Button>
            </Box>
            <Box visibility={usableData.length - offset <= PAGE_COUNT ? 'hidden' : 'visible'}>
                <Button
                    onClick={nextPage}
                    variant='contained'
                    color='secondary'
                    aria-label='next'
                >
                    Next
                </Button>
            </Box>
        </Box>
    </Grid>;
})