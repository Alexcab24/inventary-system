import Link from "next/link"
import { FiEdit2 } from "react-icons/fi"
import { GoPlus } from "react-icons/go"
import { cn } from "@/lib/utils"

export const CreateButton = ({ label, url, className }: { label: string, url: string, className?: string }) => {
    return (
        <Link
            href={url}
            className={cn(
                "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-demoHover text-white hover:bg-demo transition-all duration-300 disabled:pointer-events-none",
                className
            )}
        >
            <GoPlus size={24} />
            <span className="hidden md:flex">
                {label}
            </span>
        </Link>
    )
}

export const UpdateButton = ({ id, url }: { id: string, url: string }) => {
    return (
        <Link
            href={`${url}/${id}/edit`}
            className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Editar"
        >
            <FiEdit2 size={14} />
        </Link>
    )
}

