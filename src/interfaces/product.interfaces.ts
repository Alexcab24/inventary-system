

export interface Product {
    name: string;
    description?: string;
    price: number;
    stock: number;
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


export interface PaginatedProductsProps {
    page?: number;
    take?: number;
    query: string
}

