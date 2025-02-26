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
    
    const baseClass = "transition-all duration-300 flex items-center gap-x-4 py-3 px-4 rounded-lg text-lg text-gray-800 hover:text-white hover:bg-gray-100 hover:bg-[#5dade2]";
    const activeClass = pathName.startsWith(path) ? 'bg-[#2e86c1] text-white' : '';
    
    return (
        <li>
            <Link href={path} className={`${baseClass} ${activeClass}`}>
                <span className="flex-shrink-0">{icon}</span>
                <span>{title}</span>
            </Link>
        </li>
    );
};
