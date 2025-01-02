import Image from "next/image"
import { UpdateProduct } from "./Buttons"








export const ProductsTable = () => {
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
                              número de producto
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
                              precio
                            </span>
                          </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                              stock
                            </span>
                          </div>
                        </th>
  
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                              proveedor
                            </span>
                          </div>
                        </th>
  
                        <th scope="col" className="px-6 py-3 text-end"></th>
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
                          <div className="flex items-center gap-x-3">
                            <Image className="inline-block size-[38px] rounded-full" src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={500} height={500} alt="Avatar" />
                            <div className="grow">
                              <span className="block text-sm font-semibold text-gray-800">Nombre de producto</span>
                            </div>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <span className="text-sm text-gray-500">
                              $500
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <span className="text-sm text-gray-500">
                              10
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
  