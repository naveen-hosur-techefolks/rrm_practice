import { Base } from "./base";
import { Category } from "./category";

export interface SubCategory extends Base{
  category: Category;
}
