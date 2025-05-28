import { create } from 'zustand';

interface SidebarState {
    expanded: boolean;
    setExpanded: (v: boolean) => void;
    toggle: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    expanded: true,
    setExpanded: (v) => set({ expanded: v }),
    toggle: () => set((state) => ({ expanded: !state.expanded })),
})); 