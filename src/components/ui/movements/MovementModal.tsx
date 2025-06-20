'use client';

import { MdOutlineRemoveCircle, MdOutlineSwapHoriz } from 'react-icons/md';
import { useMovementModalStore } from '@/store/movementModalStore';
import Form from './Form';
import { cn } from '@/lib/utils';

export const MovementModal = () => {

    const {
        isOpen,
        closeModal,
        selectedProductName = '',
        selectedProductStock = 0,
        selectedProductId = ''
    } = useMovementModalStore();

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
                                Stock Disponible
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                <span className={cn(
                                    "inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-sm font-medium",
                                    selectedProductStock > 10 ? "bg-green-50 text-green-700" :
                                        selectedProductStock > 0 ? "bg-amber-50 text-amber-700" :
                                            "bg-red-50 text-red-700"
                                )}>
                                    {selectedProductStock} unidades
                                </span>
                            </div>
                        </div>

                        <Form
                            closeModal={closeModal}
                            productStock={selectedProductStock}
                            productId={selectedProductId}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}; 