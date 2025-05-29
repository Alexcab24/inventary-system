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
  onHamburgerClick?: () => void;
}

export const TopMenu = ({ user, onHamburgerClick }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const expanded = useSidebarStore((s: any) => s.expanded);
  const toggleSidebar = useSidebarStore((s: any) => s.toggle);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Botón hamburguesa solo móvil/tablet */}
        <button
          className="lg:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Abrir menú"
          onClick={onHamburgerClick}
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        {/* Botón collapse sidebar solo desktop */}
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
            <button id="hs-dropdown-account" type="button" className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <Image src={'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} width={500}
                height={500}
                alt="Profile picture"
                className='rounded-full'
              />
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 d  after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
              <div className="py-3 px-5 bg-gray-100 rounded-t-lg ">
                <p className="text-sm text-gray-500 ">Signed in as</p>
                <p className="text-sm font-medium text-gray-800 ">{user.name} <span className='text-gray-400 font-normal'>- {user.role}</span></p>
              </div>
              <div className="p-1.5 space-y-0.5">
                {
                  user.role === 'admin' && (
                    <>
                      <Link href={ROUTES.COMPANY} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ">
                        <PiBuilding size={20} />
                        Company
                      </Link>
                      <Link href={ROUTES.USERS} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ">
                        <AiOutlineUser size={20} />
                        Users
                      </Link>
                    </>

                  )

                }
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 " href={ROUTES.PROFILE}>
                  <TfiSettings size={20} />
                  Edit Profile
                </a>
                <div>
                  <hr className='border border-gray-100  mx-2 my-3' />
                </div>

                <button onClick={() => logout()} className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
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
