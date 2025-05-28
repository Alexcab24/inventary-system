import { AiOutlineUser } from "react-icons/ai";
import { IoAppsSharp } from "react-icons/io5";
import { PiBuilding } from "react-icons/pi";
import { TfiSettings } from "react-icons/tfi";





export const adminMenuItems = [
    {
        icon: <IoAppsSharp />,
        title: 'Dashboard',
        path: '/dashboard',
    },
    {
        icon: <PiBuilding />,
        title: 'Company',
        path: '/management/company',
    },
    {
        icon: <AiOutlineUser />,
        title: 'Users',
        path: '/management/users',
    },
    {
        icon: <TfiSettings />,
        title: 'Edit Profile',
        path: '/management/profile',
    },
];