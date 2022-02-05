import { Base } from "./base";

export interface Address {
  id?: number;
  name?: string;
  address1?: string;
  address2?: string;
  landmark?: string;
  city?: string;
  phonenumber?: number;
  postalCode?: number;
  state?: string;
  country?: string;
  isdefault?: boolean;
  addressType?: number;
  isactive?: boolean;
  createdOn?: string;
  createdBy?: number;
  updatedOn?: string;
  updatedBy?: number;
  customerId?: number;
  stateNavigation?:Base;
  countryNavigation?:Base;
}
