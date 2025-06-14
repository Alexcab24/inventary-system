import { create } from 'zustand';

interface MovementModalState {
    isOpen: boolean;
    selectedProductId?: string;
    selectedProductName?: string;
    openModal: (productId?: string, productName?: string) => void;
    closeModal: () => void;
}

export const useMovementModalStore = create<MovementModalState>((set) => ({
    isOpen: false,
    selectedProductId: undefined,
    selectedProductName: undefined,
    openModal: (productId, productName) => set({ isOpen: true, selectedProductId: productId, selectedProductName: productName }),
    closeModal: () => set({ isOpen: false, selectedProductId: undefined }),
})); 