import { Product } from "./Product";
import { User } from "./User";

export interface Order {
  id?: number;
  quantity: number;
  amount_paid: number;
  user: User;
  productList: Product[];
}
