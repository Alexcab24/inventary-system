import { MdDashboard, MdBusiness, MdPerson, MdSettings } from "react-icons/md";
import { ROUTES } from "./routes";

export const adminMenuItems = [
    {
        icon: <MdDashboard />,
        title: 'Dashboard',
        path: ROUTES.DASHBOARD,
    },
    {
        icon: <MdBusiness />,
        title: 'Company',
        path: ROUTES.COMPANY,
    },
    {
        icon: <MdPerson />,
        title: 'Users',
        path: ROUTES.USERS,
    },
    {
        icon: <MdSettings />,
        title: 'Edit Profile',
        path: ROUTES.PROFILE,
    },
];