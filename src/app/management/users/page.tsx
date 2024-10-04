import { Search } from "@/components/ui/Search";
import Card from "@/components/ui/dashboard/Cards";
import { Pagination } from "@/components/ui/orders/Pagination";
import { AiOutlineUser } from "react-icons/ai";
import { MdCheckCircleOutline, MdPendingActions } from "react-icons/md";
import { UsersTable } from '../../../components/ui/users/UsersTable';
import { CreateUser } from "@/components/ui/users/Buttons";

export default function UserPage() {
    return (
      <>
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
                <Card title="Usuarios" value={1234} icon={MdCheckCircleOutline} />
                <Card title="Administradores" value={'1234'} icon={MdPendingActions} />
                <Card title="Total de usuarios" value={1234} icon={AiOutlineUser} />
            </section>

            <section className="my-8">
                <div className=" py-4 grid gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Lista de usuarios
                        </h2>
                        <p className="text-sm text-gray-600">
                            Agrega usuarios, edita y más
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-3 w-full mt-4">
                        <Search placeholder="Buscar clientes..." />
                        <CreateUser />
                    </div>
                </div>
                <UsersTable />
                <div className="mt-5 flex w-full justify-center">
                    <Pagination />
                </div>
            </section>

      </>
    )
}