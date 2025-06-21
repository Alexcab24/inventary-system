'use client';

import { User } from "@/interfaces";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorNotification, successNotification } from "../notification/notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth/register";
import { IoPersonOutline, IoMailOutline, IoLockClosedOutline, IoShieldOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { LoadingOverlay } from '../LoadingOverlay';

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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const companyId = user?.companyId;

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsLoading(true);
            const { name, email, password, role } = data;

            if (!companyId) return;

            const resp = await registerUser(name, email, password, role, companyId);

            if (resp.ok) {
                successNotification(resp.message);
                router.push('/management/users');
            } else {
                errorNotification(resp.message);
            }
        } catch (error) {
            errorNotification('An error occurred while creating the user');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 via-white to-purple-50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-sm">
                            <IoInformationCircleOutline className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Add User</h1>
                            <p className="text-gray-600 mt-1">Add a new user to your company</p>
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
                            {/* Password */}
                            <div className="group">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-orange-100">
                                        <IoLockClosedOutline className="text-orange-600 text-lg" />
                                    </div>
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    {...register('password', {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter password"
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                />
                                {errors.password && (
                                    <p id="password-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

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

                    {/* Submit & Cancel */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                        <Link
                            href="/management/users"
                            className="px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-100 shadow-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-purple-100 shadow-lg"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
