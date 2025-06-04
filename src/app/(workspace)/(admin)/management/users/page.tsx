import { Search } from "@/components/ui/Search";
import Card from "@/components/ui/dashboard/Cards";
import { AiOutlineUser } from "react-icons/ai";
import { MdAdminPanelSettings, MdPerson } from "react-icons/md";

import { fetchUserByCompany } from "@/actions/users/get-user-by-company";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { CreateButton } from "@/components/ui/Buttons";
import UsersContainer from "@/components/ui/users/UsersContainer";

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
        <div className="space-y-6">
            {/* Stats Cards Section */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Usuarios normales"
                    value={totalNormalUsers}
                    icon={MdPerson}
                    className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-emerald-100/50"
                />
                <Card
                    title="Administradores"
                    value={totalAdmins}
                    icon={MdAdminPanelSettings}
                    className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-purple-100/50"
                />
                <Card
                    title="Total de usuarios"
                    value={totalUsers}
                    icon={AiOutlineUser}
                    className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-blue-100/50"
                />
            </section>

            {/* Users Table Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Lista de usuarios
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Gestiona los usuarios de tu empresa de manera eficiente
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Search placeholder="Buscar usuarios..." />
                            <CreateButton
                                label="Agregar usuario"
                                url="/management/users/create"
                                className="whitespace-nowrap"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <Suspense key={query} fallback={<TableSkeleton />}>
                        <UsersContainer query={query} page={page} />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}