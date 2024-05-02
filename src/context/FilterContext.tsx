import { Context, createContext } from "react";
import { FilterContextProps, filterContextInitialState } from "./useFilter";

export const FilterContext: Context<FilterContextProps> = createContext(filterContextInitialState);
