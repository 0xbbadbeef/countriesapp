import React, { memo, useCallback, useState } from "react";

import { Box, Button, createStyles, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            marginBottom: 8,
        }
    }),
);

interface ISearch {
    onSearch: (value: string) => void;
}
export const Search: React.FC<ISearch> = memo(({ onSearch }) => {
    const [ value, setValue ] = useState('');
    const classes = useStyles();

    const onSearchClick = useCallback(() =>
        onSearch(value),
    [ value, onSearch ]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    []);

    return <Box display='flex' className={classes.container}>
        <TextField placeholder='Type here to search...' onChange={handleChange} onSubmit={onSearchClick} fullWidth />
        <Button
            onClick={onSearchClick}
            color='secondary'
        >
            Search
        </Button>
    </Box>;
})