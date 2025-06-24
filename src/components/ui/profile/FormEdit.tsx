'use client';

import { ROUTES } from "@/router/routes";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoImageOutline, IoLockClosedOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { errorNotification, successNotification } from "../notification/notifications";
import Image from "next/image";
import { UserProfile } from "@/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UpdateProfile } from "@/actions/profile/update-profile-image-password";
import { LoadingOverlay } from "../LoadingOverlay";

interface FormInputs {
    name: string;
    email: string;
    password: string;
}

interface Props {
    userProfile: UserProfile;
}

const FormEdit = ({ userProfile }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(userProfile.image || null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileUpload = (file: File) => {
        setProfileImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            name: userProfile.name,
            email: userProfile.email,
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);

            // Solo enviar contraseña si no está vacía
            if (data.password.trim() !== '') {
                formData.append('password', data.password);
            }

            // Solo enviar imagen si se seleccionó una nueva
            if (profileImageFile) {
                formData.append('image', profileImageFile);
            }

            const resp = await UpdateProfile(formData);

            if (resp.ok) {
                successNotification(resp.message);
                router.push(ROUTES.DASHBOARD);
            } else {
                errorNotification(resp.message);
            }
        } catch (error) {
            errorNotification('An error occurred while updating the profile');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <div className="grid grid-cols-1 gap-8">
                    {/* Foto de perfil - Opcional */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-pink-100">
                                <IoImageOutline className="text-pink-600 text-lg" />
                            </div>
                            Profile photo (optional)
                        </label>
                        <div
                            className="w-full max-w-48 mx-auto bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-pink-400 hover:shadow-lg focus-within:border-pink-500"
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
                            <div className="aspect-square w-full flex items-center justify-center p-6">
                                {previewUrl ? (
                                    <>
                                        <Image
                                            src={previewUrl}
                                            alt="Profile photo preview"
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
                                        <p className="text-sm font-medium text-gray-700 mb-1">Upload photo</p>
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
                                aria-label="Upload profile photo"
                            />
                        </div>
                    </div>

                    {/* Nombre */}
                    <div className="group">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-100">
                                <IoPersonOutline className="text-blue-600 text-lg" />
                            </div>
                            Full name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: "Name is required" })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                            placeholder="Enter your full name"
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
                            Email
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
                            placeholder="Enter your email"
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                            <p id="email-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Contraseña - Opcional */}
                    <div className="group">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-orange-100">
                                <IoLockClosedOutline className="text-orange-600 text-lg" />
                            </div>
                            Password (optional)
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', {
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                            placeholder="Leave empty to keep current password"
                            aria-describedby={errors.password ? "password-error" : undefined}
                        />
                        {errors.password && (
                            <p id="password-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Botones */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                    <Link
                        href={ROUTES.DASHBOARD}
                        className="px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:text-gray-900 hover:border-gray-300 transition-all text-base focus:outline-none focus:ring-4 focus:ring-gray-100 shadow-sm"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormEdit
