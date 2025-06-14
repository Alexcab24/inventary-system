import { fetchProductByCompany } from "@/actions/products/get-products-by-company";
import { CreateButton } from "@/components/ui/Buttons";
import { Search } from "@/components/ui/Search";
import Card from "@/components/ui/dashboard/Cards";
import { MovementModal } from "@/components/ui/movements/MovementModal";
import { ProductsContainer } from "@/components/ui/products/ProductsContainer";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { ROUTES } from "@/router/routes";
import { Suspense } from "react";
import { MdInventory, MdInventory2, MdCategory } from "react-icons/md";

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

    const { products } = await fetchProductByCompany();


    const totalProducts = products?.length || 0;
    const ProductsWithoutStock = products?.filter(product => product.stock === 0).length || 0;
    const ProductsWithStock = products?.filter(product => product.stock !== 0).length || 0;

    return (
        <div className="space-y-6">

            {/* Stats Cards Section */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Productos en Stock"
                    value={ProductsWithStock}
                    icon={MdInventory}
                    className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-emerald-100/50"
                />
                <Card
                    title="Productos sin Stock"
                    value={ProductsWithoutStock}
                    icon={MdInventory2}
                    className="bg-gradient-to-br from-amber-50 to-white border-amber-100 hover:shadow-amber-100/50"
                />
                <Card
                    title="Total de Productos"
                    value={totalProducts}
                    icon={MdCategory}
                    className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-blue-100/50"
                />
            </section>

            {/* Products Table Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Inventario de productos
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Gestiona tu inventario de productos de manera eficiente
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Search placeholder="Buscar productos..." />
                            <CreateButton
                                label="Agregar Articulo"
                                url={ROUTES.CREATE_PRODUCT}
                                className="whitespace-nowrap"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <Suspense key={query} fallback={<TableSkeleton />}>
                        <ProductsContainer query={query} page={page} />
                    </Suspense>
                </div>
            </section>
            <MovementModal />
        </div>
    )
}