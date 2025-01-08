import Link from "next/link"
import { FiEdit2 } from "react-icons/fi"
import { GoPlus } from "react-icons/go"


export const CreateButton = ({label, url}: { label: string, url: string}) => {
    return (
        <Link href={url} className=" py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            <GoPlus size={24} />
            <span className="hidden md:flex">
                {label}
            </span>

        </Link>
    )
}

export const UpdateButton = ({ id, url }: { id: string, url: string }) => {
    return (
        <Link href={`${url}/${id}/edit`} className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline focus:outline-none focus:underline border border-gray-200 p-2 rounded-md hover:bg-gray-50 text-gray-800 ">
            <FiEdit2 size={22} />
        </Link>
    )
}

