import { getProductsMovementsByCompany } from '@/actions/products/movements/get-movements-by-company';
import { MovementsContainer } from './MovementsContainer';

interface Props {
    query: string;
    page?: number;
}

export const MovementsContainerWrapper = async ({ query, page }: Props) => {
    const { productsMovements = [], totalPages = 1 } = await getProductsMovementsByCompany({ query, page });
    const totalMovements = productsMovements?.length || 0;

    return (
        <MovementsContainer
            movements={productsMovements}
            totalPages={totalPages}
            totalMovements={totalMovements}
        />
    );
}; 