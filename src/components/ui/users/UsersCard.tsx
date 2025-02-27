import { User } from '@/interfaces'
import Image from 'next/image'
import React from 'react'
import { UpdateButton } from '../Buttons'
import { DeleteProductFunction } from '../products/function-buttons/DeleteProductFunction'
import { DisabledFunctionButton } from './function-buttons/DisabledFunctionButton'

interface Props {
    users: User[]
}
// " "
const UsersCard = ({ users }: Props) => {
    return (
        <>
            {
                users.length > 0 ? (
                    users.map(users => (
                        <div key={users.id} className={`${users.disabled ? 'bg-gray-100 text-gray-400' : ''} hover:bg-gray-50 transition-colors w-full  mx-auto my-4 border border-gray-200 rounded-xl p-4 flex flex-col gap-2 sm:flex-row sm:items-center`}>
                            {/* Imagen del producto */}


                            {/* Información del producto */}
                            <div className="flex flex-col flex-grow">
                                <div className='flex items-center gap-2'>

                                    <Image
                                        className={`inline-block size-[36px] rounded-full ${users.disabled ? 'opacity-50' : ''}`}
                                        src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                    <span className={`block text-lg font-semibold ${users.disabled ? 'text-gray-400' : 'text-gray-800'}`}>
                                        {users.name}
                                    </span>

                                </div>

                                <span className={`block text-sm ${users.disabled ? 'text-gray-400' : 'text-gray-500'}`}>{users.id?.split('-').at(-1)}</span>
                            </div>
                            <hr />

                            <div className='flex flex-col gap-4 justify-between'>

                                <div className="">
                                    <span className={`block text-sm ${users.disabled ? 'text-gray-400' : 'text-gray-500'}`}>{users.email}</span>
                                    <p className={`block text-sm ${users.disabled ? 'text-gray-400' : 'text-gray-500'}`}> {users.role}</p>
                                </div>
                                <div className="flex gap-2 py-2">
                                    <UpdateButton
                                        id={users.id || ''}
                                        url="/management/users"
                                        aria-label={`Actualizar producto ${users.name}`}
                                    />
                                    <DisabledFunctionButton id={users.id || ''} enabled={users.disabled || false} aria-label={users.disabled ? `Habilitar usuario ${users.name}` : `Deshabilitar usuario ${users.name}`} />
                                    <DeleteProductFunction id={users.id || ''} aria-label={`Eliminar usuario ${users.name}`} />
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <span className="block text-sm text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</span>
                )
            }
        </>
    )
}

export default UsersCard
