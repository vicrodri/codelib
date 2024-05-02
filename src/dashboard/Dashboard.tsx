import { FC, useEffect, useState } from "react";
import { DashboardEmpty } from "./DashboardEmpty";
import { DashboardCard } from "./DashboardCard";
import { Order } from "../model/Order";
import { getUserOrders } from "../services";
import { toast } from "react-toastify";
import { useTitle } from "../utils/useTitle";
import { ApiOrderResponse, AppError } from "../model";

export const Dashboard: FC = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data: ApiOrderResponse = await getUserOrders();
        data.response ? setOrderList(data.response.orders) : toast.error(data.message);
      } catch (error) {
        error instanceof AppError
          ? toast.error(error.message)
          : toast.error("Sorry Failed to connect!", { closeButton: true, autoClose: 10000, position: "top-center" });
      }
    };
    void fetchUser();
  }, []);

  useTitle(`Dashboard`);
  return (
    <main>
      <section>
        <p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
          My Dashboard
        </p>
      </section>
      <section>
        {orderList.length > 0 ? (
          orderList.map((item) => <DashboardCard key={item.id} order={item} />)
        ) : (
          <DashboardEmpty />
        )}
      </section>
    </main>
  );
};
