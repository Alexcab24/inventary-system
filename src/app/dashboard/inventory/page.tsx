import { fetchProductByCompany } from "@/actions/products/get-products-by-company";
import { Search } from "@/components/ui/Search";
import Card from "@/components/ui/dashboard/Cards";
import { CreateProduct } from "@/components/ui/products/Buttons";
import { ProductsTable } from "@/components/ui/products/ProductsTable";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { Suspense } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdInventory, MdRemoveShoppingCart } from "react-icons/md";



export default async function productPage({
    searchParams }:
    {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }) {




    const query = searchParams?.query || '';
    const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

    const { products } = await fetchProductByCompany()


    const totalProducts = products?.length || 0;
    const ProductsWithoutStock = products?.filter(product => product.stock === 0).length || 0;
    const ProductsWithStock = products?.filter(product => product.stock !== 0).length || 0;


    return (
        <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
                <Card title="Productos en Stock" value={ProductsWithStock} icon={MdInventory} />
                <Card title="Productos sin Stock" value={ProductsWithoutStock} icon={MdRemoveShoppingCart} />
                <Card title="Total de Productos" value={totalProducts} icon={AiOutlineAppstore} />
            </section>

            <section className="my-8">
                <div className=" py-4 grid gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Inventario de productos
                        </h2>
                        <p className="text-sm text-gray-600">
                            Agrega productos, edita y más
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-3 w-full mt-4">
                        <Search placeholder="Buscar productos..." />
                        <CreateProduct />
                    </div>
                </div>

                <Suspense key={query} fallback={<TableSkeleton />}>
                    <ProductsTable query={query} page={page} />
                </Suspense>

               
            </section>
        </>

    )


}