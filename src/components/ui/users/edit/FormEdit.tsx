'use client';


import { User, UserById } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { errorNotification, successNotification } from "../../notification/notifications";
import { ChangeUserRole } from "@/actions/users/change-user-role";



interface FormInputs {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'contador';
}

type Props = {
    userSession?: User;
    userById: UserById;
    userId: string;
}

export const FormEdit = ({ userSession, userById, userId }: Props) => {
  

    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const companyId = userSession?.companyId;

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            ...userById
        }
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { role } = data;

        if (!companyId) {
            return;
        }

              // server action
        const resp = await ChangeUserRole(userId, role)

        if (resp.ok) {
            successNotification(resp.message);
            router.push('/management/users');
            return;
        } else {
            setErrorMessage(resp.message);
            errorNotification(resp.message);
            return;
        }


    }

    return (
        <>

            <div className='bg-gray-50 rounded-xl shadow-sm overflow-hidden p-8 min-w-full'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            disabled
                            {...register('name', { required: "El nombre es requerido" })}
                            className={clsx(
                                "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                { 'border-red-500': errors.name }
                            )}
                        />
                        {errors.name && (
                            <span className="text-sm text-red-500">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo</label>
                        <input
                            type="email"
                            id="email"
                            disabled
                            {...register('email', {
                                required: "El correo es requerido",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "El formato del correo es inválido"
                                }
                            })}
                            className={clsx(
                                "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                { 'border-red-500': errors.email }
                            )}
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">{errors.email.message}</span>
                        )}
                    </div>


                    {/* Rol */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            id="role"
                            {...register('role', { required: "El rol es requerido" })}
                            className={clsx(
                                "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                { 'border-red-500': errors.role }
                            )}
                        >
                            <option value="admin">Administrador</option>
                            <option value="contador">Contador</option>
                            <option value="user">Usuario</option>
                        </select>
                        {errors.role && (
                            <span className="text-sm text-red-500">{errors.role.message}</span>
                        )}
                    </div>

                    {/* Botón de envío */}
                    <div className="flex flex-col-reverse md:flex-row justify-end gap-x-4">
                        <Link href={'/management/users'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                            Cancelar
                        </Link>
                        <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Actualizar usuario
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}
