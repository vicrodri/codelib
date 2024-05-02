import { Order } from "./Order";
import { Product } from "./Product";
import { User } from "./User";

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiAuthResponse {
  code: number;
  response?: AuthResponse | null;
  message?: string | null;
}

export interface UserResponse {
  user?: User;
}

export interface OrderResponse {
  orders: Order[];
}

export interface ApiUserResponse {
  code: number;
  response?: UserResponse | null;
  message?: string | null;
}

export interface ApiOrderResponse {
  code: number;
  response?: OrderResponse;
  message?: string | null;
}

interface ProductResponse {
  products: Product[];
}

export interface ApiProductResponse {
  code: number;
  response?: ProductResponse;
  message?: string | null;
}
