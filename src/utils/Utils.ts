import { Product } from "../model";

export const getLocalStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorageItem = <T>(key: string): T | null => {
  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setSessionStorageItem = <T>(key: string, value: T): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const buildApiUrl = (apiPath: string): string => {
  const url = `${import.meta.env.VITE_API_HOST}/${apiPath}`;
  return url;
};

export interface Filter {
  productList?: Product[];
  onlyInStock?: boolean;
  bestSellerOnly?: boolean;
  sortBy?: any;
  ratings?: any;
  setInitialProductList?(data: object): void;
}

export enum FilterActionType {
  PRODUCT_LIST = "PRODUCT_LIST",
  SORT_BY = "SORT_BY",
  RATINGS = "RATINGS",
  BEST_SELLER_ONLY = "BEST_SELLER_ONLY",
  IN_STOCK_ONLY = "IN_STOCK_ONLY",
  CLEAR = "CLEAR",
}

export enum SortingType {
  LOW_TO_HIGH = "lowtohigh",
  HIGH_TO_LOW = "hightolow",
  DEFAULT = "",
}

export enum Rating_Filter {
  MORETHAN4 = "4STARSABOVE",
  MORETHAN3 = "3STARSABOVE",
  MORETHAN2 = "2STARSABOVE",
  MORETHAN1 = "1STARSABOVE",
  DEFAULT = "",
}

export interface FilterAction {
  type: FilterActionType;
  payload: any;
}

export const filterReducer = (state: Filter, action: FilterAction) => {
  const { type, payload } = action;

  switch (type) {
    case FilterActionType.PRODUCT_LIST:
      return { ...state, productList: payload.productList };
    case FilterActionType.SORT_BY:
      return { ...state, sortBy: payload.sortBy };
    case FilterActionType.RATINGS:
      return { ...state, ratings: payload.ratings };
    case FilterActionType.BEST_SELLER_ONLY:
      return { ...state, bestSellerOnly: payload.bestSellerOnly };
    case FilterActionType.IN_STOCK_ONLY:
      return { ...state, onlyInStock: payload.onlyInStock };
    case FilterActionType.CLEAR:
      return { ...state, onlyInStock: false, bestSellerOnly: false, sortBy: null, ratings: null };
    default:
      throw new Error("Type not found");
  }
  return state;
};

export interface Cart {
  productList: Product[];
  total: number;
  addToCart(data: object): void;
  removeFromCart(data: object): void;
  clearCart(): void;
}

export interface CartAction {
  type: CartActionType;
  payload?: any;
}

export enum CartActionType {
  ADD = "ADD_TO_CART",
  REMOVE = "REMOVE_FROM_CART",
  CLEAR = "CLEAR_CART",
}

export const cartReducer = (state: Cart, action: CartAction) => {
  const { type, payload } = action;

  switch (type) {
    case CartActionType.ADD:
      return { ...state, productList: payload.productList, total: payload.total };
    case CartActionType.REMOVE:
      return { ...state, productList: payload.productList, total: payload.total };
    case CartActionType.CLEAR:
      return { ...state, productList: [], total: 0 };
    default:
      throw new Error("Type not found");
  }
  return state;
};
