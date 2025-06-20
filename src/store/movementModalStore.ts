import { create } from 'zustand';

interface MovementModalState {
    isOpen: boolean;
    selectedProductId?: string;
    selectedProductName?: string;
    selectedProductStock?: number;
    openModal: (productId?: string, productName?: string, stock?: number) => void;
    closeModal: () => void;
}

export const useMovementModalStore = create<MovementModalState>((set) => ({
    isOpen: false,
    selectedProductId: undefined,
    selectedProductName: undefined,
    selectedProductStock: undefined,
    openModal: (productId, productName, stock) => set({
        isOpen: true,
        selectedProductId: productId,
        selectedProductName: productName,
        selectedProductStock: stock
    }),
    closeModal: () => set({
        isOpen: false,
        selectedProductId: undefined,
        selectedProductName: undefined,
        selectedProductStock: undefined
    }),
})); 