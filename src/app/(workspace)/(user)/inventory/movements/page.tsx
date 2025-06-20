import { CreateButton } from "@/components/ui/Buttons";
import { Search } from "@/components/ui/Search";
import { MovementsContainerWrapper } from "@/components/ui/movements/MovementsContainerWrapper";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { MdInventory, MdRemoveShoppingCart, MdSwapHoriz } from "react-icons/md";
import Card from "@/components/ui/dashboard/Cards";

export default async function movementsPage({
    searchParams }:
    {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }
) {
    const query = searchParams?.query || '';
    const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

    return (
        <div className="space-y-6">
            {/* Stats Section */}
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Card title="Entradas" value={0} icon={MdInventory} />
                <Card title="Salidas" value={0} icon={MdRemoveShoppingCart} />
                <Card title="Transferencias" value={0} icon={MdSwapHoriz} />
            </section>

            {/* Main Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <MdSwapHoriz className="w-6 h-6 text-blue-600" />
                                Movimientos de Inventario
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Gestiona y monitorea todos los movimientos de tu inventario
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Search placeholder="Buscar por nombre, ID..." />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Movements Table Section */}
                    <Suspense key={query} fallback={<TableSkeleton />}>
                        <MovementsContainerWrapper query={query} page={page} />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}