export interface Wishlist {
    id?: number;
    customerId?: number;
    productId: number;
    isactive: boolean;
    createdOn?: Date;
    createdBy?: number;
    updatedOn?: Date;
    updatedBy?: number;
}
