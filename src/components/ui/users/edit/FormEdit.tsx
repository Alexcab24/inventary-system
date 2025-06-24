'use client';

import { User, UserById } from "@/interfaces";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorNotification, successNotification } from "../../notification/notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoPersonOutline, IoMailOutline, IoShieldOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { LoadingOverlay } from '../../LoadingOverlay';
import { ChangeUserRole } from "@/actions/users/change-user-role";

interface FormInputs {
    name: string;
    email: string;
    role: 'admin' | 'user' | 'contador';
}

interface Props {
    userSession?: User;
    userById: UserById;
}

export const FormEdit = ({ userSession, userById }: Props) => {
    console.log(userById)
    const { id } = userById;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const companyId = userSession?.companyId;

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            ...userById
        }
    });


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsLoading(true);
            const { role } = data;

            if (!companyId) return;

            const resp = await ChangeUserRole(id, role)
            if (resp.ok) {
                successNotification(resp.message);
                router.push('/management/users');
            } else {
                errorNotification(resp.message);
            }
        } catch (error) {
            errorNotification('An error occurred while updating the user');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                            <IoInformationCircleOutline className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
                            <p className="text-gray-600 mt-1">Update user information and role permissions</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="group">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-blue-100">
                                        <IoPersonOutline className="text-blue-600 text-lg" />
                                    </div>
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', { required: "Name is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter full name"
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <p id="name-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-100">
                                        <IoMailOutline className="text-green-600 text-lg" />
                                    </div>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter email address"
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && (
                                    <p id="email-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Role */}
                            <div className="group">
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-purple-100">
                                        <IoShieldOutline className="text-purple-600 text-lg" />
                                    </div>
                                    User Role
                                </label>
                                <select
                                    id="role"
                                    {...register('role', { required: "Role is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-base group-hover:border-gray-300"
                                    aria-describedby={errors.role ? "role-error" : undefined}
                                >
                                    <option value="admin">Administrator</option>
                                    <option value="contador">Accountant</option>
                                    <option value="user">User</option>
                                </select>
                                {errors.role && (
                                    <p id="role-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                        <Link
                            href="/management/users"
                            className="px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:text-gray-900 hover:border-gray-300 transition-all text-base focus:outline-none focus:ring-4 focus:ring-gray-100 shadow-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-lg"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
