'use client';
import Link from "next/link"
import { usePathname } from "next/navigation";



interface Props {
    icon: React.ReactNode,
    path: string,
    title: string,

}

export const SideBarItems = ({ icon, title, path }: Props) => {

    const pathName = usePathname();
    
    const baseClass = "transition-all duration-500 flex items-center gap-x-3.5 py-3 px-2.5 bg-white text-lg text-gray-800 rounded-lg hover:bg-gray-100";
    const activeClass = path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : '';
    
    return (
        <li>
            <Link href={path} className={`${baseClass} ${activeClass}`}>
                {icon}
                <span>{title}</span>
            </Link>
        </li>
    );
}
