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
            <div className="w-full max-w-5xl animate-fade-in bg-white rounded-[2rem] border border-gray-200 overflow-hidden transition-all duration-300 mx-auto">
                {/* Header */}
                <div className="sticky md:static top-0 z-10 bg-white backdrop-blur-md px-8 pt-8 pb-4 border-b border-gray-200 flex flex-col gap-1">
                    <div className="flex items-center gap-3 mb-1">
                        <IoInformationCircleOutline className="text-blue-600 text-3xl" />
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Add User</h2>
                    </div>
                    <p className="text-gray-500 text-base">Add a new user to your company</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 md:px-14 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left column */}
                        <div className="space-y-8">
                            {/* Name */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoPersonOutline className="text-gray-400 text-xl" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: "Name is required" })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                    placeholder="Enter full name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoMailOutline className="text-gray-400 text-xl" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                    placeholder="Enter email address"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-8">
                            {/* Password */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoLockClosedOutline className="text-gray-400 text-xl" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoShieldOutline className="text-gray-400 text-xl" />
                                    User Role
                                </label>
                                <select
                                    {...register('role', { required: "Role is required" })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                >
                                    <option value="admin">Administrator</option>
                                    <option value="contador">Accountant</option>
                                    <option value="user">User</option>
                                </select>
                                {errors.role && (
                                    <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit & Cancel */}
                    <div className="pt-10 flex flex-col md:flex-row gap-4 justify-end">
                        <button
                            type="submit"
                            className="w-full md:w-auto py-3 px-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all"
                        >
                            Add User
                        </button>
                        <Link
                            href="/management/users"
                            className="w-full md:w-auto text-center py-3 px-10 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
            <style jsx global>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(40px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.7s cubic-bezier(.4,0,.2,1);
                }
            `}</style>
        </>
    )
}
