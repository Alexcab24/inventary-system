'use client';

import { updateSupplier } from "@/actions/supplier/update-supplier";
import { User } from "@/interfaces";
import { Supplier } from "@/interfaces/supplier.interface";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorNotification, successNotification } from "../../notification/notifications";


interface FormInputs {
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface Props {
    userSession?: User;
    supplierById: Supplier;
}

const FormEdit = ({ userSession, supplierById }: Props) => {


    const router = useRouter();

    const companyId = userSession?.companyId;

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            ...supplierById
        }
    });

    const { id } = supplierById;

    if (!id) return;

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, phone, address } = data;

        if (!companyId) {
            return;
        }

        // server action
        const resp = await updateSupplier(id, name, email, phone, address)


        if (resp.ok) {
            successNotification(resp.message);
            router.push('/dashboard/suppliers');
            return;
        } else {
            // setErrorMessage(resp.message);
            errorNotification(resp.message);
            return;
        }


    }



    return (

        <div className='bg-gray-50 rounded-xl shadow-sm overflow-hidden p-8 min-w-full'>
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
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                        type="text"
                        id="text"
                        {...register('phone', {
                            required: "El telefono es requerido",
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
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <textarea
                        id="text"
                        {...register('address', {
                            required: "La dirección es requerida",
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

                {/* Botón de envío */}
                <div className="flex flex-col-reverse md:flex-row justify-end gap-4">
                    <Link href={'/suppliers'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                        Cancelar
                    </Link>
                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        Actualizar suplidor
                    </button>
                </div>

            </form>

        </div>
    )
}

export default FormEdit
