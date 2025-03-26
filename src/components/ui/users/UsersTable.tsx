import { fetchPaginatedUsers } from '@/actions/users/get-user-by-company';
import { DeleteUserFunction } from './function-buttons/DeleteUserFunction';
import { Pagination } from '../orders/Pagination';
import { DisabledFunctionButton } from './function-buttons/DisabledFunctionButton';
import Image from 'next/image';
import { UpdateButton } from '../Buttons';
import { User } from '@/interfaces';

interface Props {
    users: User[]
}

export const UsersTable = async ({ users }: Props) => {
    return (
        <>
            <div className="w-full mx-auto">
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
                                                        User
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Email
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Role
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                                        Options
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
                                                                <span className={`block text-sm ${user.disabled ? 'text-gray-400' : 'text-gray-500'}`}>{user.id?.split('-').at(-1)}</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <Image
                                                                    className={`inline-block size-[38px] rounded-full ${user.disabled ? 'opacity-50' : ''}`}
                                                                    src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                                                                    alt={`Avatar of ${user.name}`}
                                                                    width={50}
                                                                    height={50}
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
                                                    <td className="size-px whitespace-nowrap">
                                                        <div className="flex gap-x-2 px-6 py-1.5">
                                                            <UpdateButton
                                                                id={user.id || ''}
                                                                url='/management/users'
                                                                aria-label={`Update user ${user.name}`}
                                                            />
                                                            <DisabledFunctionButton id={user.id || ''} enabled={user.disabled || false} aria-label={user.disabled ? `Enable user ${user.name}` : `Disable user ${user.name}`} />
                                                            <DeleteUserFunction id={user.id || ''} aria-label={`Delete user ${user.name}`} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center py-4" colSpan={6}>
                                                    <span className="block text-sm text-gray-500">No users found matching the search.</span>
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
        </>
    )
}
