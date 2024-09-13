import Image from "next/image"
import { UpdateProduct } from "../products/Buttons"





export const SuppliersTable = () => {
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
  
                        {/* <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                              contacto
                            </span>
                          </div>
                        </th> */}
  
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
  
                       
                      </tr>
                    </thead>
  
                    <tbody className="divide-y divide-gray-200">
                      {/* fila */}
                      <tr>
                        <td className="size-px whitespace-nowrap">
                          <div className="ps-6 py-3">
                            <label className="flex">
  
                            </label>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                            <span className="text-sm text-gray-500">EMP-2024-00001</span>
                          </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                            <span className="text-sm text-gray-500">Nombre de proveedor</span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <span className="text-sm text-gray-500">
                              829-123-1234
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500">Nombre de proveedor</span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-1.5">
  
                            <UpdateProduct id="1" />
  
                          </div>
                        </td>
                      </tr>
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
      </>
  )
}
