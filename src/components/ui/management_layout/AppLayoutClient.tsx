"use client";
import React, { useState } from "react";

import { TopMenu } from "../main_layout/TopMenu";
import type { User } from '@/interfaces';
import { useSidebarStore } from "@/store/sidebarStore";
import { SideBar } from "../main_layout/SideBar";
import { adminMenuItems } from "@/router/admin.routes";

interface Props {
    user: User;
    children: React.ReactNode;
}

const AppLayoutClient = ({ user, children }: Props) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const expanded = useSidebarStore((s) => s.expanded);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <SideBar
                menuItems={adminMenuItems}
                expanded={expanded}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            {/* Main Content Area */}
            <div className={`transition-all duration-300 ${expanded ? 'lg:pl-72' : 'lg:pl-20'} pl-0`}>
                <TopMenu user={user} onHamburgerClick={() => setMobileOpen(true)} />
                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayoutClient; 