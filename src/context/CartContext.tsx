import { Context, createContext } from "react";
import { Cart } from "../utils/Utils";
import { cartInitialState } from "./useCart";

export const CartContext: Context<Cart> = createContext(cartInitialState);
