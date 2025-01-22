import { Search } from "@/components/ui/Search";
import { SuppliersTable } from "@/components/ui/suppliers/SuppliersTable";
import Card from "@/components/ui/dashboard/Cards";
import { Pagination } from "@/components/ui/orders/Pagination";
import { CreateProduct } from "@/components/ui/products/Buttons";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdInventory, MdRemoveShoppingCart } from "react-icons/md";
import { fetchSupplierByCompany } from "@/actions/supplier/get-supplier";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";

export default async function suppliersPage({
    searchParams }:
    {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }) {

    const query = searchParams?.query || '';
    const page = searchParams?.page ? parseInt(searchParams?.page) : 1;


    const { suppliers } = await fetchSupplierByCompany();


    const totalSuppliers = suppliers?.length || 0;
    // const ProductsWithoutStock = products?.filter(product => product.stock === 0).length || 0;
    // const ProductsWithStock = products?.filter(product => product.stock !== 0).length || 0;





    return (
        <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
                <Card title="Proveedores activos" value={1234} icon={MdInventory} />
                <Card title="Proveedores inactivos" value={1234} icon={MdRemoveShoppingCart} />
                <Card title="Total de Proveedores" value={totalSuppliers} icon={AiOutlineAppstore} />
            </section>

            <section className="my-8">
                <div className=" py-4 grid gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Lista de proveedores
                        </h2>
                        <p className="text-sm text-gray-600">
                            Agrega proveedores, edita y más
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-3 w-full mt-4">
                        <Search placeholder="Buscar proveedor..." />
                        <CreateProduct />
                    </div>
                </div>
                <Suspense key={query} fallback={<TableSkeleton />}>
                    <SuppliersTable query={query} page={page} />
                </Suspense>
                
            </section>
        </>
    )
}