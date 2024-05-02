import { ApiOrderResponse, ApiUserResponse, AppError, Order, RequestOptions, User } from "../model";
import { buildApiUrl, getSessionStorageItem } from "../utils/Utils";

export const getUser = async (): Promise<ApiUserResponse> => {
  const requestOptions: RequestOptions = {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${getSessionStorageItem<string>("token")}` },
  };
  const url = buildApiUrl(`600/users/${getSessionStorageItem<number>("cbid")}`);
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data: User = (await response.json()) as User;

  const apiResponse: ApiUserResponse = {
    code: response.status,
    response:
      typeof data !== "string"
        ? {
            user: {
              name: data.name,
              email: data.email,
              id: data.id,
            },
          }
        : null,
    message: typeof data === "string" ? data : null,
  };

  return apiResponse;
};

export const getUserOrders = async () => {
  const requestOptions: RequestOptions = {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${getSessionStorageItem<string>("token")}` },
  };
  const url = buildApiUrl(`660/orders?user.id=${getSessionStorageItem<number>("cbid")}`);
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data: Order[] = (await response.json()) as Order[];
  const apiResponse: ApiOrderResponse = {
    code: response.status,
    response: {
      orders:
        typeof data !== "string"
          ? data.map((item: Order) => ({
              id: item.id,
              quantity: item.quantity,
              amount_paid: item.amount_paid,
              user: item.user,
              productList: item.productList,
            }))
          : [],
    },
    message: typeof data === "string" ? data : null,
  };
  return apiResponse;
};

export const createOrder = async (order: Order): Promise<ApiOrderResponse> => {
  const requestOptions: RequestOptions = {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${getSessionStorageItem<string>("token")}` },
    body: JSON.stringify(order),
  };
  const url = buildApiUrl(`660/orders`);
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data: Order = (await response.json()) as Order;

  const apiResponse: ApiOrderResponse = {
    code: response.status,
    response: {
      orders: [
        {
          id: data.id,
          quantity: data.quantity,
          amount_paid: data.amount_paid,
          user: data.user,
          productList: data.productList,
        },
      ],
    },
    message: typeof data === "string" ? data : null,
  };

  return apiResponse;
};
