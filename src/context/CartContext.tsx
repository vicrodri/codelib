import { Context, ReactNode, createContext, useContext, useReducer } from "react";
import { Cart, CartActionType, cartReducer } from "../utils/Utils";
import { Product } from "../model";

const cartInitialState: Cart = {
  productList: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

interface CartProps {
  children: ReactNode;
}

const CartContext: Context<Cart> = createContext(cartInitialState);

export const CartProvider = ({ children }: CartProps) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product: Product) => {
    const updatedList = state.productList ? [...state.productList, product] : [product];
    const updatedTotal = state.total + product.price;

    dispatch({ type: CartActionType.ADD, payload: { productList: updatedList, total: updatedTotal } });
  };

  const removeFromCart = (product: Product) => {
    const updatedList = state.productList.filter((item: Product) => item.id !== product.id);
    const updatedTotal = state.total - product.price;

    dispatch({ type: CartActionType.REMOVE, payload: { productList: updatedList, total: updatedTotal } });
  };

  const clearCart = () => {
    dispatch({ type: CartActionType.CLEAR });
  };

  const contextValue: Cart = {
    productList: state.productList,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
