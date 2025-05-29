import { MdDashboard } from "react-icons/md";
import { RiShoppingCartLine, RiFileList3Line } from "react-icons/ri";
import { BsBoxSeam, BsClipboardData, BsArrowLeftRight } from "react-icons/bs";
import { HiOutlineTruck } from "react-icons/hi";
import { ROUTES } from "./routes";

export const clientMenuItems = [
    {
        icon: <MdDashboard />,
        title: 'Dashboard',
        path: ROUTES.DASHBOARD,
    },
    {
        icon: <RiShoppingCartLine />,
        title: 'Inventory',
        path: ROUTES.PRODUCTS,
        submenu: [
            {
                icon: <BsBoxSeam />,
                title: 'Products',
                path: ROUTES.PRODUCTS,
            },
            {
                icon: <BsClipboardData />,
                title: 'Categories',
                path: ROUTES.CATEGORIES,
            },
            {
                icon: <BsArrowLeftRight />,
                title: 'Movements',
                path: '/inventory/movements',
            }
        ]
    },
    {
        icon: <HiOutlineTruck />,
        title: 'Suppliers',
        path: ROUTES.SUPPLIER,
    },
    {
        icon: <RiFileList3Line />,
        title: 'Reports',
        path: ROUTES.REPORTS,
    },
];
