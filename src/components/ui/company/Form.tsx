'use client';

import { useRef, useState } from "react";
import { errorNotification, successNotification } from "../notification/notifications";
import { Company } from "@/interfaces/company.interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCompany } from "@/actions/company/update-company";
import { LoadingOverlay } from "../LoadingOverlay";
import Image from "next/image";

interface Props {
    company: Company;
}

interface FormInputs {
    logotype?: string | null;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    description?: string | null;
}

export const Form = ({ company }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            ...company
        }
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (file: File) => {
        setLogoFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            const { ...companyData } = data;

            formData.append('name', companyData.name);
            formData.append('email', companyData.email);
            if (companyData.phone) formData.append('phone', companyData.phone);
            if (companyData.address) formData.append('address', companyData.address);
            if (companyData.description) formData.append('description', companyData.description);
            if (logoFile) formData.append('logotype', logoFile);

            const { ok, message } = await updateCompany(formData);

            if (ok) {
                successNotification(message || '');
            } else {
                errorNotification(message || '');
            }
        } catch (error) {
            errorNotification('An error occurred while updating the company');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Logo Upload Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Company Logo
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Upload your company logo to display across the platform</p>
                    </div>
                    <div className="p-6">
                        <div
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 cursor-pointer group bg-gradient-to-b from-gray-50 to-white"
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const file = e.dataTransfer.files[0];
                                if (file && file.type.startsWith('image/')) {
                                    handleFileUpload(file);
                                } else {
                                    errorNotification('Please upload an image file');
                                }
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg, image/avif"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleFileUpload(file);
                                    }
                                }}
                            />
                            <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-all duration-300 shadow-sm">
                                {previewUrl ? (
                                    <Image
                                        src={previewUrl}
                                        alt="Company logo preview"
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                ) : (
                                    <svg
                                        className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-all duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mb-3 text-center">
                                Drag and drop your logo here, or click to browse
                            </p>
                            <button
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                            >
                                Upload Logo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Company Information Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Company Information
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Update your company details and contact information</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Company Name
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                disabled
                                id="companyName"
                                className="w-full disabled:text-gray-300 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                                placeholder="Enter company name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </label>
                            <input
                                disabled
                                {...register("email")}
                                type="email"
                                id="email"
                                className="w-full disabled:text-gray-300 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter company email"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Phone
                            </label>
                            <input
                                type="tel"
                                {...register("phone")}
                                id="phone"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                placeholder="Enter company phone"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Address
                            </label>
                            <textarea
                                id="address"
                                {...register("address")}
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white"
                                placeholder="Enter company address"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register("description")}
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white"
                                placeholder="Enter company description"
                            />
                        </div>
                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
