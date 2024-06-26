import { ReactNode, useReducer } from "react";
import { Filter, FilterAction, FilterActionType, Rating_Filter, SortingType, filterReducer } from "../utils/Utils";
import { Product } from "../model";
import { FilterContext } from "./FilterContext";
import { FilterContextProps, filterInitialState } from "./useFilter";

interface FilterProps {
  children: ReactNode;
  filterInitialState: Filter;
}

export const FilterProvider = ({ children }: FilterProps) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  const setInitialProductList = (input: Product[]) => {
    dispatch({
      type: FilterActionType.PRODUCT_LIST,
      payload: {
        productList: input,
      },
    });
  };

  const filterBestSeller = (items: Product[] | undefined) => {
    return state.bestSellerOnly ? items?.filter((item) => item.best_seller === true) : items;
  };

  const filterInStock = (items: Product[] | undefined) => {
    return state.onlyInStock ? items?.filter((item) => item.in_stock === true) : items;
  };

  const sortProducts = (items: Product[] | undefined) => {
    switch (state.sortBy) {
      case SortingType.LOW_TO_HIGH:
        return items?.sort((a, b) => Number(a.price) - Number(b.price));
      case SortingType.HIGH_TO_LOW:
        return items?.sort((a, b) => Number(b.price) - Number(a.price));
      case SortingType.DEFAULT:
        return items;
    }

    return items;
  };

  const filterRating = (items: Product[] | undefined) => {
    switch (state.ratings) {
      case Rating_Filter.MORETHAN4:
        return items?.filter((item) => item.rating >= 4);
      case Rating_Filter.MORETHAN3:
        return items?.filter((item) => item.rating >= 3);
      case Rating_Filter.MORETHAN2:
        return items?.filter((item) => item.rating >= 2);
      case Rating_Filter.MORETHAN1:
        return items?.filter((item) => item.rating >= 1);
      default:
        return items;
    }
  };

  const filteredProductList = sortProducts(filterRating(filterInStock(filterBestSeller(state.productList))));

  const contextValue: FilterContextProps = {
    state,
    dispatch: (data: FilterAction) => dispatch(data),
    productList: filteredProductList ?? [],
    setInitialProductList: (data: Product[]) => setInitialProductList(data),
  };

  return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>;
};
