'use client';


import { User } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorNotification, successNotification } from "../notification/notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth/register";



interface FormInputs {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'contador';
}

type Props = {
    user?: User;
}

export const Form = ({ user }: Props) => {


    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const companyId = user?.companyId;

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, password, role } = data;

        if (!companyId) {
            return;
        }
        // server action
        const resp = await registerUser(name, email, password, role, companyId);

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
            <div className='bg-white rounded-xl shadow-md border overflow-hidden p-8 min-w-full'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
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

                    {/* Contraseña */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: "La contraseña es requerida",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres"
                                }
                            })}
                            className={clsx(
                                "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                { 'border-red-500': errors.password }
                            )}
                        />
                        {errors.password && (
                            <span className="text-sm text-red-500">{errors.password.message}</span>
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
                        <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-demoHover text-white hover:bg-demo transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                            Agregar usuario
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}
