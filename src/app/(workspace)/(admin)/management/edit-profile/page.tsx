'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import { IoPersonOutline, IoMailOutline, IoInformationCircleOutline, IoImageOutline, IoLockClosedOutline } from 'react-icons/io5';
import { errorNotification } from "@/components/ui/notification/notifications";

export default function EditProfilePage() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (file: File) => {
        setProfileImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                        <IoInformationCircleOutline className="text-white text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Editar Perfil</h1>
                        <p className="text-gray-600 mt-1">Actualiza tu información personal</p>
                    </div>
                </div>
            </div>

            <form className="p-8">
                <div className="grid grid-cols-1 gap-8">
                    {/* Foto de perfil */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-pink-100">
                                <IoImageOutline className="text-pink-600 text-lg" />
                            </div>
                            Foto de perfil
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
                                    errorNotification('Por favor sube un archivo de imagen');
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
                                            alt="Foto de perfil preview"
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
                                        <p className="text-sm font-medium text-gray-700 mb-1">Subir foto</p>
                                        <p className="text-xs text-gray-500">Haz click o arrastra para subir</p>
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
                                aria-label="Subir foto de perfil"
                            />
                        </div>
              
                    </div>

                    {/* Nombre */}
                    <div className="group">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-100">
                                <IoPersonOutline className="text-blue-600 text-lg" />
                            </div>
                            Nombre completo
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                            placeholder="Ingresa tu nombre completo"
                        />
              
                    </div>

                    {/* Email */}
                    <div className="group">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-green-100">
                                <IoMailOutline className="text-green-600 text-lg" />
                            </div>
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                            placeholder="Ingresa tu correo electrónico"
                        />
              
                    </div>

                    <div className="group">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-orange-100">
                                <IoLockClosedOutline className="text-orange-600 text-lg" />
                            </div>
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                            placeholder="Nueva contraseña (opcional)"
                        />
                
                    </div>
                </div>

       
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                    <button
                        type="button"
                        className="px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:text-gray-900 hover:border-gray-300 transition-all text-base focus:outline-none focus:ring-4 focus:ring-gray-100 shadow-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    >
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    );
}