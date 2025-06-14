import { getProductsByCompany } from "@/actions/products/get-products-by-company";
import { ProductsTable } from "./ProductsTable";
import ProductCard from "./ProductCard";
import { Pagination } from '../Pagination';






interface Props {
  query: string;
  page?: number;
}




export const ProductsContainer = async ({ query, page }: Props) => {



  const { products = [], totalPages = 1 } = await getProductsByCompany({ query, page });

  const totalProducts = products?.length || 0;

  return (
    <>
      {/* <!-- Table Section --> */}
      <div className="w-full mx-auto ">
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hidden lg:table w-full">
                <ProductsTable products={products} />
              </div>
              <div className="lg:hidden w-full">
                <ProductCard products={products} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalItems={totalProducts} totalPages={totalPages} />
      </div>
    </>
  )
}
