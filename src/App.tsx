import React from 'react';

import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStyles, CssBaseline, Grid, makeStyles } from '@material-ui/core';

import { CountryView, CountriesView } from './views';
import { Routes } from './consts';
import { CountriesProvider } from './countriesProvider';

const browserHistory = createBrowserHistory();

const useStyles = makeStyles(() =>
  createStyles({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#E2E3D9',
    },
  }),
);

function App() {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <CountriesProvider>
                <Grid container justify='center' alignItems='center' direction='column' className={classes.root}>
                    <Router history={browserHistory}>
                        <Switch>
                            <Route path={Routes.Country}>
                                <CountryView />
                            </Route>
                            <Route path={Routes.Home}>
                                <CountriesView />
                            </Route>
                        </Switch>
                    </Router>
                </Grid>
            </CountriesProvider>
        </>
    );
}

export default App;
