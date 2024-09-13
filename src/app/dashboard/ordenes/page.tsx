import { Search } from "@/components/ui/Search";
import Card from "@/components/ui/dashboard/Cards";
import { CreateOrder } from "@/components/ui/orders/Buttons";
import { Pagination } from "@/components/ui/orders/Pagination";
import { OrdersTable } from "@/components/ui/tables/OrdersTable";
import { LuClipboardCheck, LuClipboardList } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";





export default async function ordersPage() {

    return (
        <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
                <Card title="Órdenes Completadas" value={1234} icon={LuClipboardCheck} />
                <Card title="Órdenes Pendientes" value={'1234'} icon={MdPendingActions} />
                <Card title="Total de Órdenes" value={`RD$${1234}`} icon={LuClipboardList} />
            </section>

            <section className="my-8">
                <div className=" py-4 grid gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Lista de órdenes
                        </h2>
                        <p className="text-sm text-gray-600">
                            Agrega órdenes, edita y más
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-3 w-full mt-4">
                        <Search placeholder="Buscar órdenes..." />
                        <CreateOrder />
                    </div>
                </div>
                <OrdersTable />
                <div className="mt-5 flex w-full justify-center">
                    <Pagination />
                </div>
            </section>


        </>
    )
}