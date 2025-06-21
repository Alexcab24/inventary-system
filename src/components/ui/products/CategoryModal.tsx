// 'use client';

import { createCategory } from "@/actions/products/create-category";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi"
import { TbCategoryPlus } from "react-icons/tb"
import { errorNotification, successNotification } from "../notification/notifications";

interface FormInputs {
    name: string;
}

interface Props {
    onClose: () => void;
}

export const CategoryModal = ({ onClose }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmitCategory: SubmitHandler<FormInputs> = async (data) => {
        const { name } = data;
        const resp = await createCategory(name);

        if (resp.ok) {
            successNotification(resp.message || '');
            onClose()
            return;
        } else {
            errorNotification(resp.message || '');
            return;
        }
    };

    return (
        <div>
            <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div onClick={(e) => e.stopPropagation()} className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full animate-slide-in-top overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                                <TbCategoryPlus size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Create Category</h3>
                                <p className="text-sm text-gray-600">Add a new category to organize your products</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitCategory)} className="p-6 space-y-6">
                        <div className="group">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-indigo-100">
                                    <TbCategoryPlus className="text-indigo-600 text-lg" />
                                </div>
                                Category Name
                            </label>
                            <input
                                id="name"
                                {...register("name", { required: "Category name is required" })}
                                type="text"
                                placeholder="Enter category name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-base placeholder:text-gray-400 group-hover:border-gray-300"
                                aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && (
                                <p id="name-error" className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all shadow-lg"
                            >
                                <FiPlus size={16} />
                                Create Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

