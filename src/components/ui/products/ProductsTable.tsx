'use client'
import React from 'react'
import { UpdateButton } from '../Buttons'
import { ProductWithRelations } from '@/interfaces'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { MovementModal } from '../movements/MovementModal'
import { useMovementModalStore } from '@/store/movementModalStore'

interface Props {
    products: ProductWithRelations[]
}

export const ProductsTable = ({ products }: Props) => {
    const { openModal } = useMovementModalStore();

    return (
        <>

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
                                        Product
                                    </span>
                                </div>
                            </th>

                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Price
                                    </span>
                                </div>
                            </th>

                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Stock
                                    </span>
                                </div>
                            </th>

                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Category
                                    </span>
                                </div>
                            </th>

                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Supplier
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
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id} className="transition-colors hover:bg-gray-50">
                                    <td className="whitespace-nowrap py-4 ps-6">
                                        <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                            {product.id.split('-').at(-1)}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap py-4 px-6">
                                        <div className="flex items-center gap-x-3">
                                            <div className="relative size-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                                                <Image
                                                    className="object-cover"
                                                    src={product.image || '/images/placeholders/product-placeholder.png'}
                                                    fill
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div className="grow">
                                                <span className="block text-sm font-medium text-gray-800">{product.name}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap py-4 px-6">
                                        <div className="flex items-center gap-x-2">
                                            <span className="inline-flex items-center gap-x-1 rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap py-4 px-6">
                                        <div className="flex items-center gap-x-2">
                                            <span className={cn(
                                                "inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-sm font-medium",
                                                product.stock > 10 ? "bg-green-50 text-green-700" :
                                                    product.stock > 0 ? "bg-amber-50 text-amber-700" :
                                                        "bg-red-50 text-red-700"
                                            )}>
                                                {product.stock} in stock
                                            </span>
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap py-4 px-6">
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
                                            {product.category.name}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap py-4 px-6">
                                        <span className="text-sm text-gray-600">{product.supplier.name}</span>
                                    </td>

                                    <td className="whitespace-nowrap py-4 px-6">
                                        <div className="flex items-center justify-end gap-x-1">
                                            <button
                                                onClick={() => openModal(product.id, product.name, product.stock)}
                                                className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <IoIosArrowRoundForward size={16} />
                                            </button>
                                            <UpdateButton
                                                id={product.id || ''}
                                                url="/inventory/products"
                                                aria-label={`Actualizar producto ${product.name}`}
                                            />
                                            <button
                                                className={cn(
                                                    "inline-flex items-center justify-center h-6 w-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                                                    product.isActive
                                                        ? "bg-green-500 hover:bg-red-500 focus:ring-red-500"
                                                        : "bg-red-500 hover:bg-green-500 focus:ring-green-500"
                                                )}
                                                aria-label={`${product.isActive ? 'Desactivar' : 'Activar'} producto ${product.name}`}
                                                title={product.isActive ? 'Desactivar producto' : 'Activar producto'}
                                            >
                                                {product.isActive ? (
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
                                <td colSpan={7} className="py-8 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <span className="text-sm text-gray-500">No products were found matching your search.</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductsTable
