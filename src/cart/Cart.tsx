import { useCart } from "../context";
import { useTitle } from "../utils/useTitle";
import { CartEmpty } from "./CartEmpty";
import { CartList } from "./CartList";

export const Cart = () => {
  const { productList } = useCart();

  useTitle(`Cart (${productList.length})`);
  return <main>{productList.length === 0 ? <CartEmpty /> : <CartList />}</main>;
};
