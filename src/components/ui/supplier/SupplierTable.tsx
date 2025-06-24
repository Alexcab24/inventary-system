import { Supplier } from '@/interfaces/supplier.interface'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { UpdateButton } from '../Buttons'
import { IoEye, IoEyeOff } from 'react-icons/io5'

interface Props {
    suppliers: Supplier[]
}

export const SupplierTable = async ({ suppliers }: Props) => {
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
                                    Supplier
                                </span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Email
                                </span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Phone
                                </span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4 text-end">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Action
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {suppliers.length > 0 ? (
                        suppliers.map(supplier => (
                            <tr key={supplier.id} className="transition-colors hover:bg-gray-50">
                                <td className="whitespace-nowrap py-4 ps-6">
                                    <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        {supplier.id?.split('-').at(-1)}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center gap-x-3">
                                        <div className="relative size-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                                            <Image
                                                className="object-cover"
                                                src={supplier.logo || "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"}
                                                alt={`Logo of ${supplier.name}`}
                                                fill
                                            />
                                        </div>
                                        <div className="grow">
                                            <span className="block text-sm font-medium text-gray-800">
                                                {supplier.name}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <span className="text-sm text-gray-600">
                                        {supplier.email}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <span className="text-sm text-gray-600">
                                        {supplier.phone}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center justify-end gap-x-2">
                                        <UpdateButton
                                            id={supplier.id || ''}
                                            url='/suppliers'
                                            aria-label={`Update supplier ${supplier.name}`}
                                        />

                                        {/* <button
                                            className={cn(
                                                "inline-flex items-center justify-center h-6 w-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                                                supplier.isActive
                                                    ? "bg-green-500 hover:bg-red-500 focus:ring-red-500"
                                                    : "bg-red-500 hover:bg-green-500 focus:ring-green-500"
                                            )}
                                            aria-label={`${supplier.isActive ? 'Desactivar' : 'Activar'} suplidor ${supplier.name}`}
                                            title={supplier.isActive ? 'Desactivar suplidor' : 'Activar suplidor'}
                                        >
                                            {supplier.isActive ? (
                                                <IoEye size={14} className="text-white" />
                                            ) : (
                                                <IoEyeOff size={14} className="text-white" />
                                            )}
                                        </button> */}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="py-8 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-500">No suppliers were found that match your search.</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SupplierTable
