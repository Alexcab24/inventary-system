import { Search } from "@/components/ui/Search";
import { SuppliersTable } from "@/components/ui/suppliers/SuppliersTable";
import Card from "@/components/ui/dashboard/Cards";
import { Pagination } from "@/components/ui/orders/Pagination";
import { CreateProduct } from "@/components/ui/products/Buttons";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdInventory, MdRemoveShoppingCart } from "react-icons/md";

export default function providersPage() {
    return (
        <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
                <Card title="Productos en Stock" value={1234} icon={MdInventory} />
                <Card title="Productos sin Stock" value={1234} icon={MdRemoveShoppingCart} />
                <Card title="Total de Productos" value={2468} icon={AiOutlineAppstore} />
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
                <SuppliersTable />
                <div className="mt-5 flex w-full justify-center">
                    {/* <Pagination /> */}
                </div>
            </section>
        </>
    )
}