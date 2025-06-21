'use client';

import { ProductWithRelations, User } from "@/interfaces";
import { Category } from "@/interfaces/category.interfaces";
import { Supplier } from "@/interfaces/supplier.interface";
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { CategoryModal } from "../CategoryModal";
import { updateProdut } from "@/actions/products/update-product";
import { errorNotification, successNotification } from "../../notification/notifications";
import { useRouter } from "next/navigation";
import { IoPricetagOutline, IoCubeOutline, IoLayersOutline, IoPeopleOutline, IoDocumentTextOutline, IoImageOutline, IoInformationCircleOutline, IoPencil, IoAddCircleOutline } from 'react-icons/io5';
import Image from 'next/image';
import { LoadingOverlay } from '../../LoadingOverlay';
import { ROUTES } from "@/router/routes";

interface Props {
    userSession?: User;
    productById: ProductWithRelations;
    categories: Category[];
    suppliers: Supplier[];
}

interface FormInputs {
    name: string;
    price: string;
    image: string;
    stock: string;
    categoryId: string;
    supplierId: string;
    description: string;
}

export const FormEdit = ({ userSession, productById, categories, suppliers }: Props) => {
    const { id } = productById;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log(productById.image)
    const [previewImage, setPreviewImage] = useState<string | null>(productById.image);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const router = useRouter();
    const companyId = userSession?.companyId;

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>({
        defaultValues: {
            ...productById,
            price: productById.price.toString(),
            stock: productById.stock.toString(),
            description: productById.description ?? '',
            image: productById.image || ''
        }
    });


    const handleFileUpload = (file: File) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setIsLoading(true);
        const { name, price, stock, categoryId, supplierId, description, image } = data;
        const parsedStock = parseInt(stock, 10);
        const parsedPrice = parseFloat(price);
        if (!companyId) {
            setIsLoading(false);
            return;
        }
        const resp = await updateProdut(id, name, parsedPrice, parsedStock, supplierId, categoryId, description, companyId);
        if (resp.ok) {
            successNotification(resp.message);
            router.push(ROUTES.PRODUCTS);
        } else {
            errorNotification(resp.message);
        }
        setIsLoading(false);
    }

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            {isOpen && <CategoryModal onClose={handleClose} />}
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 via-white to-amber-50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm">
                            <IoInformationCircleOutline className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                            <p className="text-gray-600 mt-1">Update your product details and inventory information</p>
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
                                        <IoCubeOutline className="text-blue-600 text-lg" />
                                    </div>
                                    Product Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name", { required: "Product name is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Descriptive product name"
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
                                    min={1}
                                    {...register("stock", { required: "Stock quantity is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                    placeholder="Available stock quantity"
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
                                    placeholder="Detailed product description"
                                    rows={4}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Image Upload */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-pink-100">
                                        <IoImageOutline className="text-pink-600 text-lg" />
                                    </div>
                                    Product Image
                                </label>
                                <div
                                    className="w-full bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-pink-400 hover:shadow-lg focus-within:border-pink-500"
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
                                        {previewImage ? (
                                            <>
                                                <Image
                                                    src={previewImage}
                                                    alt="Product preview"
                                                    fill
                                                    className="object-cover rounded-2xl transition-all duration-300 group-hover:opacity-80"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                                                        <IoPencil className="text-pink-700 text-2xl" />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                                    <IoImageOutline className="w-8 h-8 text-pink-600" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Upload Image</p>
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
                                        aria-label="Upload product image"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="group">
                                <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-teal-100">
                                        <IoDocumentTextOutline className="text-teal-600 text-lg" />
                                    </div>
                                    Product Category
                                </label>
                                <div className="flex gap-3">
                                    <select
                                        id="categoryId"
                                        {...register("categoryId", { required: "Selecting a category is required" })}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-base group-hover:border-gray-300"
                                        defaultValue={productById.category.id || ''}
                                        aria-describedby={errors.categoryId ? "category-error" : undefined}
                                    >
                                        <option value="" disabled>Select category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium hover:from-teal-600 hover:to-teal-700 transition-all focus:outline-none focus:ring-4 focus:ring-teal-100 shadow-sm flex items-center gap-2"
                                        onClick={handleOpen}
                                    >
                                        <IoAddCircleOutline className="text-lg" />
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
                                    <div className="p-1.5 rounded-lg bg-indigo-100">
                                        <IoPeopleOutline className="text-indigo-600 text-lg" />
                                    </div>
                                    Supplier
                                </label>
                                <select
                                    id="supplierId"
                                    {...register("supplierId", { required: "Selecting a supplier is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-base group-hover:border-gray-300"
                                    defaultValue={productById.supplier.id || ''}
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

                    {/* Submit & Cancel Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                        <Link
                            href={ROUTES.PRODUCTS}
                            className="px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:text-gray-900 hover:border-gray-300 transition-all text-base focus:outline-none focus:ring-4 focus:ring-gray-100 shadow-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:from-amber-600 hover:to-amber-700 transition-all text-base focus:outline-none focus:ring-4 focus:ring-amber-100 shadow-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}


