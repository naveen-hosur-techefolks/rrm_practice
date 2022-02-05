import { Category } from "./category";
import { Manufacturer } from "./manufacturer";
import { SubCategory } from "./subcategory";
import { Base } from "./base";

export interface Product extends Base {
  id: number;
  title: string;
  name:string;
  isWishlist: boolean;
  price: number;
  description: string;
  quantity: number;
  tax: number;
  image: string;
  manufacturer: Manufacturer;
  category: Category;
  subCategory: SubCategory;
  isActive: boolean;
  isAddedToCart: boolean;
  categoryId:number;
}
