import { Base } from "./base";

export interface Category extends Base {
  parentCategoryId:number|null;
}
