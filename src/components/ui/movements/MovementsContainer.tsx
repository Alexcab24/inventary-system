'use client';

import React from 'react'
import { MovementsTable } from "./MovementsTable";
import { Pagination } from '../Pagination';


interface Props {
    movements: any[];
    totalPages: number;
    totalMovements: number;
}

export const MovementsContainer = ({ movements, totalPages, totalMovements }: Props) => {


    return (
        <>
            {/* <!-- Table Section --> */}
            <div className="w-full mx-auto ">
                {/* <!-- Card --> */}
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                <MovementsTable movements={movements} />
                            </div>
                            <div className="lg:hidden w-full">
                                {/* <ProductCard products={products} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalItems={totalMovements} totalPages={totalPages} />
            </div>
        </>
    )
}

export default MovementsContainer
