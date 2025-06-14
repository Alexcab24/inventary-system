import { ProductWithRelations } from "./product.interfaces";

export interface Category {
    id?: string;
    name: string;
    isActive: boolean;
    products?: number;
}