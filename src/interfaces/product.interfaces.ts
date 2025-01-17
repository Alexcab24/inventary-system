

export interface Product {
    id?: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category?: {
        id: string;
        name: string;
    };
    supplier?: {
        id: string
        name: string;
    };
    supplierId?: string;
    categoryId?: string;
    companyId?: string;
}





export interface PaginatedProductsProps {
    page?: number;
    take?: number;
    query: string
}

