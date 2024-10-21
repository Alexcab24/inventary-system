import { fetchPaginatedUsers } from '@/actions/users/get-user-by-company';
import { UpdateUser } from './Buttons';
import { DeleteFunction } from './function-buttons/DeleteFunction';
import { Pagination } from '../orders/Pagination';
import { DisabledFunctionButton } from './function-buttons/DisabledFunctionButton';

interface Props {
    query: string;
    page?: number;
}

export const UsersTable = async ({ query, page }: Props) => {
    const { users = [], totalPages = 1 } = await fetchPaginatedUsers({ query, page });

    const totalUsers = users?.length || 0;

    return (
        <>
            <div className="w-full mx-auto">
                {/* <!-- Card --> */}
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="ps-6 py-3 text-start">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                    #Id
                                                </span>
                                            </th>
                                            <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Usuario
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Correo electrónico
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Rol
                                                    </span>
                                                </div>
                                            </th>
                                            {/* <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Activo
                                                    </span>
                                                </div>
                                            </th> */}
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Opciones
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {users.length > 0 ? (
                                            users.map(user => (
                                                <tr key={user.id} className={`${user.disabled ? 'bg-gray-100 text-gray-400' : ''} hover:bg-gray-50 transition-colors`}>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="ps-6 py-3">
                                                            <label className="flex">
                                                                <span className={`block text-sm ${user.disabled ? 'text-gray-400' : 'text-gray-500'}`}>{user.id.split('-').at(-1)}</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img
                                                                    className={`inline-block size-[38px] rounded-full ${user.disabled ? 'opacity-50' : ''}`}
                                                                    src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                                                                    alt={`Avatar de ${user.name}`}
                                                                />
                                                                <div className="grow">
                                                                    <span className={`block text-sm font-semibold ${user.disabled ? 'text-gray-400' : 'text-gray-800'}`}>{user.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className={`block text-sm ${user.disabled ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className={`block text-sm ${user.disabled ? 'text-gray-400' : 'text-gray-500'}`}>{user.role}</span>
                                                        </div>
                                                    </td>
                                                    {/* <td className="size-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className={`block text-sm ${user.disabled ? 'text-gray-400' : 'text-gray-500'}`}>En línea</span>
                                                        </div>
                                                    </td> */}
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="flex gap-x-2 px-6 py-1.5">
                                                            <UpdateUser id={user.id} aria-label={`Actualizar usuario ${user.name}`} />
                                                            <DisabledFunctionButton id={user.id} enabled={user.disabled} aria-label={user.disabled ? `Habilitar usuario ${user.name}` : `Deshabilitar usuario ${user.name}`} />
                                                            <DeleteFunction id={user.id} aria-label={`Eliminar usuario ${user.name}`} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center py-4" colSpan={6}>
                                                    <span className="block text-sm text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalUsers={totalUsers} totalPages={totalPages} />
            </div>
        </>
    )
}
