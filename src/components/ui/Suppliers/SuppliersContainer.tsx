import Image from "next/image"
import { getSupplierByCompany } from "@/actions/supplier/get-supplier"
import { Pagination } from "../orders/Pagination";
import SupplierTable from "./SupplierTable";
import SupplierCard from "./SupplierCard";



interface Props {
  query: string;
  page?: number;
}



export const SuppliersContainer = async ({ query, page }: Props) => {



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
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hidden lg:table w-full">
                <SupplierTable suppliers={suppliers} />
              </div>
              <div className="lg:hidden w-full">
                <SupplierCard suppliers={suppliers} />
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
