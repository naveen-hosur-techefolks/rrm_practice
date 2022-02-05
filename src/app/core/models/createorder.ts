export interface createorder {
  id?: number;
  customerId?: number;
  discountVoucherId?: number;
  orderStatusId?: number;
  paymentMode?: number;
  productId: number;
  sellingPrice?: number;
  quantity: number;
  isactive: boolean;
  createdOn?: string;
  createdBy?: number;
  updatedOn?: string;
  updatedBy?: number;
  billingAddressId: number;
  deliveryAddressId: number;
  invoiceNumber?: number;
  invoicePrefix?: string;
  invoiceLocation?: string;
  totalPrice:number;
  name?:string;

}
