import { AiFillProduct } from "react-icons/ai";
import { FaReceipt, FaTruck } from "react-icons/fa6";
import { IoAppsSharp } from "react-icons/io5";



export const clientMenuItems = [
    {
        icon: <IoAppsSharp />,
        title: 'Dashboard',
        path: '/dashboard',
    },
    {
        icon: <AiFillProduct />,
        title: 'Inventory',
        path: '/inventory',
    },
    {
        icon: <FaTruck />,
        title: 'Suppliers',
        path: '/suppliers',
    },
    {
        icon: <FaReceipt />,
        title: 'Reports',
        path: '/reports',
    },
];
