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
        <section className="px-6 py-4 w-full grid gap-4 md:flex md:justify-between md:items-center">
            <div>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                        {`${totalItems} result${totalItems !== 1 ? 's' : ''}`}
                    </span>
                </p>
            </div>

            <div className="flex justify-center">
                <nav aria-label="Page navigation" className="flex items-center gap-1">
                    {/* Previous Button */}
                    <Link
                        className={`inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${currentPage <= 1
                            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        href={currentPage <= 1 ? '#' : createPageUrl(currentPage - 1)}
                        onClick={currentPage <= 1 ? (e) => e.preventDefault() : undefined}
                    >
                        <IoIosArrowBack className="w-4 h-4" />
                    </Link>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                        {allPages.map((page, index) => {
                            // Handle ellipsis
                            if (page === '...') {
                                return (
                                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                                        ...
                                    </span>
                                );
                            }

                            // Handle numeric pages
                            return (
                                <Link
                                    key={page}
                                    className={`inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${page === currentPage
                                        ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                        }`}
                                    href={createPageUrl(page)}
                                >
                                    {page}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <Link
                        className={`inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${currentPage >= totalPages
                            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        href={currentPage >= totalPages ? '#' : createPageUrl(currentPage + 1)}
                        onClick={currentPage >= totalPages ? (e) => e.preventDefault() : undefined}
                    >
                        <IoIosArrowForward className="w-4 h-4" />
                    </Link>
                </nav>
            </div>
        </section>
    )
}
