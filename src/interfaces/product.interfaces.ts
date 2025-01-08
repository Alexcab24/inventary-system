export interface Product {
    id: string;
    name: string;
    image?: string;
    description?: string;
    price: number;
    stock: number
}





export interface PaginatedProductsProps {
    page?: number;
    take?: number;
    query: string
}

