'use client';

import { FaRegTrashCan } from "react-icons/fa6"
import { DeleteModal } from "../../DeleteModal"
import { useState } from "react";
import { deleteSupplierById } from "@/actions/supplier/delete-supplier-by-id";
import { errorNotification, successNotification } from "../../notification/notifications";


const DeleteSupplierFunction = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const deleteSupplier = async () => {
        const resp = await deleteSupplierById(id);

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

            <DeleteModal
                isOpen={isModalOpen}
                onConfirm={deleteSupplier}
                onCancel={closeModal}
                message="¿Seguro que desea eliminar este Suplidor?"
            />

        </>
    )
}

export default DeleteSupplierFunction
