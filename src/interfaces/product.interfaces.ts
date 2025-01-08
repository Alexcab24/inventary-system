export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    supplierId: string;
    companyId: string;
}





export interface PaginatedProductsProps {
    page?: number;
    take?: number;
    query: string
}

