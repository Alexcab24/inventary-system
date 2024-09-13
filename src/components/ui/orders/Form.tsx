import Link from 'next/link'
import React from 'react'
import { BsBox2 } from 'react-icons/bs'
import { CiClock2, CiUser } from 'react-icons/ci'
import { HiOutlineReceiptTax } from 'react-icons/hi'
import { IoCheckmarkOutline } from 'react-icons/io5'

export const Form = () => {

    const dateNow = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
    }).format(new Date());

    return (
        <div className='bg-gray-50 rounded-xl shadow-sm overflow-hidden p-8 min-w-full'>
            <form action="/agregar-orden" method="POST" className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Seleccionar un cliente</label>
                <div className="relative">
                    <select
                        id="customer"
                        name="customerId"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        aria-describedby="customer-error"
                    >
                        <option value="" disabled>
                            Seleccionar un cliente
                        </option>
                        <option value="cliente1">
                            Cliente 1
                        </option>
                        <option value="cliente2">
                            Cliente 2
                        </option>
                        <option value="cliente3">
                            Cliente 3
                        </option>
                    </select>
                    <CiUser className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                </div>

                <div className="space-y-4">
                    <div className="product-item flex flex-col items-center md:flex-row md:space-x-4">
                        <div className="w-full md:w-2/3">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Seleccionar Producto</label>
                            <div className='relative'>
                                <select name="productos[]" className="peer block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                                    <option value="">Seleccionar Producto</option>
                                    <option value="producto1">Producto 1</option>
                                    <option value="producto2">Producto 2</option>
                                    <option value="producto3">Producto 3</option>
                                </select>
                                <BsBox2 className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 mt-4 md:mt-0">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Cantidad</label>
                            <input type="number" name="cantidad[]" className=" block w-full border border-gray-300 rounded-md p-2 shadow-sm  sm:text-sm" min="1" value="1" />
                        </div>
                    </div>
                </div>

                {/* Botón para añadir más productos */}
                <div className="flex justify-end mt-4">
                    <button type="button" className="py-2 px-4 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100">
                        + Añadir otro producto
                    </button>
                </div>

                <label className="block text-sm font-medium text-gray-700">Seleccionar impuesto aplicable</label>
                <div className="relative">
                    <select
                        id="impuesto"
                        name="impuestoId"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        aria-describedby="impuesto-error"
                    >
                        <option value="" disabled>
                            Seleccionar impuesto aplicable
                        </option>
                    </select>
                    <HiOutlineReceiptTax className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                </div>

                {/* Estado */}
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-3">
                        Establecer el estado de la orden
                    </legend>
                    <div className="rounded-md border border-gray-300 bg-white px-4 py-3">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Pendiente <CiClock2 className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="status"
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Completada <IoCheckmarkOutline className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>


                <div className='bg-gray-100 rounded-xl border border-gray-300 shadow-sm'>
                    <div className='flex justify-between items-center py-2 px-6 border-b border-gray-300'>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Fecha</label>
                        <span className='text-gray-700 text-base font-semibold'>{dateNow}</span>
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between items-center py-2 px-6 border-b border-gray-300">
                        <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                        <span className="text-gray-700 text-base font-semibold">$0.00</span>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center py-2 px-6">
                        <label className="block text-sm font-medium text-gray-700">Total</label>
                        <span className="text-gray-700 text-base font-semibold">$0.00</span>
                    </div>
                </div>
                {/* Fecha */}


                {/* Botón de envío */}
                <div className="flex flex-col-reverse md:flex-row justify-end gap-x-4">
                    <Link href={'/dashboard/ordenes'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                        Cancelar
                    </Link>
                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        Agregar Orden
                    </button>
                </div>
            </form>
        </div>

    )
}
