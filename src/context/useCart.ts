import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Product } from "../model";
import { Cart } from "../utils/Utils";

export const useCart = () => useContext(CartContext);

export const cartInitialState: Cart = {
  productList: [] as Product[],
  total: 0 as number,
  addToCart: (): void => {
    throw new Error("Fucntion not implemented.");
  },
  removeFromCart: (): void => {
    throw new Error("Fucntion not implemented.");
  },
  clearCart: (): void => {
    throw new Error("Fucntion not implemented.");
  },
};
