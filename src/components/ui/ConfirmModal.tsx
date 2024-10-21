



type Props = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
};

export const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }: Props) => {

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
                <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-2xl max-w-md w-full animate-slide-in-top">
                    <p className="text-lg text-gray-700 mb-6">{message}</p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onCancel}
                            className="bg-gray-200 text-gray-600 px-5 py-2 rounded-md transition duration-300 hover:bg-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow-lg transition duration-150 transform  hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}
