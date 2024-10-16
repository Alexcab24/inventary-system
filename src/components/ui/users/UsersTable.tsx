import { getUserByCompany } from '@/actions/users/get-user-by-company';
import { DeleteUser, EnableDisableUser, UpdateUser } from './Buttons';
export const UsersTable = async () => {

    const { users = [] } = await getUserByCompany();

    return (
        <>
            {/* <!-- Table Section --> */}
            <div className="w-full mx-auto">
                {/* <!-- Card --> */}
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                {/* <!-- Header --> */}

                                {/* <!-- End Header --> */}

                                {/* <!-- Table --> */}
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


                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Activo
                                                    </span>
                                                </div>
                                            </th>
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
                                        {/* fila */}

                                        {
                                            users?.map(users => (
                                                <tr key={users.id}>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="ps-6 py-3">
                                                            <label className="flex">
                                                                <span className='block text-sm text-gray-500'> {users.id.split('-').at(-1)}</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img className="inline-block size-[38px] rounded-full" src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800">{users.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm text-gray-500">{users.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm text-gray-500">{users.role}</span>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm text-gray-500">En línea</span>
                                                        </div>
                                                    </td>


                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="flex gap-x-2 px-6 py-1.5">

                                                            <UpdateUser id={users.id} />
                                                            <EnableDisableUser/>
                                                            <DeleteUser id={users.id}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                {/* <!-- End Table -->

          <!-- Footer --> */}

                                {/* <!-- End Footer --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End Card --> */}
            </div>
            {/* <!-- End Table Section --> */}
        </>
    )
}
