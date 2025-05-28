'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    icon: React.ReactNode;
    path: string;
    title: string;
}

export const SideBarItems = ({ icon, title, path }: Props) => {
    const pathName = usePathname();

    const baseClass = "group flex items-center gap-x-3.5 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200";
    const activeClass = pathName.startsWith(path)
        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

    return (
        <li>
            <Link href={path} className={`${baseClass} ${activeClass}`}>
                <span className="flex-shrink-0 text-lg transition-transform group-hover:scale-110">
                    {icon}
                </span>
                <span className="flex-1">{title}</span>
            </Link>
        </li>
    );
};
