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

            console.log(formData)


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
            //optionals
            if (productData.description) formData.append('description', productData.description);
            console.log(productData.image)
            if (imageFile) formData.append('image', imageFile)


            const resp = await createProduct(formData);

            if (resp.ok) {
                successNotification(resp.message || '');
                router.push(ROUTES.PRODUCTS);
                reset();
                setPreviewImage(null);
            } else {
                errorNotification(resp.message || '');
            }
        } catch (error) {
            errorNotification('An error occurred while creating the product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            {isOpen && <CategoryModal onClose={handleClose} />}
            <div className="w-full max-w-5xl animate-fade-in bg-white rounded-[2rem] border border-gray-200 overflow-hidden transition-all duration-300 mx-auto">
                {/* Header: sticky solo en mobile */}
                <div className="sticky md:static top-0 z-10 bg-white backdrop-blur-md px-8 pt-8 pb-4 border-b border-gray-200 flex flex-col gap-1">
                    <div className="flex items-center gap-3 mb-1">
                        <IoInformationCircleOutline className="text-blue-600 text-3xl" />
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Add Product</h2>
                    </div>
                    <p className="text-gray-500 text-base">Add a new product to your inventory</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 md:px-14 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left column: Inputs */}
                        <div className="space-y-8">
                            {/* Name */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoCubeOutline className="text-gray-400 text-xl" />
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Product name is required" })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                    placeholder="Descriptive product name"
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                            </div>
                            {/* Price */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoPricetagOutline className="text-gray-400 text-xl" />
                                    Unit Price
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("price", { required: "Product price is required" })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                    placeholder="Product price"
                                />
                                {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
                            </div>
                            {/* Stock */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoLayersOutline className="text-gray-400 text-xl" />
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    {...register("stock", { required: "Stock quantity is required" })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                    placeholder="Available stock quantity"
                                />
                                {errors.stock && <p className="text-sm text-red-500 mt-1">{errors.stock.message}</p>}
                            </div>
                            {/* Description */}
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoDocumentTextOutline className="text-gray-400 text-xl" />
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50 resize-none"
                                    placeholder="Detailed product description"
                                    rows={4}
                                />
                            </div>
                        </div>
                        {/* Right column: Image and selects */}
                        <div className="space-y-8 flex flex-col items-center justify-between">
                            {/* Image Upload */}
                            <div className="flex flex-col items-center gap-3 w-full">
                                <label className="block text-base font-semibold text-gray-700 mb-1">Product Image</label>
                                <div
                                    className="w-48 h-48 bg-white border-4 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-blue-400 focus-within:border-blue-500"
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
                                    {previewImage ? (
                                        <>
                                            <Image
                                                src={previewImage}
                                                alt="Product preview"
                                                fill
                                                className="object-cover rounded-2xl transition-all duration-300 group-hover:opacity-80"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <IoPencil className="text-blue-700 text-3xl" />
                                            </div>
                                        </>
                                    ) : (
                                        <IoImageOutline className="w-16 h-16 text-gray-300 group-hover:text-blue-500 transition-all duration-300" />
                                    )}
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
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer hidden"
                                    />
                                </div>
                                <span className="text-xs text-gray-400">Click or drag to upload</span>
                            </div>
                            {/* Category */}
                            <div className="w-full">
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoDocumentTextOutline className="text-gray-400 text-xl" />
                                    Product Category
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        {...register("categoryId", { required: "Selecting a category is required" })}
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300"
                                        onClick={handleOpen}
                                    >
                                        Add
                                    </button>
                                </div>
                                {errors.categoryId && <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>}
                            </div>
                            {/* Supplier */}
                            <div className="w-full">
                                <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <IoPeopleOutline className="text-gray-400 text-xl" />
                                    Supplier
                                </label>
                                <select
                                    {...register("supplierId", { required: "Selecting a supplier is required" })}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg placeholder:text-gray-400 focus:bg-blue-50"
                                >
                                    <option value="" disabled>Select supplier</option>
                                    {suppliers.map(supplier => (
                                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                    ))}
                                </select>
                                {errors.supplierId && <p className="text-sm text-red-500 mt-1">{errors.supplierId.message}</p>}
                            </div>
                        </div>
                    </div>
                    {/* Submit & Cancel */}
                    <div className="pt-10 flex flex-col md:flex-row gap-4 justify-end">
                        <button
                            type="submit"
                            className="w-full md:w-auto py-3 px-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all"
                        >
                            Add Product
                        </button>
                        <Link href={ROUTES.PRODUCTS} className="w-full md:w-auto text-center py-3 px-10 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all">
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
    );
};
