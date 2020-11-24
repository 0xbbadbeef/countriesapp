import React from "react";
import { Country } from "interfaces";

export const countriesContext = React.createContext<Country[] | null>([]);
