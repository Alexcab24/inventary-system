

export interface Product {
    name: string;
    description?: string | null;
    price: number;
    stock: number;
  
    supplierId?: string;
    categoryId?: string;
    companyId?: string;
}

export interface ProductWithRelations extends Product {
    id: string,
    createdAt: Date;
    category: {
        id: string;
        name: string;
    };
    supplier: {
        id: string;
        name: string;
    };
}


