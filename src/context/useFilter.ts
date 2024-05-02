import { useContext } from "react";
import { Filter, FilterAction, Rating_Filter, SortingType } from "../utils/Utils";

import { FilterContext } from "./FilterContext";
import { Product } from "../model";

export const filterInitialState: Filter = {
  productList: [],
  onlyInStock: false,
  bestSellerOnly: false,
  sortBy: SortingType.DEFAULT,
  ratings: Rating_Filter.DEFAULT,
};

export interface FilterContextProps {
  state: Filter;
  productList: Product[];
  dispatch: (data: FilterAction) => void;
  setInitialProductList: (data: Product[]) => void;
}

export const filterContextInitialState: FilterContextProps = {
  state: filterInitialState,
  productList: [],
  dispatch: (): void => {
    throw new Error("Fucntion not implemented.");
  },
  setInitialProductList: (): void => {
    throw new Error("Fucntion not implemented.");
  },
};

export const useFilter = () => useContext(FilterContext);
