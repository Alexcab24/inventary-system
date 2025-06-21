'use client';

import { updateSupplier } from "@/actions/supplier/update-supplier";
import { User } from "@/interfaces";
import { Supplier } from "@/interfaces/supplier.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorNotification, successNotification } from "../../notification/notifications";
import { IoBusinessOutline, IoMailOutline, IoCallOutline, IoLocationOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { LoadingOverlay } from '../../LoadingOverlay';
import { useState } from "react";

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
    const [isLoading, setIsLoading] = useState(false);
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
        try {
            setIsLoading(true);
            const { name, email, phone, address } = data;

            if (!companyId) return;

            const resp = await updateSupplier(id, name, email, phone, address);

            if (resp.ok) {
                successNotification(resp.message);
                router.push('/suppliers');
            } else {
                errorNotification(resp.message);
            }
        } catch (error) {
            errorNotification('An error occurred while updating the supplier');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-blue-50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                            <IoInformationCircleOutline className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Supplier</h1>
                            <p className="text-gray-600 mt-1">Update your supplier&apos;s information and contact details</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Company Name */}
                            <div className="group">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-blue-100">
                                        <IoBusinessOutline className="text-blue-600 text-lg" />
                                    </div>
                                    Company Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', { required: "Company name is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter company name"
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
                            {/* Phone */}
                            <div className="group">
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-purple-100">
                                        <IoCallOutline className="text-purple-600 text-lg" />
                                    </div>
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register('phone', {
                                        required: "Phone number is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter phone number"
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="group">
                                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-orange-100">
                                        <IoLocationOutline className="text-orange-600 text-lg" />
                                    </div>
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    {...register('address', {
                                        required: "Address is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-base placeholder:text-gray-400 resize-none group-hover:border-gray-300"
                                    placeholder="Enter full address"
                                    rows={4}
                                    aria-describedby={errors.address ? "address-error" : undefined}
                                />
                                {errors.address && (
                                    <p id="address-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                        <Link
                            href="/suppliers"
                            className="px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:text-gray-900 hover:border-gray-300 transition-all text-base focus:outline-none focus:ring-4 focus:ring-gray-100 shadow-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-lg"
                        >
                            Update Supplier
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormEdit
