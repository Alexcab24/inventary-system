import React from 'react'
import { UpdateButton } from '../Buttons'
import { DeleteProductFunction } from '../products/function-buttons/DeleteProductFunction'
import Image from 'next/image'

// interface Props {
//     movements: ProductWithRelations[]
// }


const MovementsTable = () => {
    return (
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden hidden lg:table">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="ps-6 py-3 text-start">

                    </th>

                    <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                ID / Date
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Type
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Product
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Quantity
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Location
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            User
                            </span>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Actions
                            </span>
                        </div>
                    </th>

                
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {/* fila */}

                {products.length > 0 ? (
                    products.map(product => (
                        <tr key={product.id}>
                            <td className="size-px whitespace-nowrap">
                                <div className="ps-6 py-3">
                                    <label className="flex">

                                    </label>
                                </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                    <span className="text-sm text-gray-500">{product.id.split('-').at(-1)}</span>
                                    {/* <span className="text-sm text-gray-500">EMP-2024-00001</span> */}
                                </div>
                            </td>
                            <td className="h-px w-72 whitespace-nowrap">
                                <div className="flex items-center gap-x-3">
                                    <Image className="inline-block size-[38px] rounded-full" src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={500} height={500} alt="Avatar" />
                                    <div className="grow">
                                        <span className="block text-sm font-semibold text-gray-800">{product.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                    <div className="flex items-center gap-x-3">
                                        <span className="text-sm text-gray-500">
                                            ${product.price.toFixed()}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                    <div className="flex items-center gap-x-3">
                                        <span className="text-sm text-gray-500">
                                            {product.stock}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                    <div className="flex items-center gap-x-3">
                                        <span className="text-sm text-gray-500">
                                            {product.category.name}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                    <span className="text-sm text-gray-500">{product.supplier.name}</span>
                                </div>
                            </td>
                            <td className="size-px whitespace-nowrap">
                                <div className="flex gap-x-2 px-6 py-1.5">

                                    <UpdateButton
                                        id={product.id}
                                        url="/inventory/"
                                        aria-label={`Actualizar producto ${product.name}`}
                                    />
                                    <DeleteProductFunction id={product.id} aria-label={`Eliminar producto ${product.name}`} />

                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="text-center py-4" colSpan={6}>
                            <span className="block text-sm text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</span>
                        </td>
                    </tr>
                )

                }

            </tbody>
        </table>
    )
}

export default MovementsTable
