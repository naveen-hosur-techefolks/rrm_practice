import { Base } from "./base";

export interface orderproduct extends Base{
  orderid:number;
  productid:number;
  selling_price:number;
  quantity:number;
}
