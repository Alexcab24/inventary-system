import { ProductWithRelations } from './product.interfaces';

export * from './user.interfaces'
export * from './product.interfaces'

export type MovementType = 'Inbound' | 'Outbound' | 'Transfer' | 'Adjustment';

export interface Movement {
    id: string;
    type: MovementType;
    quantity: number;
    createdAt: Date;
    product: ProductWithRelations;
}