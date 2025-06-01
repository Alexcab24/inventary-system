import React from 'react'
import { Pagination } from '../orders/Pagination';
import { getProductsMovementsByCompany } from '@/actions/products/movements/get-movements-by-company';



interface Props {
    query: string;
    page?: number;
}




const MovementsContainer = async ({ query, page }: Props) => {


  const { productsMovements = [], totalPages = 1 } = await getProductsMovementsByCompany({ query, page });

  const totalProducts = productsMovements?.length || 0;
  
    return (
        <>
            {/* <!-- Table Section --> */}
            <div className="w-full mx-auto ">
                {/* <!-- Card --> */}
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hidden lg:table w-full">
                                {/* <ProductsTable products={products} /> */}
                            </div>
                            <div className="lg:hidden w-full">
                                {/* <ProductCard products={products} /> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalItems={0} totalPages={0} />
            </div>
        </>
    )
}

export default MovementsContainer
