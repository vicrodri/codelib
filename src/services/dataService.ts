import { ApiOrderResponse, ApiUserResponse, AppError, Order, RequestOptions } from "../model";
import { buildApiUrl, getSessionStorageItem } from "../utils/Utils";

export const getUser = async (): Promise<ApiUserResponse> => {
  const requestOptions: RequestOptions = {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${getSessionStorageItem("token")}` },
  };
  const url = buildApiUrl(`600/users/${getSessionStorageItem("cbid")}`);
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data = await response.json();

  const apiResponse: ApiUserResponse = {
    code: response.status,
    response: data.id
      ? {
          user: {
            name: data.name,
            email: data.email,
            id: data.id,
          },
        }
      : {},
    message: !data.id ? data : null,
  };

  return apiResponse;
};

export const getUserOrders = async () => {
  const requestOptions: RequestOptions = {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: `Bearer ${getSessionStorageItem("token")}` },
  };
  const url = buildApiUrl(`660/orders?user.id=${getSessionStorageItem("cbid")}`);
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data = await response.json();
  const apiResponse: ApiOrderResponse = {
    code: response.status,
    response: {
      orderList: data.length
        ? data.map((item: Order) => ({
            id: item.id,
            quantity: item.quantity,
            amount_paid: item.amount_paid,
            user: item.user,
            productList: item.productList,
          }))
        : [],
    },
    message: !data.length ? data : null,
  };
  return apiResponse;
};

export const createOrder = async (order: Order): Promise<ApiOrderResponse> => {
  const requestOptions: RequestOptions = {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${getSessionStorageItem("token")}` },
    body: JSON.stringify(order),
  };
  const url = buildApiUrl(`660/orders`);
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new AppError(response.status, response.statusText);
  }
  const data = await response.json();

  const apiResponse: ApiOrderResponse = {
    code: response.status,
    response: {
      orderList: [
        {
          id: data.id,
          quantity: data.quantity,
          amount_paid: data.amount_paid,
          user: data.user,
          productList: data.productList,
        },
      ],
    },
    message: !data.id ? data : null,
  };

  return apiResponse;
};
