import { Category } from '@/interfaces/category.interfaces'
import React from 'react'
import { UpdateButton } from '../Buttons'
import { cn } from '@/lib/utils'
import { IoEye, IoEyeOff, IoFolderOutline } from 'react-icons/io5'

interface Props {
    categories: Category[]
}

const CategoryCard = ({ categories }: Props) => {
    return (
        <>
            {
                categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category.id} className="w-full mx-auto my-4 bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">

                            <div className="flex flex-col flex-grow">
                                <div className='flex items-center gap-3'>
                                    <div className="p-2 rounded-lg bg-blue-100">
                                        <IoFolderOutline className="text-blue-600 text-xl" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-800 text-lg font-bold">
                                            {category.name}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            <span className='font-semibold'>ID:</span> {category.id?.split('-').at(-1) || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Content */}
                            <div className='flex gap-4 justify-between items-center'>
                                <div className="flex flex-col gap-1">
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                                        {category.products || 0} products
                                    </span>
                                    <span className={cn(
                                        "inline-flex items-center gap-x-1 rounded-full px-3 py-1 text-sm font-medium",
                                        category.isActive
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-700"
                                    )}>
                                        {category.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="flex gap-2 py-2">
                                    <button
                                        className={cn(
                                            "inline-flex items-center justify-center h-8 w-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                                            category.isActive
                                                ? "bg-green-500 hover:bg-red-500 focus:ring-red-500"
                                                : "bg-red-500 hover:bg-green-500 focus:ring-green-500"
                                        )}
                                        aria-label={`${category.isActive ? 'Deactivate' : 'Activate'} category ${category.name}`}
                                        title={category.isActive ? 'Deactivate category' : 'Activate category'}
                                    >
                                        {category.isActive ? (
                                            <IoEye size={16} className="text-white" />
                                        ) : (
                                            <IoEyeOff size={16} className="text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="w-full mx-auto my-4 bg-white border border-gray-200 rounded-xl p-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <span className="text-sm text-gray-500">
                                No categories were found that match your search.</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CategoryCard 