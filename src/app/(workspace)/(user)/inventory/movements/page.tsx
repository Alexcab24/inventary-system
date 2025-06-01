import { CreateButton } from "@/components/ui/Buttons";
import Card from "@/components/ui/dashboard/Cards";
import { Search } from "@/components/ui/Search";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";

import { Suspense } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdInventory, MdRemoveShoppingCart } from "react-icons/md";

export default async function movementsPage(
    {
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
        <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 py-4">
                <Card title="Productos en Stock" value={0} icon={MdInventory} />
                <Card title="Productos sin Stock" value={0} icon={MdRemoveShoppingCart} />
                <Card title="Total de Productos" value={0} icon={AiOutlineAppstore} />
            </section>

            <section className="my-8 bg-white p-6 border shadow-sm rounded-xl">
                <div className=" py-4 grid gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Inventory Movements
                        </h2>
                        <p className="text-sm text-gray-600">
                            Manage and monitor all your inventory movements and transactions
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-3 w-full mt-4">
                        <Search placeholder="Search by product, id..." />
                        <CreateButton label="New Movement" url={''} />
                    </div>
                </div>

                <Suspense key={query} fallback={<TableSkeleton />}>
                    {/* <ProductsContainer query={query} page={page} /> */}
                </Suspense>


            </section>
        </>

    )


}