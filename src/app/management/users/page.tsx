


import { Search } from "@/components/ui/Search";
import Card from "@/components/ui/dashboard/Cards";
import { AiOutlineUser } from "react-icons/ai";
import { MdCheckCircleOutline, MdPendingActions } from "react-icons/md";
import { UsersTable } from '../../../components/ui/users/UsersTable';
import { fetchUserByCompany } from "@/actions/users/get-user-by-company";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { CreateButton } from "@/components/ui/Buttons";
import { DeleteUserById } from "@/actions/users/delete-user-by-id";



export default async function UserPage({
    searchParams }:
    {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }) {




    const query = searchParams?.query || '';
    const page = searchParams?.page ? parseInt(searchParams?.page) : 1;


    //Cards fetch
 
    const { users } = await fetchUserByCompany();

    const totalUsers = users?.length || 0;
    const totalAdmins = users?.filter(user => user.role === 'admin').length || 0;
    const totalNormalUsers = users?.filter(user => user.role === 'user').length || 0;


    return (
        <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
                <Card title="Usuarios" value={totalNormalUsers} icon={MdCheckCircleOutline} />
                <Card title="Administradores" value={totalAdmins} icon={MdPendingActions} />
                <Card title="Total de usuarios" value={totalUsers} icon={AiOutlineUser} />
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
                        <CreateButton label='Agregar usuario' url='/management/users/create' />
                    </div>
                </div>
                <Suspense key={query} fallback={<TableSkeleton />}>
                    <UsersTable query={query} page={page} />
                </Suspense>

            </section>

        </>
    )
}