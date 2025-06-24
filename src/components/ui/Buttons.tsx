import Link from "next/link"
import { FiEdit2 } from "react-icons/fi"
import { GoPlus } from "react-icons/go"
import { cn } from "@/lib/utils"

export const CreateButton = ({ label, url, className }: { label: string, url: string, className?: string }) => {
    return (
        <Link
            href={url}
            className={cn(
                "group relative inline-flex items-center gap-x-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm hover:from-blue-700 hover:to-blue-800 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                className
            )}
        >
            <div className="flex items-center gap-x-2">
                <GoPlus size={18} className="transition-transform group-hover:scale-110" />
                <span className="hidden md:inline-block">
                    {label}
                </span>
            </div>
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

