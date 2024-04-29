import { useLocation } from "react-router-dom";
import { OrderSuccess } from "./OrderSuccess";
import { OrderFail } from "./OrderFail";
import { useTitle } from "../utils/useTitle";

export const OrderInfo = () => {
  const { state } = useLocation();

  useTitle("Order Summary");
  return <main>{state.status === true ? <OrderSuccess orderInfo={state.data} /> : <OrderFail />}</main>;
};
