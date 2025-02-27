import { Search } from "@/components/ui/Search";
import { SuppliersContainer } from "@/components/ui/supplier/SuppliersContainer";
import Card from "@/components/ui/dashboard/Cards";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdInventory, MdRemoveShoppingCart } from "react-icons/md";
import { fetchSupplierByCompany } from "@/actions/supplier/get-supplier";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { CreateButton } from "@/components/ui/Buttons";

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
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 py-4">
                <Card title="Proveedores activos" value={1234} icon={MdInventory} />
                <Card title="Proveedores inactivos" value={1234} icon={MdRemoveShoppingCart} />
                <Card title="Total de Proveedores" value={totalSuppliers} icon={AiOutlineAppstore} />
            </section>

            <section className="my-8 bg-white p-6 border shadow-sm rounded-xl">
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
                        <CreateButton label="Crear proveedor" url="/suppliers/create" />
                    </div>
                </div>
                <Suspense key={query} fallback={<TableSkeleton />}>
                    <SuppliersContainer query={query} page={page} />
                </Suspense>

            </section>
        </>
    )
}