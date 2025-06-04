// import { Movement } from '@/interfaces'
import { cn } from '@/lib/utils'
// import { format } from 'date-fns'
// import { es } from 'date-fns/locale'
import Image from 'next/image'
import React from 'react'
import { UpdateButton } from '../Buttons'
// import { DeleteMovementFunction } from './function-buttons/DeleteMovementFunction'

interface Props {
    movements: []
}

export const MovementsTable = async ({ movements }: Props) => {
    return (
        <>
        </>
        // <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        //     <table className="min-w-full divide-y divide-gray-200">
        //         <thead className="bg-gradient-to-r from-gray-50 to-white">
        //             <tr>
        //                 <th scope="col" className="ps-6 py-4">
        //                     <div className="flex items-center gap-x-2">
        //                         <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        //                             ID
        //                         </span>
        //                     </div>
        //                 </th>
        //                 <th scope="col" className="px-6 py-4">
        //                     <div className="flex items-center gap-x-2">
        //                         <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        //                             Fecha
        //                         </span>
        //                     </div>
        //                 </th>
        //                 <th scope="col" className="px-6 py-4">
        //                     <div className="flex items-center gap-x-2">
        //                         <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        //                             Tipo
        //                         </span>
        //                     </div>
        //                 </th>
        //                 <th scope="col" className="px-6 py-4">
        //                     <div className="flex items-center gap-x-2">
        //                         <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        //                             Producto
        //                         </span>
        //                     </div>
        //                 </th>
        //                 <th scope="col" className="px-6 py-4">
        //                     <div className="flex items-center gap-x-2">
        //                         <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        //                             Cantidad
        //                         </span>
        //                     </div>
        //                 </th>
        //                 <th scope="col" className="px-6 py-4 text-end">
        //                     <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        //                         Acciones
        //                     </span>
        //                 </th>
        //             </tr>
        //         </thead>

        //         <tbody className="divide-y divide-gray-200">
        //             {movements.length > 0 ? (
        //                 movements.map(movement => (
        //                     <tr key={movement.id} className="transition-colors hover:bg-gray-50">
        //                         <td className="whitespace-nowrap py-4 ps-6">
        //                             <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
        //                                 {movement.id?.split('-').at(-1)}
        //                             </span>
        //                         </td>
        //                         <td className="whitespace-nowrap py-4 px-6">
        //                             <span className="text-sm text-gray-600">
        //                                 {format(new Date(movement.createdAt), "PPP", { locale: es })}
        //                             </span>
        //                         </td>
        //                         <td className="whitespace-nowrap py-4 px-6">
        //                             <span className={cn(
        //                                 "inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-sm font-medium",
        //                                 movement.type === 'in'
        //                                     ? "bg-green-50 text-green-700"
        //                                     : "bg-red-50 text-red-700"
        //                             )}>
        //                                 {movement.type === 'in' ? 'Entrada' : 'Salida'}
        //                             </span>
        //                         </td>
        //                         <td className="whitespace-nowrap py-4 px-6">
        //                             <div className="flex items-center gap-x-3">
        //                                 <div className="relative size-10 rounded-lg overflow-hidden ring-2 ring-gray-100">
        //                                     <Image
        //                                         className="object-cover"
        //                                         src={movement.product.image || "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"}
        //                                         alt={`Image of ${movement.product.name}`}
        //                                         fill
        //                                     />
        //                                 </div>
        //                                 <div className="grow">
        //                                     <span className="block text-sm font-medium text-gray-800">
        //                                         {movement.product.name}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                         </td>
        //                         <td className="whitespace-nowrap py-4 px-6">
        //                             <span className={cn(
        //                                 "inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-sm font-medium",
        //                                 movement.type === 'in'
        //                                     ? "bg-green-50 text-green-700"
        //                                     : "bg-red-50 text-red-700"
        //                             )}>
        //                                 {movement.type === 'in' ? '+' : '-'}{movement.quantity}
        //                             </span>
        //                         </td>
        //                         <td className="whitespace-nowrap py-4 px-6">
        //                             <div className="flex items-center justify-end gap-x-2">
        //                                 <UpdateButton
        //                                     id={movement.id || ''}
        //                                     url='/management/movements'
        //                                     aria-label={`Update movement ${movement.id}`}
        //                                 />
        //                                 <DeleteMovementFunction
        //                                     id={movement.id || ''}
        //                                     aria-label={`Delete movement ${movement.id}`}
        //                                 />
        //                             </div>
        //                         </td>
        //                     </tr>
        //                 ))
        //             ) : (
        //                 <tr>
        //                     <td colSpan={6} className="py-8 text-center">
        //                         <div className="flex flex-col items-center gap-2">
        //                             <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5M4.5 20.25H6A2.25 2.25 0 008.25 18v-1.5M4.5 4.5V18A2.25 2.25 0 006 20.25h1.5m13.5-1.5V4.5A2.25 2.25 0 0018 3.75h-1.5" />
        //                             </svg>
        //                             <span className="text-sm text-gray-500">No se encontraron movimientos que coincidan con la búsqueda.</span>
        //                         </div>
        //                     </td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>
        // </div>
    )
}
