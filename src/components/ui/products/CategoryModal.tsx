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
                <div onClick={(e) => e.stopPropagation()} className="bg-white border border-gray-200 p-6 rounded-xl shadow-xl max-w-md w-full animate-slide-in-top">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <TbCategoryPlus size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Create Category</h3>
                            <p className="text-sm text-gray-500">Add a new category to organize your products</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitCategory)} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Category Name
                            </label>
                            <input
                                id="name"
                                {...register("name", { required: "Category name is required" })}
                                type="text"
                                placeholder="Enter category name"
                                className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                <FiPlus size={18} />
                                Create Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

