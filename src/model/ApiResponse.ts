import { Order } from "./Order";
import { Product } from "./Product";
import { User } from "./User";

interface AuthResponse {
  accessToken: string;
  user: User;
}

export type ApiAuthResponse = {
  code: number;
  response?: AuthResponse;
  message?: string;
};

interface UserResponse {
  user?: User;
}

interface OrderResponse {
  orderList: Order[];
}

export type ApiUserResponse = {
  code: number;
  response?: UserResponse;
  message?: string;
};

export type ApiOrderResponse = {
  code: number;
  response?: OrderResponse;
  message?: string;
};

interface ProductResponse {
  productList: Product[];
}

export type ApiProductResponse = {
  code: number;
  response?: ProductResponse;
  message?: string;
};
