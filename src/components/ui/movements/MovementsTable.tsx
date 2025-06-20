// import { Movement } from '@/interfaces'
import { cn } from '@/lib/utils'
import React from 'react'
import { UpdateButton } from '../Buttons'
// import { DeleteMovementFunction } from './function-buttons/DeleteMovementFunction'
import { Movement } from '@/interfaces'
import { MdSwapHoriz } from 'react-icons/md'

interface Props {
    movements: Movement[];
}

export const MovementsTable = ({ movements }: Props) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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
                                    Producto
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Tipo
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Fecha
                                </span>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-4 text-end">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Cantidad
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {movements.length > 0 ? (
                        movements.map(movement => (
                            <tr key={movement.id} className="transition-colors hover:bg-gray-50">
                                <td className="whitespace-nowrap py-4 ps-6">
                                    <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        {movement.id?.split('-').at(-1) || 'N/A'}
                                    </span>
                                </td>

                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center gap-x-3">
                                        <div className="grow">
                                            <span className="block text-sm font-medium text-gray-800">{movement.product.name}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center gap-x-2">
                                        <span className={cn(
                                            "inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-sm font-medium",
                                            movement.type === 'Inbound' ? "bg-green-50 text-green-700" :
                                                movement.type === 'Outbound' ? "bg-red-50 text-red-700" :
                                                    "bg-blue-50 text-blue-700"
                                        )}>
                                            {movement.type}
                                        </span>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap py-4 px-6">
                                    <span className="text-sm text-gray-600">
                                        {formatDate(movement.createdAt)}
                                    </span>
                                </td>

                                <td className="whitespace-nowrap py-4 px-6 text-end">
                                    <span className="text-sm font-medium text-gray-800">
                                        {movement.quantity}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="py-8 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <span className="text-sm text-gray-500">No se encontraron movimientos que coincidan con la búsqueda.</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default MovementsTable
