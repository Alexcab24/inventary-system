import { Search } from "@/components/ui/Search";
import { CreateClient } from "@/components/ui/clients/Buttons";
import { ClientsTable } from "@/components/ui/clients/ClientsTable";
import Card from "@/components/ui/dashboard/Cards";
import { InvoicesTable } from "@/components/ui/invoices/InvoicesTable";
import { Pagination } from "@/components/ui/orders/Pagination";
import { AiOutlineFileText } from "react-icons/ai";
import { MdCheckCircleOutline, MdPendingActions } from "react-icons/md";

export default function invoicePage() {
    return (
        <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
                <Card title="Facturas pagadas" value={1234} icon={MdCheckCircleOutline} />
                <Card title="Facturas pendientes" value={'1234'} icon={MdPendingActions} />
                <Card title="Total de facturas" value={1234} icon={AiOutlineFileText} />
            </section>

            <section className="my-8">
                <div className=" py-4 grid gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Historial de facturas
                        </h2>
                        <p className="text-sm text-gray-600">
                            Descarga o imprime facturas
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-3 w-full mt-4">
                        <Search placeholder="Buscar clientes..." />
                        <CreateClient />
                    </div>
                </div>
                <InvoicesTable />
                <div className="mt-5 flex w-full justify-center">
                    <Pagination />
                </div>
            </section>
        </>
    )
}