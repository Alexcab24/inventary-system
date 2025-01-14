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


        // server action
        const resp = await createCategory(name);

        if (resp.ok) {
            successNotification(resp.message || '');
            onClose()
            return;
        } else {
            // setErrorMessage(resp.message);
            errorNotification(resp.message || '');
            return;
        }


    };


    return (
        <div>
            <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
                <div onClick={(e) => e.stopPropagation()} className="bg-white border border-gray-300 p-8 rounded-xl shadow-2xl max-w-md w-full animate-slide-in-top">
                    <div className="flex flex-row gap-x-2 items-center mb-6">

                        <TbCategoryPlus size={25} />

                        <p className="text-lg text-gray-700">Crear una nueva categoría</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitCategory)} className="flex justify-end gap-4">
                        <input
                            id="name"
                            {...register("name", { required: "El nombre de la categoría es obligatorio" })}
                            type="text"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-md shadow-lg transition duration-150 transform  hover:shadow-md focus:outline-none focus:ring-2"
                        >
                            <FiPlus size={25} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

