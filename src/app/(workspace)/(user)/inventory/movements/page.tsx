import { Search } from "@/components/ui/Search";
import { MovementsContainerWrapper } from "@/components/ui/movements/MovementsContainerWrapper";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { MdInventory, MdRemoveShoppingCart, MdSwapHoriz } from "react-icons/md";
import Card from "@/components/ui/dashboard/Cards";
import { getMovementsCount } from "@/actions/movements/get-movements-count";
import { auth } from "@/auth.config";

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


    const session = await auth();
    const companyId = session?.user?.companyId;


    const movementCounts = companyId ? await getMovementsCount(companyId) : {
        inbound: 0,
        outbound: 0,
        transfer: 0
    };

    return (
        <div className="space-y-6">
            {/* Stats Section */}
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Card title="Inbound" value={movementCounts.inbound} icon={MdInventory} />
                <Card title="Outbound" value={movementCounts.outbound} icon={MdRemoveShoppingCart} />
                <Card title="Transfers" value={movementCounts.transfer} icon={MdSwapHoriz} />
            </section>

            {/* Main Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <MdSwapHoriz className="w-6 h-6 text-blue-600" />
                                Inventory Movements
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage and monitor all your inventory movements
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Search placeholder="Search by name, ID..." />
                        </div>
                    </div>
                </div>

                <div className="p-6">

                    <Suspense key={query} fallback={<TableSkeleton />}>
                        <MovementsContainerWrapper query={query} page={page} />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}