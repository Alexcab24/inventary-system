import Link from "next/link";
import { GoPlus } from "react-icons/go";




export function CreateClient() {
    return (
        <Link href={'/dashboard/clientes/crear'} className=" py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            <GoPlus size={24} />
            <span className="hidden md:flex">
                Agregar Cliente
            </span>

        </Link>
    );
}
