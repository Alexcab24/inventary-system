'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import { ViewRoute } from './ViewRoute'
import { MdLogout, MdSettings, MdNotifications } from 'react-icons/md';
import { PiBuilding } from "react-icons/pi";
import { TfiSettings } from 'react-icons/tfi';
import { AiOutlineUser } from 'react-icons/ai';
import type { User } from '@/interfaces';
import Link from 'next/link';
import { logout } from '@/actions/auth/logout';
import { useSidebarStore } from '../../../store/sidebarStore';
import { ROUTES } from '@/router/routes';

interface Props {
  user: User
  profilePic: string;
  onHamburgerClick?: () => void;
}

export const TopMenu = ({ user, onHamburgerClick, profilePic }: Props) => {
  const expanded = useSidebarStore((s: any) => s.expanded);
  const toggleSidebar = useSidebarStore((s: any) => s.toggle);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

        <button
          className="lg:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Abrir menú"
          onClick={onHamburgerClick}
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        <button
          className="hidden lg:block mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={expanded ? 'Colapsar menú' : 'Expandir menú'}
          onClick={toggleSidebar}
        >
          {expanded ? (
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          ) : (
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          )}
        </button>

        <div className="flex md:hidden items-center justify-between  py-4 border-b gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">Inventory</span>
            <span className="text-xl font-semibold text-gray-700">System</span>
          </Link>
        </div>
        {/* Breadcrumb */}
        <div className="hidden md:block flex-1">
          <ViewRoute />
        </div>
        {/* Acciones */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Notificaciones"
          >
            <MdNotifications className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <button
            type="button"
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Configuración"
          >
            <MdSettings className="w-5 h-5" />
          </button>
          {/* Perfil y Dropdown */}
          <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
            <button id="hs-dropdown-account" type="button" className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 hover:border-gray-300 text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                <Image
                  src={profilePic || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
                  width={38}
                  height={38}
                  alt="Profile picture"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-64 bg-white shadow-lg rounded-xl mt-2 border border-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
              <div className="py-4 px-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl border-b border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Signed in as</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{user.name} <span className='text-gray-500 font-normal'>- {user.role}</span></p>
              </div>
              <div className="p-2 space-y-1">
                {
                  user.role === 'admin' && (
                    <>
                      <Link href={ROUTES.COMPANY} className="flex items-center gap-x-3.5 py-2.5 px-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:bg-gray-50 transition-colors">
                        <PiBuilding size={20} className="text-gray-500" />
                        Company
                      </Link>
                      <Link href={ROUTES.USERS} className="flex items-center gap-x-3.5 py-2.5 px-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:bg-gray-50 transition-colors">
                        <AiOutlineUser size={20} className="text-gray-500" />
                        Users
                      </Link>
                    </>
                  )
                }
                <Link href={ROUTES.EDIT_PROFILE} className="flex items-center gap-x-3.5 py-2.5 px-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:bg-gray-50 transition-colors">
                  <TfiSettings size={20} className="text-gray-500" />
                  Edit Profile
                </Link>
                <div>
                  <hr className='border-gray-100 my-2' />
                </div>

                <button onClick={() => logout()} className="flex items-center w-full gap-x-3.5 py-2.5 px-3 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:bg-red-50 transition-colors">
                  <MdLogout size={20} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
