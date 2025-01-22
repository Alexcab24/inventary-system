'use client';

import { generatePaginationNumbers } from '@/utils/getPaginationNumbers';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'


interface Props {
    totalItems: number,
    totalPages: number,


}

export const Pagination = ({ totalItems, totalPages }: Props) => {


    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathname);
    }


    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`
        }

        if (+pageNumber <= 0) {
            return `${pathname}`; 
        }

        if (+pageNumber > totalPages) { // Next > 
            return `${pathname}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;

    }




    return (
        <section className="px-6 py-4 w-full grid gap-3 md:flex md:justify-between md:items-center">
            <div>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                        {`${totalItems} resultado${totalItems !== 1 ? 's' : ''}`}
                    </span>
                </p>
            </div>


            <div className="flex text-center justify-center  ">

                <nav aria-label="Page navigation example">

                    <ul className="flex gap-x-2 list-style-none">
                        <li className="page-item">
                            <Link
                                className=" py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                                href={createPageUrl(currentPage - 1)}
                            >
                                <span className='flex items-center'>
                                    <IoIosArrowBack />
                                    Ant
                                </span>
                            </Link>
                        </li>

                        {
                            allPages.map((page, index) => (

                                <li key={page} className="page-item">
                                    <Link
                                        className={
                                            clsx(
                                                "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                                {
                                                    'bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-700': page === currentPage
                                                }
                                            )
                                        }
                                        href={createPageUrl(page)}
                                    >
                                        {page}
                                    </Link>
                                </li>

                            ))

                        }




                        <li className="page-item">
                            <Link
                                className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                                href={createPageUrl(currentPage + 1)}
                            >
                                <span className='flex items-center'>
                                    Sig
                                    <IoIosArrowForward />
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    )
}
