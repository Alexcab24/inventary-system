'use client';


import { registerUser } from "@/actions";
import { User } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

    const companyId = user?.companyId
    console.log('id de empresa', companyId)


    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');

        const { name, email, password, role } = data;
      
        if (!companyId) {
            return;
        }

        //server action
        const resp = await registerUser(name, email, password, role, companyId);

        if (!resp.ok) {
            setErrorMessage(resp.message)
            return;
        }
        console.log(resp)
    }


    return (
        <>
            <div className='bg-gray-50 rounded-xl shadow-sm overflow-hidden p-8 min-w-full'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Nombre */}
                    <div>
                        {/* {
                            errors.name?.type === 'required' && (
                                <span className="text-red-500">* El nombre es obligatorio</span>
                            )

                        } */}
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: true })}
                            // autoFocus
                            className={
                                clsx(
                                    "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                    {
                                        'border-red-500': errors.name
                                    }
                                )
                            }

                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            className={
                                clsx(
                                    "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                    {
                                        'border-red-500': errors.email
                                    }
                                )
                            }

                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            // type={showPassword ? 'text' : 'password'}
                            type="password"
                            id="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className={
                                clsx(
                                    "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                    {
                                        'border-red-500': errors.password
                                    }
                                )
                            }
                        />
                        {/* <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            {showPassword ? (
                                <IoEye className="h-5 w-5 text-gray-500" />
                            ) : (
                                <IoEyeOff className="h-5 w-5 text-gray-500" />
                            )}
                        </button> */}
                    </div>

                    {/* Rol */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            id="role"
                            {...register('role')}
                            // value={rol}
                            // onChange={(e) => setRol(e.target.value)}
                            className={
                                clsx(
                                    "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                    {
                                        'border-red-500': errors.role
                                    }
                                )
                            }
                        >
                            <option value="admin">Administrador</option>
                            <option value="contador">Contador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </div>
                    <span className="text-red-500">{errorMessage}</span>
                    {/* Botón de envío */}
                    <div className="flex flex-col-reverse md:flex-row justify-end gap-x-4">
                        <Link href={'/management/users'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                            Cancelar
                        </Link>
                        <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Agregar usuario
                        </button>
                    </div>

                </form >
            </div >

        </>
    )
}
