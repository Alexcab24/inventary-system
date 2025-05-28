'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSidebarStore } from '../../../store/sidebarStore';
import { MenuItems } from '@/types';


interface SideBarProps {
    expanded: boolean;
    mobileOpen?: boolean;
    setMobileOpen?: (v: boolean) => void;
    menuItems: MenuItems
}

export const SideBar = ({ expanded, mobileOpen = false, setMobileOpen, menuItems }: SideBarProps) => {
    const pathname = usePathname();
    const toggleSidebar = useSidebarStore((s) => s.toggle);

    // Overlay para móvil
    const mobileSidebar = (
        <>
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setMobileOpen && setMobileOpen(false)} />
            )}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out w-72 h-screen
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:w-72 lg:static lg:z-40`}
            >
                {/* Logo y botón de colapso/cerrar */}
                <div className="flex items-center justify-between px-6 py-4 border-b gap-2">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">Inventory</span>
                        <span className="text-xl font-semibold text-gray-700">System</span>
                    </Link>
                </div>
                {/* Navegación */}
                <nav className="flex-1 py-4 flex flex-col gap-1">
                    <ul className="flex flex-col gap-1">
                        {menuItems.map((item) => {
                            const isActive = pathname.startsWith(item.path);
                            return (
                                <li key={item.path} className="relative group">
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                                            ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}
                                            justify-start`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-base font-medium transition-all duration-200">{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                {/* Footer */}
                <div className="mt-auto border-t px-4 py-4 flex items-center gap-3">
                    <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">IS</span>
                    <div>
                        <div className="font-semibold text-gray-800">Inventory System</div>
                        <div className="text-xs text-gray-400">v1.0.0</div>
                    </div>
                </div>
            </aside>
        </>
    );

    // Sidebar desktop/colapsable
    const desktopSidebar = (
        <aside
            className={`hidden lg:flex fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex-col transition-all duration-300 ease-in-out ${expanded ? 'w-72' : 'w-20'} h-screen`}
        >
            {/* Logo y botón de colapso */}
            <div className={`flex items-center ${expanded ? 'justify-between px-6' : 'justify-center px-0'} h-16  gap-2`}>
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className={`text-xl font-bold text-blue-600 transition-all ${expanded ? 'block' : 'hidden'}`}>Inventory</span>
                    <span className={`text-xl font-semibold text-gray-700 transition-all ${expanded ? 'block' : 'hidden'}`}>System</span>
                    <span className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg ${expanded ? 'hidden' : 'block'}`}>IS</span>
                </Link>
            </div>
            {/* Navegación */}
            <nav className="flex-1 py-4 flex flex-col gap-1">
                <ul className="flex flex-col gap-1 px-2">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.path);
                        return (
                            <li key={item.path} className="relative group">
                                <Link
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                                        ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}
                                        ${expanded ? 'justify-start' : 'justify-center px-0'}`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className={`text-base font-medium transition-all duration-200 ${expanded ? 'block' : 'hidden'}`}>{item.title}</span>
                                </Link>
                                {/* Tooltip */}
                                {!expanded && (
                                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-lg transition-opacity duration-200">
                                        {item.title}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* Footer */}
            <div className={`mt-auto border-t px-4 py-4 flex items-center gap-3 ${expanded ? '' : 'justify-center px-0'}`}>
                <span className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg`}>IS</span>
                {expanded && (
                    <div>
                        <div className="font-semibold text-gray-800">Inventory System</div>
                        <div className="text-xs text-gray-400">v1.0.0</div>
                    </div>
                )}
            </div>
        </aside>
    );

    return (
        <>
            {/* Drawer móvil/tablet */}
            <div className="lg:hidden">
                {mobileSidebar}
            </div>
            {/* Sidebar desktop */}
            {desktopSidebar}
        </>
    );
};
