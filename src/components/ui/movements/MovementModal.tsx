'use client';

import { MdOutlineRemoveCircle, MdOutlineSwapHoriz } from 'react-icons/md';
import { useMovementModalStore } from '@/store/movementModalStore';

export const MovementModal = () => {
    const { isOpen, closeModal, selectedProductName } = useMovementModalStore();

    if (!isOpen) return null;

    return (
        <div>
            <div onClick={closeModal} className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div onClick={(e) => e.stopPropagation()} className="bg-white border border-gray-200 p-6 rounded-xl shadow-xl max-w-md w-full animate-slide-in-top">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <MdOutlineRemoveCircle size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Nuevo Movimiento</h3>
                            <p className="text-sm text-gray-500">Registra un nuevo movimiento de inventario</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Producto
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                                <span className="font-semibold text-gray-800 text-base">
                                    {selectedProductName}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Movimiento
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-blue-500 bg-blue-50 text-blue-700 transition-all hover:bg-blue-100"
                                >
                                    <MdOutlineRemoveCircle size={20} />
                                    <span className="font-medium">Salida</span>
                                </button>
                                <button
                                    type="button"
                                    disabled
                                    className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                >
                                    <MdOutlineSwapHoriz size={20} />
                                    <span className="font-medium">Transferencia</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                min="1"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción
                            </label>
                            <textarea
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
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                Crear Movimiento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 