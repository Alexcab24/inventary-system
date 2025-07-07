import { fetchPaginatedUsers } from '@/actions/users/get-user-by-company';
import { DeleteUserFunction } from './function-buttons/DeleteUserFunction';
import { Pagination } from '../Pagination';
import { DisabledFunctionButton } from './function-buttons/DisabledFunctionButton';
import Image from 'next/image';
import { UpdateButton } from '../Buttons';
import { User } from '@/interfaces';
import { cn } from '@/lib/utils';

interface Props {
    users: User[]
}

export const UsersTable = async ({ users }: Props) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-white">
                    <tr>
                        <th scope="col" className="ps-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    ID
                                </span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Usuario
                                </span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Email
                                </span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                    Rol
                                </span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-4 text-end">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Acciones
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id} className={cn(
                                "transition-colors hover:bg-gray-50",
                                user.disabled && "bg-gray-50"
                            )}>
                                <td className="whitespace-nowrap py-4 ps-6">
                                    <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        {user.id?.split('-').at(-1)}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center gap-x-3">
                                        <div className="relative size-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                                            <Image
                                                className={cn(
                                                    "object-cover",
                                                    user.disabled && "opacity-50"
                                                )}
                                                src={user.image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
                                                alt={`Avatar of ${user.name}`}
                                                fill
                                            />
                                        </div>
                                        <div className="grow">
                                            <span className={cn(
                                                "block text-sm font-medium",
                                                user.disabled ? "text-gray-400" : "text-gray-800"
                                            )}>
                                                {user.name}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <span className={cn(
                                        "text-sm",
                                        user.disabled ? "text-gray-400" : "text-gray-600"
                                    )}>
                                        {user.email}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <span className={cn(
                                        "inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-sm font-medium",
                                        user.role === 'admin'
                                            ? "bg-purple-50 text-purple-700"
                                            : "bg-blue-50 text-blue-700"
                                    )}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 px-6">
                                    <div className="flex items-center justify-end gap-x-2">
                                        <UpdateButton
                                            id={user.id || ''}
                                            url='/management/users'
                                            aria-label={`Update user ${user.name}`}
                                        />
                                        <DisabledFunctionButton
                                            id={user.id || ''}
                                            enabled={user.disabled || false}
                                            aria-label={user.disabled ? `Enable user ${user.name}` : `Disable user ${user.name}`}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="py-8 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
