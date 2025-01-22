import Image from "next/image"
import { UpdateProduct } from "../products/Buttons"
import { getSupplierByCompany } from "@/actions/supplier/get-supplier"
import { Pagination } from "../orders/Pagination";



interface Props {
  query: string;
  page?: number;
}



export const SuppliersTable = async ({ query, page }: Props) => {



  const { suppliers = [], totalPages = 1 } = await getSupplierByCompany({ query, page });

  const totalSuppliers = suppliers.length || 0;




  return (
    <>
      {/* <!-- Table Section --> */}
      <div className="w-full mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* <!-- Header --> */}

                {/* <!-- End Header --> */}

                {/* <!-- Table --> */}
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
                                <span className="text-sm text-gray-500">{supplier.id.split('-').at(-1)}</span>
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
                              <div className="px-6 py-1.5">

                                <UpdateProduct id="1" />

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
                {/* <!-- End Table -->
  
            <!-- Footer --> */}

                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Table Section --> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalItems={totalSuppliers} totalPages={totalPages} />
      </div>
    </>
  )
}
