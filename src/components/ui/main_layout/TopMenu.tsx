'use client';

import Image from 'next/image'
import React from 'react'
import { ViewRoute } from './ViewRoute'
import { IoExitOutline, IoSettingsOutline } from 'react-icons/io5'

import { PiBuilding } from "react-icons/pi";
import { TfiSettings } from 'react-icons/tfi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import type { User } from '@/interfaces';
import Link from 'next/link';
import { logout } from '@/actions/auth/logout';



interface Props {
  user: User
}

export const TopMenu = ({ user }: Props) => {


  return (
    <>
      <header className="absolute top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            
            <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Preline">
                            <span>InventarySystem</span>
                        </a>

          </div>
     

          <div className="w-full flex items-center justify-end ms-auto lg:justify-between gap-x-1 md:gap-x-3">

            <div className="hidden lg:block">
              <ViewRoute />
            </div>

            <div className="flex flex-row items-center justify-end gap-1">


              <button type="button" className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                <span className="sr-only">Notifications</span>
              </button>

              <button type="button" className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ">
                <IoSettingsOutline size={20} />
                <span className="sr-only">Activity</span>
              </button>

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
                    <p className="text-sm text-gray-500 ">Iniciado como</p>
                    <p className="text-sm font-medium text-gray-800 ">{user.name} <span className='text-gray-400 font-normal'>- {user.role}</span></p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    {
                      user.role === 'admin' && (
                        <>
                          <Link href={'/management/company'} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ">
                            <PiBuilding size={20} />
                            Empresa
                          </Link>
                          <Link href={'/management/users'} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ">
                            <AiOutlineUser size={20} />
                            Usuarios
                          </Link>
                        </>

                      )

                    }
                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 " href="#">
                      <TfiSettings size={20} />
                      Editar perfíl
                    </a>
                    <div>
                      <hr className='border border-gray-100  mx-2 my-3' />
                    </div>

                    <button onClick={() => logout()} className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                      <IoExitOutline size={20} />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </header>
    </>

  )
}
