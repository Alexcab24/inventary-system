import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { GoPlus } from "react-icons/go";




export function CreateProduct() {
    return (
        <Link href={'/dashboard/productos/crear'} className=" py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            <GoPlus size={24} />
            <span className="hidden md:flex">
            Agregar Producto
            </span>
           
        </Link>
    );
}


export function UpdateProduct({ id }: { id: string }) {
    return (
        <Link href={`/dashboard/productos/${id}/editar`} className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline focus:outline-none focus:underline border border-gray-200 p-2 rounded-md hover:bg-gray-50 text-gray-800 ">
            <FiEdit2 size={22}/>
        </Link>
    )
}