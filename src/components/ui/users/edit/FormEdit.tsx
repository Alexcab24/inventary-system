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

interface Props {
    userSession?: User;
    userById: UserById;
}

export const FormEdit = ({ userSession, userById }: Props) => {
    const { id } = userById;
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
        const resp = await ChangeUserRole(id, role)

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
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            disabled
                            {...register('name', { required: "Name is required" })}
                            className={clsx(
                                "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                { 'border-red-500': errors.name }
                            )}
                        />
                        {errors.name && (
                            <span className="text-sm text-red-500">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            disabled
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format"
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

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            {...register('role', { required: "Role is required" })}
                            className={clsx(
                                "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                                { 'border-red-500': errors.role }
                            )}
                        >
                            <option value="admin">Administrator</option>
                            <option value="contador">Accountant</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && (
                            <span className="text-sm text-red-500">{errors.role.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col-reverse md:flex-row justify-end gap-x-4">
                        <Link href={'/management/users'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                            Cancel
                        </Link>
                        <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-demoHover text-white hover:bg-demo transition-all duration-300 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Update user
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
