import { Supplier } from "@/interfaces/supplier.interface"
import { UpdateButton } from "../Buttons"
import { DeleteProductFunction } from "../users/function-buttons/DeleteProductFunction"
import Image from "next/image"


interface Props {
    suppliers: Supplier[]
}

export const SupplierCard = ({ suppliers }: Props) => {
    return (
        <>
            {
                suppliers.length > 0 ? (
                    suppliers.map(supplier => (
                        <div key={supplier.id} className="w-full  mx-auto my-4 bg-white  border border-gray-200 rounded-xl p-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                            {/* Imagen del producto */}


                            {/* Información del producto */}
                            <div className="flex flex-col flex-grow">
                                <div className='flex items-center gap-2'>

                                    <Image
                                        className="rounded-full inline-block size-[36px]"
                                        src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                    <span className="text-gray-700 text-lg font-bold">
                                        {supplier.name}
                                    </span>

                                </div>

                                <span className="text-gray-500 text-sm"> <span className='font-semibold'>ID:</span> {supplier.id.split('-').at(-1)}</span>
                            </div>
                            <hr />

                            <div className='flex gap-4 justify-between'>

                                <div className="">
                                    <span className="text-gray-500 text-xs"> <span className='font-semibold'>Email:</span> {supplier.email}</span>
                                    <p className="text-gray-500 text-xs"><span className='font-semibold'>Teléfono: </span> {supplier.phone}</p>
                                </div>
                                <div className="flex gap-2 py-2">
                                    <UpdateButton
                                        id={supplier.id}
                                        url="/suppliers/"
                                        aria-label={`Actualizar suplidor ${supplier.name}`}
                                    />
                                    <DeleteProductFunction id={supplier.id} aria-label={`Eliminar suplidor ${supplier.name}`} />
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <span className="block text-sm text-gray-500">No se encontraron suplidores que coincidan con la búsqueda.</span>
                )
            }
        </>
    )
}

export default SupplierCard
