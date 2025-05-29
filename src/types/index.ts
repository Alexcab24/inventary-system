import { ReactNode } from "react";

export interface MenuItem {
    icon: ReactNode;
    title: string;
    path: string;
    submenu?: MenuItem[];
}

export type MenuItems = MenuItem[];