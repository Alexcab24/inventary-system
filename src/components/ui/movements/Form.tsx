'use client'

import { newMovements } from "@/actions/movements/new-movement";
import { MovementType } from "@/interfaces/movement.interfaces";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineAddCircle, MdOutlineRemove, MdOutlineSwapHoriz } from "react-icons/md"
import { errorNotification, successNotification } from "../notification/notifications";
import { ROUTES } from "@/router/routes";
import { useRouter } from "next/navigation";

interface FormInputs {
    movementType: MovementType;
    quantity: number;
    description?: string
}

interface Props {
    closeModal: () => void;
    productId: string;
    productStock: number;
}

const Form = ({ closeModal, productId, productStock }: Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const { ...movementData } = data;

            const quantity = Number(movementData.quantity);
            console.log(typeof quantity);

            // Only check stock availability for Outbound movements
            if (movementData.movementType === 'Outbound' && quantity > productStock) {
                setErrorMessage("Not enough stock available for that quantity.")
                return
            } else {
                setErrorMessage("")
            }

            const resp = await newMovements({
                productId,
                movementsType: movementData.movementType,
                quantity,
                description: movementData.description
            })

            if (resp.ok) {
                successNotification(resp.message || '');
                router.push(ROUTES.PRODUCTS);
                closeModal()
            } else {
                errorNotification(resp.message || '');
            }
        } catch (error) {
            errorNotification('An error occurred while creating the movement');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Movimiento
                </label>
                <div className="grid grid-cols-3 gap-4">
                    {/* Inbound */}
                    <label className="group cursor-pointer">
                        <input
                            {...register("movementType", { required: "Movement type is required" })}
                            type="radio"
                            name="movementType"
                            value="Inbound"
                            className="peer sr-only"
                        />
                        <div className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 group-hover:border-green-300">
                            <MdOutlineAddCircle size={20} />
                            <span className="font-medium">Inbound</span>
                        </div>
                    </label>

                    {/* Outbound */}
                    <label className="group cursor-pointer">
                        <input
                            {...register("movementType", { required: "Movement type is required" })}
                            type="radio"
                            name="movementType"
                            value="Outbound"
                            className="peer sr-only"
                        />
                        <div className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 group-hover:border-red-300">
                            <MdOutlineRemove size={20} />
                            <span className="font-medium">Outbound</span>
                        </div>
                    </label>

                    {/* Transfer (disabled) */}
                    <label className="group cursor-not-allowed">
                        <input
                            {...register("movementType", { required: "Movement type is required" })}
                            type="radio"
                            name="movementType"
                            value="Transfer"
                            disabled
                            className="peer sr-only"
                        />
                        <div className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-400 opacity-60">
                            <MdOutlineSwapHoriz size={20} />
                            <span className="font-medium">Transfer</span>
                        </div>
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad
                </label>
                <input
                    {...register("quantity", { required: "Quantity is required" })}
                    type="number"
                    min="1"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errorMessage && (
                    <p className="mt-2 text-sm text-red-600 font-medium">
                        {errorMessage}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                </label>
                <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Describe el motivo del movimiento..."
                />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                    Create movement
                </button>
            </div>
        </form>
    )
}

export default Form
