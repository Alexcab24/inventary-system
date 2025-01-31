

export interface Product {
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    createdAt: Date;
    supplierId?: string;
    categoryId?: string;
    companyId?: string;
}

export interface ProductWithRelations extends Product {
    id: string,
    category: {
        id: string;
        name: string;
    };
    supplier: {
        id: string;
        name: string;
    };
}


