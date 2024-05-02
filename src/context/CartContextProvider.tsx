import { ReactNode, useReducer } from "react";
import { Cart, CartActionType, cartReducer } from "../utils/Utils";
import { Product } from "../model";
import { CartContext } from "./CartContext";

interface CartProps {
  children: ReactNode;
  cartInitialState: Cart;
}

export const CartProvider = ({ children, cartInitialState }: CartProps) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product: Product): void => {
    const updatedList: Product[] = state.productList ? [...state.productList, product] : [product];
    const updatedTotal: number = state.total + product.price;

    dispatch({ type: CartActionType.ADD, payload: { productList: updatedList, total: updatedTotal } });
  };

  const removeFromCart = (product: Product): void => {
    const localProductList: Product[] = state.productList;
    const updatedTotal: number = state.total - product.price;

    dispatch({
      type: CartActionType.REMOVE,
      payload: { productList: localProductList.filter((item: Product) => item.id !== product.id), total: updatedTotal },
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionType.CLEAR, payload: {} });
  };

  const contextValue: Cart = {
    productList: state.productList,
    total: state.total,
    addToCart: (product: Product) => addToCart(product),
    removeFromCart: (product: Product) => removeFromCart(product),
    clearCart: clearCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
