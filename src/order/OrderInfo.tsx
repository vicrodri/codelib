import { useLocation } from "react-router-dom";
import { OrderSuccess } from "./OrderSuccess";
import { OrderFail } from "./OrderFail";
import { useTitle } from "../utils/useTitle";
import { NavState } from "../cart/Checkout";

export const OrderInfo = () => {
  const location = useLocation();
  const state = location.state as NavState;
  useTitle("Order Summary");
  return <main>{state.status === true && state.data ? <OrderSuccess orderInfo={state.data} /> : <OrderFail />}</main>;
};
