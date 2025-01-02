import React from 'react'
import { FaBoxOpen, FaReceipt, FaTruck, FaUsers } from 'react-icons/fa'
import { SideBarItems } from './SideBarItems'
import { ViewRoute } from './ViewRoute'
import { IoAppsSharp } from 'react-icons/io5'
import { AiFillProduct } from 'react-icons/ai'





const menuItems = [
    {
        icon: <IoAppsSharp />,
        title: 'Dashboard',
        path: '/dashboard'

    },
    {
        icon: <AiFillProduct />,
        title: 'Inventario',
        path: '/dashboard/inventory'

    },
    {
        icon: <FaTruck />,
        title: 'Proveedores',
        path: '/dashboard/proveedores'

    },
    {
        icon: <FaReceipt />,
        title: 'Reportes',
        path: '/dashboard/reports'

    },
]





export const SideBar = () => {
    return (
        <>


            <div className="absolute top-14 inset-x-0  bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
                <div className="flex items-center py-2">

                    <button type="button" className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
                        <span className="sr-only">Toggle Navigation</span>
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m8 9 3 3-3 3" /></svg>
                    </button>

                    <ViewRoute />

                </div>
            </div>

            <div id="hs-application-sidebar" className="hs-overlay  [--auto-close:lg]
                hs-overlay-open:translate-x-0
                -translate-x-full transition-all duration-300 transform
                w-[260px] h-full
                hidden
                fixed inset-y-0 start-0 z-50
                 bg-white border-e border-gray-200
                lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
                " role="dialog" aria-label="Sidebar">
                <div className="relative flex flex-col h-full max-h-full">
                    <div className="px-6 pt-4">

                        <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Preline">
                            <span>InventarySystem</span>
                        </a>

                    </div>


                    <div className="h-full mt-16 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <nav className="hs-accordion-group p-2 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                            <ul className="flex flex-col gap-y-1.5 space-y-0 mx-2">
                                {
                                    menuItems.map(item => (
                                        <SideBarItems key={item.path} {...item} />
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>

            <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">

            </div>



        </>
    )
}
