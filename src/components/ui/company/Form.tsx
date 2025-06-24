'use client';

import { useRef, useState } from "react";
import { errorNotification, successNotification } from "../notification/notifications";
import { Company } from "@/interfaces/company.interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCompany } from "@/actions/company/update-company";
import { LoadingOverlay } from "../LoadingOverlay";
import Image from "next/image";
import { IoBusinessOutline, IoMailOutline, IoCallOutline, IoLocationOutline, IoDocumentTextOutline, IoImageOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { ROUTES } from "@/router/routes";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
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
                router.push(ROUTES.DASHBOARD);
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
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-cyan-50 via-white to-cyan-50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-sm">
                            <IoInformationCircleOutline className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
                            <p className="text-gray-600 mt-1">Update your company information and branding</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Logo Upload Section */}
                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-pink-100">
                                        <IoImageOutline className="text-pink-600 text-lg" />
                                    </div>
                                    Company Logo
                                </label>
                                <div
                                    className="w-full bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-pink-400 hover:shadow-lg focus-within:border-pink-500"
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
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                >
                                    <div className="aspect-square w-full max-w-48 mx-auto flex items-center justify-center p-6">
                                        {previewUrl ? (
                                            <>
                                                <Image
                                                    src={previewUrl}
                                                    alt="Company logo preview"
                                                    fill
                                                    className="object-cover rounded-2xl transition-all duration-300 group-hover:opacity-80"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                                                        <IoImageOutline className="text-pink-700 text-2xl" />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                                    <IoImageOutline className="w-8 h-8 text-pink-600" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Upload Logo</p>
                                                <p className="text-xs text-gray-500">Click or drag to upload</p>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="sr-only"
                                        accept="image/png, image/jpeg, image/avif"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                handleFileUpload(file);
                                            }
                                        }}
                                        aria-label="Upload company logo"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Company Information Section */}
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
                                    type="text"
                                    {...register("name")}
                                    disabled
                                    id="name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base group-hover:border-gray-300"
                                    placeholder="Enter company name"
                                />
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-100">
                                        <IoMailOutline className="text-green-600 text-lg" />
                                    </div>
                                    Email
                                </label>
                                <input
                                    disabled
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-base group-hover:border-gray-300"
                                    placeholder="Enter company email"
                                />
                            </div>

                            {/* Phone */}
                            <div className="group">
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-purple-100">
                                        <IoCallOutline className="text-purple-600 text-lg" />
                                    </div>
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    {...register("phone")}
                                    id="phone"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter company phone"
                                />
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
                                    {...register("address")}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-base placeholder:text-gray-400 resize-none group-hover:border-gray-300"
                                    placeholder="Enter company address"
                                />
                            </div>

                            {/* Description */}
                            <div className="group">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-teal-100">
                                        <IoDocumentTextOutline className="text-teal-600 text-lg" />
                                    </div>
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description")}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-base placeholder:text-gray-400 resize-none group-hover:border-gray-300"
                                    placeholder="Enter company description"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10 flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-cyan-100 shadow-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
