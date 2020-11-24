import React, { forwardRef, memo, useMemo } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Country } from "interfaces";

interface ICountryListItem {
    country: Country;
}
export const CountryListItem: React.FC<ICountryListItem> = memo(({ country }) => {
    const ListItemLink = useMemo(() =>
        forwardRef<HTMLAnchorElement>((props, ref) => (
            <Link to={country.name} ref={ref} {...props} />
        )),
    [ country ]);

    return <ListItem
        component={ListItemLink}
        button
    >
        <ListItemText primary={country.name} />
    </ListItem>
})