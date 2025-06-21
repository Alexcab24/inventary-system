import React from 'react'
import { UpdateButton } from '../Buttons'
import { Category } from '@/interfaces/category.interfaces'
import { cn } from '@/lib/utils'
import { IoEye, IoEyeOff, IoTrashOutline } from 'react-icons/io5'

interface Props {
    categories: Category[]
}

export const CategoriesTable = ({ categories }: Props) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-white">
                    <tr>
                        <th scope="col" className="ps-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    ID
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Name
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Products
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-4 text-end">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Actions
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <tr key={category.id} className="transition-colors hover:bg-gray-50">
                                <td className="whitespace-nowrap py-4 ps-6">
                                    <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        {category.id?.split('-').at(-1) || 'N/A'}
                                    </span>
                                </td>

                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center gap-x-3">
                                        <div className="grow">
                                            <span className="block text-sm font-medium text-gray-800">{category.name}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center gap-x-2">
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
                                            {category.products || 0} products
                                        </span>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center justify-end gap-x-2">
                                        {/* <UpdateButton
                                            id={category.id || ''}
                                            url="/inventory/categories"
                                            aria-label={`Actualizar categoría ${category.name}`}
                                        /> */}
                                        {/* <button
                                            className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            aria-label={`Eliminar categoría ${category.name}`}
                                            title="Eliminar categoría"
                                        >
                                            <IoTrashOutline size={14} />
                                        </button> */}
                                        <button
                                            className={cn(
                                                "inline-flex items-center justify-center h-6 w-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                                                category.isActive
                                                    ? "bg-green-500 hover:bg-red-500 focus:ring-red-500"
                                                    : "bg-red-500 hover:bg-green-500 focus:ring-green-500"
                                            )}
                                            aria-label={`${category.isActive ? 'Desactivar' : 'Activar'} producto ${category.name}`}
                                            title={category.isActive ? 'Desactivar producto' : 'Activar producto'}
                                        >
                                            {category.isActive ? (
                                                <IoEye size={14} className="text-white" />
                                            ) : (
                                                <IoEyeOff size={14} className="text-white" />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="py-8 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <span className="text-sm text-gray-500">
                                        No categories were found that match your search.</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CategoriesTable 