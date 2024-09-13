

import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export const Pagination = () => {
    return (
        <div className="px-6 py-4 w-full grid gap-3 md:flex md:justify-between md:items-center">
            <div>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">1</span> resultado
                </p>
            </div>

            <div>
                <div className="inline-flex gap-x-2">
                    <button type="button" className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50">
                        <IoIosArrowBack />
                        Ant
                    </button>

                    <button type="button" className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50">
                        Sig
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    )
}
