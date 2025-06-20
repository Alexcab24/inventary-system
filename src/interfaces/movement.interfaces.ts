import { Product } from "./product.interfaces";

export type MovementType = 'Inbound' | 'Outbound' | 'Transfer';

export interface Movement {
    id: string;
    type: MovementType;
    quantity: number;
    createdAt: Date;
    product: Product;
}

export interface Movements {
    productId: string;
    movementsType: MovementType;
    quantity: number;
    description?: string;
}