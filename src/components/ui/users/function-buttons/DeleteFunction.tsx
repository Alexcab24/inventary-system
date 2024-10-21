'use client'

import { DeleteUserById } from "@/actions/users/delete-user-by-id"
import { errorNotification, successNotification } from "../../notification/notifications"
import { useState } from "react"
import { ConfirmModal } from "../../ConfirmModal"
import { FaRegTrashCan } from "react-icons/fa6"


export const DeleteFunction = ({ id }: { id: string }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const deleteUser = async () => {
        const resp = await DeleteUserById(id);

        if (resp.ok) {
            successNotification(resp.message);
            return;
        } else {
            errorNotification(resp.message);
            return;
        }
    }


    
    return (

        <>
            <button
                onClick={openModal}
                className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline focus:outline-none focus:underline bg-red-500 border border-gray-200 p-2 rounded-md hover:bg-red-600 text-gray-800"
            >
                <FaRegTrashCan className="text-white" size={22} />
            </button>

            <ConfirmModal
                isOpen={isModalOpen}
                onConfirm={deleteUser} // Pasamos la función de eliminación al modal
                onCancel={closeModal} // Cerramos el modal si se cancela
                message="¿Seguro que desea eliminar este usuario?"
            />

        </>

    )
}
