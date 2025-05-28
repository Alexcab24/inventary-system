import { ReactNode } from "react";

export interface MenuItem {
    icon: ReactNode;
    title: string;
    path: string;
}

export type MenuItems = MenuItem[];