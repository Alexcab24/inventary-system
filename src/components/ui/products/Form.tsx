'use client';

import { createProduct } from '@/actions/products/create-product';
import { User } from '@/interfaces';
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorNotification, successNotification } from '../notification/notifications';
import { useRouter } from 'next/navigation';
import { Supplier } from '@/interfaces/supplier.interface';
import { Category } from '@/interfaces/category.interfaces';
import { CategoryModal } from './CategoryModal';
import { ROUTES } from '@/router/routes';
import { LoadingOverlay } from '../LoadingOverlay';
import { IoCubeOutline, IoDocumentTextOutline, IoImageOutline, IoInformationCircleOutline, IoLayersOutline, IoPencil, IoPeopleOutline, IoPricetagOutline } from 'react-icons/io5';
import Image from 'next/image';
import { CloudinaryDebug } from '../CloudinaryDebug';

interface FormInputs {
    name: string;
    price: string;
    image: string;
    stock: string;
    categoryId: string;
    supplierId: string;
    description: string;
}

interface Props {
    user?: User;
    suppliers: Supplier[];
    categories: Category[];
}

export const Form = ({ user, suppliers, categories }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const router = useRouter();
    const companyId = user?.companyId;

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormInputs>();

    if (!companyId) return;

    const handleFileUpload = (file: File) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            const { ...productData } = data;

            const parsedStock = parseInt(productData.stock, 10);
            const parsedPrice = parseFloat(productData.price);

            if (isNaN(parsedStock) || isNaN(parsedPrice)) {
                errorNotification('Price and stock must be valid numbers.');
                setIsLoading(false);
                return;
            }

            if (!companyId) {
                setIsLoading(false);
                return;
            }

            formData.append('name', productData.name);
            formData.append('price', parsedPrice.toString());
            formData.append('stock', parsedStock.toString());
            formData.append('supplierId', productData.supplierId);
            formData.append('categoryId', productData.categoryId);
            if (productData.description) formData.append('description', productData.description);
            if (imageFile) formData.append('image', imageFile)

            console.log('Enviando formulario con imagen:', imageFile ? 'Sí' : 'No');

            const resp = await createProduct(formData);

            if (resp.ok) {
                successNotification(resp.message || 'Producto creado exitosamente');
                router.push(ROUTES.PRODUCTS);
                reset();
                setPreviewImage(null);
                setImageFile(null);
            } else {
                console.error('Error en createProduct:', resp.message);
                errorNotification(resp.message || 'Error al crear el producto');
            }
        } catch (error) {
            console.error('Error general en onSubmit:', error);
            errorNotification(error instanceof Error ? error.message : 'An error occurred while creating the product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            {isOpen && <CategoryModal onClose={handleClose} />}
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-blue-50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                            <IoInformationCircleOutline className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
                            <p className="text-gray-600 mt-1">Add a new product to your inventory</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                    {/* Debug Component - Temporal */}
                    <div className="mb-6">
                        <CloudinaryDebug />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Product Name */}
                            <div className="group">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-blue-100">
                                        <IoCubeOutline className="text-blue-600 text-lg" />
                                    </div>
                                    Product Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name", { required: "Product name is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter product name"
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <p id="name-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="group">
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-100">
                                        <IoPricetagOutline className="text-green-600 text-lg" />
                                    </div>
                                    Unit Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-400 text-base font-medium">$</span>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        {...register("price", { required: "Product price is required" })}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                        placeholder="0.00"
                                        aria-describedby={errors.price ? "price-error" : undefined}
                                    />
                                </div>
                                {errors.price && (
                                    <p id="price-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                            {/* Stock */}
                            <div className="group">
                                <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-purple-100">
                                        <IoLayersOutline className="text-purple-600 text-lg" />
                                    </div>
                                    Stock Quantity
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    min="1"
                                    {...register("stock", { required: "Stock quantity is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Enter stock quantity"
                                    aria-describedby={errors.stock ? "stock-error" : undefined}
                                />
                                {errors.stock && (
                                    <p id="stock-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.stock.message}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="group">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-orange-100">
                                        <IoDocumentTextOutline className="text-orange-600 text-lg" />
                                    </div>
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description")}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-base placeholder:text-gray-400 resize-none group-hover:border-gray-300"
                                    placeholder="Product description (optional)"
                                    rows={4}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-pink-100">
                                        <IoImageOutline className="text-pink-600 text-lg" />
                                    </div>
                                    Product Image
                                </label>
                                <div
                                    className="w-full max-w-56 mx-auto bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-lg focus-within:border-blue-500"
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
                                        {previewImage ? (
                                            <>
                                                <Image
                                                    src={previewImage}
                                                    alt="Product preview"
                                                    fill
                                                    className="object-cover rounded-2xl transition-all duration-300 group-hover:opacity-80"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                                                        <IoPencil className="text-blue-700 text-2xl" />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                                    <IoImageOutline className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Upload Image</p>
                                                <p className="text-xs text-gray-500">Click or drag to upload</p>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        id="product-image-input"
                                        type="file"
                                        accept="image/png, image/jpeg, image/avif"
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                handleFileUpload(file);
                                            }
                                        }}
                                        className="sr-only"
                                        aria-label="Upload product image"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="group">
                                <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-indigo-100">
                                        <IoDocumentTextOutline className="text-indigo-600 text-lg" />
                                    </div>
                                    Product Category
                                </label>
                                <div className="flex gap-3">
                                    <select
                                        id="categoryId"
                                        {...register("categoryId", { required: "Selecting a category is required" })}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-base group-hover:border-gray-300"
                                        defaultValue=""
                                        aria-describedby={errors.categoryId ? "category-error" : undefined}
                                    >
                                        <option value="" disabled>Select category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-sm"
                                        onClick={handleOpen}
                                    >
                                        Add
                                    </button>
                                </div>
                                {errors.categoryId && (
                                    <p id="category-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.categoryId.message}
                                    </p>
                                )}
                            </div>

                            {/* Supplier */}
                            <div className="group">
                                <label htmlFor="supplierId" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-teal-100">
                                        <IoPeopleOutline className="text-teal-600 text-lg" />
                                    </div>
                                    Supplier
                                </label>
                                <select
                                    id="supplierId"
                                    {...register("supplierId", { required: "Selecting a supplier is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-base group-hover:border-gray-300"
                                    defaultValue=""
                                    aria-describedby={errors.supplierId ? "supplier-error" : undefined}
                                >
                                    <option value="" disabled>Select supplier</option>
                                    {suppliers.map(supplier => (
                                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                    ))}
                                </select>
                                {errors.supplierId && (
                                    <p id="supplier-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.supplierId.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit & Cancel */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                        <Link
                            href={ROUTES.PRODUCTS}
                            className="px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-100 shadow-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-lg"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
