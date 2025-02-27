import { Supplier } from "@/interfaces/supplier.interface"
import { UpdateButton } from "../Buttons"



interface Props {
    suppliers: Supplier[]
}

export const SupplierTable = ({ suppliers }: Props) => {



    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="ps-6 py-3 text-start">

                    </th>

                    <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                código de suplidor
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                nombre
                            </span>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                Email
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                teléfono
                            </span>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                Dirección
                            </span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                Opciones
                            </span>
                        </div>
                    </th>


                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {/* fila */}
                {
                    suppliers.length > 0 ? (
                        suppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td className="size-px whitespace-nowrap">
                                    <div className="ps-6 py-3">
                                        <label className="flex">

                                        </label>
                                    </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                    <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                        <span className="text-sm text-gray-500">{supplier.id?.split('-').at(-1)}</span>
                                    </div>
                                </td>
                                <td className="h-px w-72 whitespace-nowrap">
                                    <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                        <span className="text-sm text-gray-500">{supplier.name}</span>
                                    </div>
                                </td>
                                <td className="h-px w-72 whitespace-nowrap">
                                    <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                        <span className="text-sm text-gray-500">{supplier.email}</span>
                                    </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                    <div className="px-6 py-3">
                                        <div className="flex items-center gap-x-3">
                                            <span className="text-sm text-gray-500">
                                                {supplier.phone}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                    <div className="px-6 py-3">
                                        <span className="text-sm text-gray-500">{supplier.address}</span>
                                    </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                    <div className="flex gap-x-2 px-6 py-1.5">
                                        <UpdateButton
                                            url="/suppliers/"
                                            id={supplier.id || ''}
                                        />
                                        {/* lo implementamos cuando resolvamos el error de relaciones */}
                                        {/* <DeleteSupplierFunction id={supplier.id} aria-label={`Eliminar suplidor ${supplier.name}`} /> */}


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

export default SupplierTable
