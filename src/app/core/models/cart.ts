import { Base } from "./base";
import { Product } from "./product";

export interface Cart extends Base {
  customerId?: number;
  productId: number;
  quantity: number;
  product: Product;
  customer?: any;
}
