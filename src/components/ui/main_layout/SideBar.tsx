'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSidebarStore } from '../../../store/sidebarStore';
import { MenuItems } from '@/types';
import { IoChevronDown, IoMenuOutline } from 'react-icons/io5';
import { getCompanytById } from '@/actions/company/get-company-by-id';

import { LoadingOverlay } from '../LoadingOverlay';
import { getWorkspace } from '@/utils/getWorkspace';

interface SideBarProps {
    expanded: boolean;
    mobileOpen?: boolean;
    setMobileOpen?: (v: boolean) => void;
    menuItems: MenuItems,
}

export const SideBar = ({ expanded, mobileOpen = false, setMobileOpen, menuItems }: SideBarProps) => {
    const pathname = usePathname();
    const toggleSidebar = useSidebarStore((s) => s.toggle);
    const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [companyData, setCompanyData] = useState<{ name: string; logotype: string | null }>({
        name: 'Inventory System',
        logotype: null
    });

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setIsLoading(true);
                const workspace = await getWorkspace();
                const company = await getCompanytById(workspace);
                if (company) {
                    setCompanyData({
                        name: company.name,
                        logotype: company.logotype ?? null
                    });
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyData();
    }, []);

    const toggleSubmenu = (path: string) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    const renderMenuItem = (item: any, isSubmenu = false) => {
        const isActive = pathname.startsWith(item.path);
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isSubmenuOpen = openSubmenus[item.path];
        const isHovered = hoveredItem === item.path;

        return (
            <li key={item.path} className="relative group">
                <div className="flex flex-col">
                    <div
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer
                        ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}
                        ${expanded ? 'justify-between' : 'justify-center px-0'}
                        ${isSubmenu ? 'ml-2' : ''}
                        hover:scale-[1.02] active:scale-[0.98]`}
                        onClick={() => hasSubmenu && toggleSubmenu(item.path)}
                        onMouseEnter={() => setHoveredItem(item.path)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {!hasSubmenu ? (
                            <Link href={item.path} className="flex items-center gap-3 w-full">
                                <span className={`text-xl transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {item.icon}
                                </span>
                                {expanded && (
                                    <span className="text-base font-medium">{item.title}</span>
                                )}
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3 w-full">
                                <span className={`text-xl transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {item.icon}
                                </span>
                                {expanded && (
                                    <span className="text-base font-medium">{item.title}</span>
                                )}
                            </div>
                        )}

                        {hasSubmenu && expanded && (
                            <div className={`transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`}>
                                <IoChevronDown className="text-gray-500" />
                            </div>
                        )}
                    </div>

                    {hasSubmenu && expanded && (
                        <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isSubmenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <ul className="ml-6 mt-1 space-y-1">
                                {item.submenu.map((subItem: any) => renderMenuItem(subItem, true))}
                            </ul>
                        </div>
                    )}
                </div>

                {!expanded && (
                    <div
                        className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm pointer-events-none whitespace-nowrap shadow-lg z-50 transition-all duration-200
                        ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                    >
                        {item.title}
                    </div>
                )}
            </li>
        );
    };

    // Overlay para móvil
    const mobileSidebar = (
        <>
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
                    onClick={() => setMobileOpen && setMobileOpen(false)}
                />
            )}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col w-72 h-screen lg:hidden transition-transform duration-200 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xl font-bold text-white">IS</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-blue-600">Inventory</span>
                            <span className="text-sm font-medium text-gray-500">System</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setMobileOpen && setMobileOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <IoMenuOutline className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <nav className="flex-1 py-4">
                    <ul className="flex flex-col gap-1 px-3">
                        {menuItems.map((item) => renderMenuItem(item))}
                    </ul>
                </nav>
                <div className="mt-auto border-t p-4">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-lg font-bold text-white">IS</span>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800">Inventory System</div>
                            <div className="text-xs text-gray-500">v1.0.0</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );

    // Sidebar desktop/colapsable
    const desktopSidebar = (
        <>
            <aside
                className={`hidden lg:flex fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex-col h-screen transition-all duration-300 ease-in-out ${expanded ? 'w-72' : 'w-20'}`}
            >
                <div className={`flex items-center ${expanded ? 'justify-between px-6' : 'justify-center'} h-16 border-b`}>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        {expanded ? (
                            <>
                                {/* Logotype */}
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                    {companyData.logotype && companyData.logotype !== "NULL" ? (
                                        <Image
                                            src={companyData.logotype}
                                            alt={companyData.name}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-xl font-bold text-white">IS</span>
                                    )}
                                </div>

                                {/* companyName */}
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-blue-600">{companyData.name}</span>
                                </div>
                            </>
                        ) : (
                            // Logotype
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                {companyData.logotype ? (
                                    <Image
                                        src={companyData.logotype}
                                        alt={companyData.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <span className="text-xl font-bold text-white">IS</span>
                                )}
                            </div>
                        )}
                    </Link>
                </div>
                <nav className="flex-1 py-4">
                    <ul className="flex flex-col gap-1 px-3">
                        {menuItems.map((item) => renderMenuItem(item))}
                    </ul>
                </nav>
                <div className={`mt-auto border-t p-4 ${expanded ? '' : 'flex justify-center'}`}>
                    <div
                        className={`flex items-center gap-3 p-1 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm transition-all duration-300
                        ${expanded ? 'w-full' : 'w-12 h-12 justify-center'}`}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-lg font-bold text-white">IS</span>
                        </div>
                        {expanded && (
                            <div className="overflow-hidden">
                                <div className="font-semibold text-gray-800 whitespace-nowrap">Inventory System</div>
                                <div className="text-xs text-gray-500 whitespace-nowrap">v1.0.0</div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Barra de navegación cuando el sidebar está colapsado */}
            {!expanded && (
                <div className="hidden lg:block fixed top-0 left-20 right-0 h-16 bg-white border-b border-gray-200 z-30">
                    <div className="flex items-center justify-between h-full px-6">
                        <div className="flex items-center gap-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200
                                    ${pathname.startsWith(item.path) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <div className="lg:hidden">
                {mobileSidebar}
            </div>
            {desktopSidebar}
        </>
    );
};


// let person = {
//     name: "Gabriel",
//     secondName: "Antonio",
//     lastName: "Paulino Ruiz",
//     fullName: function(){
//         console.log(this.name + " " + this.secondName + " " + this.lastName)
//     },
//     direction: {
//         city: "Dom. Rep",
//         takeCity: function(){
//             let self = this

//             let nuevaDireccion = function(){
//                 console.log(self)
//                 console.log("La direccion es: " + self.city)
//             }

//             nuevaDireccion();
//         }
//     }
// }