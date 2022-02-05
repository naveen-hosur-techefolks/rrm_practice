import { Base } from "./base";

export interface orders extends Base {
  customer_id:number;
  orderStatus:Base;
  billingAddress:any;
  deliveryAddress:any;
  invoice_number:number;
  invoice_prefix:string;
  invoice_location:string;
  totalPrice:number;
  createdOn:Date;
}
