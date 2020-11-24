import { memo, useEffect, useState } from "react";
import axios from "axios";

import { Country } from "interfaces";
import { countriesContext } from "./context";
import { ALL_COUNTRIES_ENDPOINT } from "consts";

export const CountriesProvider: React.FC = memo(({ children }) => {
    const [ countries, setCountries ] = useState<Country[] | null>(null);
    const { Provider } = countriesContext;

    useEffect(() => {
        axios.get(ALL_COUNTRIES_ENDPOINT)
            .then(({ data }) => setCountries(data))
    }, [])

    return <Provider value={countries}>
        {children}
    </Provider>;
})
